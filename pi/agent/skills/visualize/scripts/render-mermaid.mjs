#!/usr/bin/env node
// Render Mermaid source locally for later semantic inline-SVG normalization.
// Mermaid is an authoring dependency only; its runtime/source never ships.

import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { basename, dirname, join, resolve, win32 as win32Path } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  Browser,
  BrowserTag,
  computeSystemExecutablePath,
  detectBrowserPlatform,
  install,
  resolveBuildId,
} from './vendor/puppeteer.mjs';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const __dirname = dirname(SCRIPT_PATH);
const FIXTURES_DIR = resolve(__dirname, '..', 'fixtures', 'diagrams');
const MERMAID_PACKAGE = '@mermaid-js/mermaid-cli@11.12.0';
const MERMAID_TIMEOUT_MS = 60_000;
const TERMINATION_GRACE_MS = 500;
const CACHE_DIR = process.env.VISUALIZE_PUPPETEER_CACHE_DIR || join(homedir(), '.cache', 'visualize-skill', 'puppeteer');

async function resolveChromeExecutable() {
  if (process.env.VISUALIZE_SKIP_SYSTEM_CHROME !== '1') {
    try { return computeSystemExecutablePath({ browser: Browser.CHROME, channel: 'stable' }); } catch { /* managed fallback */ }
  }
  const platform = detectBrowserPlatform();
  if (!platform) throw new Error('unsupported platform for managed Chrome fallback');
  const buildId = await resolveBuildId(Browser.CHROME, platform, BrowserTag.STABLE);
  const result = await install({ browser: Browser.CHROME, cacheDir: CACHE_DIR, buildId, buildIdAlias: BrowserTag.STABLE });
  return result.executablePath;
}

function validateInput(file) {
  if (!existsSync(file)) throw new Error(`source not found: ${file}`);
  if (!statSync(file).isFile()) throw new Error(`source is not a file: ${file}`);
}

function assertSpawnCompleted(result, label, timeoutMs) {
  const timeoutLabel = timeoutMs % 1000 === 0 ? `${timeoutMs / 1000} seconds` : `${timeoutMs} milliseconds`;
  if (result.error?.code === 'ETIMEDOUT') throw new Error(`${label} timed out after ${timeoutLabel}. Check Mermaid package availability and Chrome, then retry.`);
  if (result.error) throw new Error(`${label} could not start: ${result.error.message}`);
  if (result.signal) throw new Error(`${label} stopped unexpectedly with signal ${result.signal}.`);
}

function timeoutError(label, timeoutMs) {
  const timeoutLabel = timeoutMs % 1000 === 0 ? `${timeoutMs / 1000} seconds` : `${timeoutMs} milliseconds`;
  return Object.assign(new Error(`${label} timed out after ${timeoutLabel}. Check Mermaid package availability and Chrome, then retry.`), { code: 'ETIMEDOUT' });
}

function spawnBounded(command, args, timeoutMs, label = 'Mermaid render') {
  return new Promise((resolveResult) => {
    const detached = process.platform !== 'win32';
    const child = spawn(command, args, { detached, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let settled = false;
    let closedStatus = null;
    let closedSignal = null;
    let spawnError = null;
    let escalationTimer;
    let forceFinishTimer;
    let windowsKiller = null;
    let windowsKillFinished = process.platform !== 'win32';

    child.stdout?.setEncoding('utf8');
    child.stderr?.setEncoding('utf8');
    child.stdout?.on('data', (chunk) => { stdout += chunk; });
    child.stderr?.on('data', (chunk) => { stderr += chunk; });

    const signalTree = (signal) => {
      try {
        if (process.platform === 'win32') {
          if (signal !== 'SIGKILL' || !child.pid || windowsKiller) return;
          windowsKiller = spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: ['ignore', 'ignore', 'pipe'] });
          let taskkillStderr = '';
          windowsKiller.stderr?.setEncoding('utf8');
          windowsKiller.stderr?.on('data', (chunk) => { taskkillStderr += chunk; });
          windowsKiller.once('error', (error) => {
            windowsKillFinished = true;
            stderr += `\nWindows process-tree termination could not start: ${error.message}`;
          });
          windowsKiller.once('close', (status) => {
            windowsKillFinished = true;
            if (status !== 0) stderr += `\nWindows process-tree termination failed${taskkillStderr.trim() ? `: ${taskkillStderr.trim()}` : ` with status ${status}`}`;
          });
        } else if (child.pid) process.kill(-child.pid, signal);
      } catch (error) {
        if (error.code !== 'ESRCH') stderr += `\n${error.message}`;
      }
    };

    const finish = (status, signal, error) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadlineTimer);
      clearTimeout(escalationTimer);
      clearTimeout(forceFinishTimer);
      resolveResult({ status, signal, error: timedOut ? timeoutError(label, timeoutMs) : error, stdout, stderr });
    };

    const deadlineTimer = setTimeout(() => {
      timedOut = true;
      signalTree(process.platform === 'win32' ? 'SIGKILL' : 'SIGTERM');
      if (process.platform !== 'win32') escalationTimer = setTimeout(() => signalTree('SIGKILL'), TERMINATION_GRACE_MS);
      forceFinishTimer = setTimeout(() => {
        if (!windowsKillFinished) {
          stderr += '\nWindows process-tree termination exceeded the cleanup grace.';
          windowsKiller?.kill('SIGKILL');
        }
        child.stdout?.destroy();
        child.stderr?.destroy();
        child.unref();
        finish(closedStatus, closedSignal || 'SIGKILL', spawnError);
      }, TERMINATION_GRACE_MS * 2);
    }, timeoutMs);

    child.once('error', (error) => {
      spawnError = error;
      if (!timedOut) finish(null, null, error);
    });
    child.once('close', (status, signal) => {
      closedStatus = status;
      closedSignal = signal;
      if (!timedOut) finish(status, signal);
    });
  });
}

function validateOutput(output) {
  if (!existsSync(output)) throw new Error('Mermaid CLI exited successfully without producing SVG output.');
  const svg = readFileSync(output, 'utf8');
  if (!/<svg\b/i.test(svg)) throw new Error('Mermaid output is not SVG.');
  if (/<script\b/i.test(svg) || /\b(?:href|src)=["']https?:/i.test(svg)) throw new Error('Mermaid output contains a runtime or external resource.');
}

function mermaidEnvironment(environment = process.env) {
  return { ...environment, PUPPETEER_SKIP_DOWNLOAD: 'true' };
}

function windowsNpxCliCandidates(execPath, environment) {
  return [...new Set([
    environment.npm_execpath ? win32Path.join(win32Path.dirname(environment.npm_execpath), 'npx-cli.js') : null,
    win32Path.join(win32Path.dirname(execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js'),
    environment.APPDATA ? win32Path.join(environment.APPDATA, 'npm', 'node_modules', 'npm', 'bin', 'npx-cli.js') : null,
  ].filter(Boolean))];
}

function npxInvocation(args, platform = process.platform, environment = process.env, execPath = process.execPath, fileExists = existsSync) {
  if (platform === 'win32') {
    const npxCli = windowsNpxCliCandidates(execPath, environment).find(fileExists);
    if (!npxCli) throw new Error('npm npx-cli.js was not found beside Node.js or in the npm installation. Reinstall Node.js with npm, then retry.');
    return { command: execPath, args: [npxCli, ...args] };
  }
  return { command: 'npx', args };
}

async function renderMermaidWorker(input, output, workDir) {
  validateInput(input);
  if (!existsSync(workDir) || !statSync(workDir).isDirectory()) throw new Error(`render work directory is unavailable: ${workDir}`);
  const config = join(workDir, 'puppeteer.json');
  writeFileSync(config, JSON.stringify({ executablePath: await resolveChromeExecutable(), headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }));
  const invocation = npxInvocation(['--yes', '--prefer-offline', MERMAID_PACKAGE, '-p', config, '-i', input, '-o', output, '--quiet']);
  const result = spawnSync(invocation.command, invocation.args, { encoding: 'utf8', stdio: 'pipe', env: mermaidEnvironment() });
  if (result.error) throw new Error(`Mermaid CLI could not start: ${result.error.message}`);
  if (result.signal) throw new Error(`Mermaid CLI stopped unexpectedly with signal ${result.signal}.`);
  if (result.status !== 0) {
    const detail = `${result.stderr || result.stdout || ''}`.trim().split(/\r?\n/).find((line) => /parse error|error:/i.test(line)) || 'Mermaid render failed.';
    throw new Error(detail);
  }
}

async function runRenderWorker(input, output, options = {}) {
  const command = options.command || process.execPath;
  const args = options.args || [SCRIPT_PATH, '--render-worker', input, output, options.workDir];
  const timeoutMs = options.timeoutMs || MERMAID_TIMEOUT_MS;
  const label = options.label || 'Mermaid render';
  const result = await spawnBounded(command, args, timeoutMs, label);
  assertSpawnCompleted(result, label, timeoutMs);
  if (result.status !== 0) {
    const lines = `${result.stderr || result.stdout || ''}`.trim().split(/\r?\n/);
    const detail = lines.find((line) => /parse error|render-mermaid failed:|error:/i.test(line)) || 'Mermaid render failed.';
    throw new Error(detail.replace(/^render-mermaid failed:\s*/i, ''));
  }
  return result;
}

async function renderMermaid(input, output) {
  validateInput(input);
  const workDir = mkdtempSync(join(tmpdir(), 'visualize-mermaid-'));
  try {
    await runRenderWorker(input, output, { workDir });
    validateOutput(output);
    return output;
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

async function selfTest() {
  const workDir = mkdtempSync(join(tmpdir(), 'visualize-mermaid-self-test-'));
  try {
    if (mermaidEnvironment({}).PUPPETEER_SKIP_DOWNLOAD !== 'true') throw new Error('Mermaid subprocess would download a redundant browser');
    const windowsNode = 'C:\\hostedtoolcache\\windows\\node\\24.1.0\\x64\\node.exe';
    const expectedNpxCli = 'C:\\hostedtoolcache\\windows\\node\\24.1.0\\x64\\node_modules\\npm\\bin\\npx-cli.js';
    const windowsInvocation = npxInvocation(['--version'], 'win32', {}, windowsNode, (candidate) => candidate === expectedNpxCli);
    if (windowsInvocation.command !== windowsNode || windowsInvocation.args[0] !== expectedNpxCli || windowsInvocation.args[1] !== '--version') throw new Error('Windows Mermaid subprocess would not execute npx-cli.js directly through Node.js');
    const timeoutMs = 100;
    const stalledScript = `const { spawn } = require('node:child_process'); const child = spawn(process.execPath, ['-e', 'process.on("SIGTERM", () => {}); setInterval(() => {}, 1000)'], { stdio: 'ignore' }); console.log(child.pid); setInterval(() => {}, 1000);`;
    const startedAt = Date.now();
    const stalled = await spawnBounded(process.execPath, ['-e', stalledScript], timeoutMs, 'Timeout regression');
    let timeoutRejected = false;
    try { assertSpawnCompleted(stalled, 'Timeout regression', timeoutMs); }
    catch (error) { timeoutRejected = error.message === 'Timeout regression timed out after 100 milliseconds. Check Mermaid package availability and Chrome, then retry.'; }
    if (!timeoutRejected) throw new Error('stalled renderer was not rejected with the bounded timeout message');
    if (Date.now() - startedAt > timeoutMs + TERMINATION_GRACE_MS * 3) throw new Error('stalled renderer exceeded the timeout and termination grace');
    const descendantPid = Number(stalled.stdout.trim().split(/\r?\n/).at(-1));
    if (!Number.isInteger(descendantPid)) throw new Error('timeout regression did not report its descendant process');
    await new Promise((done) => setTimeout(done, 50));
    try { process.kill(descendantPid, 0); throw new Error(`timeout regression left descendant process ${descendantPid} running`); }
    catch (error) { if (error.code !== 'ESRCH') throw error; }

    const validOutput = join(workDir, 'valid.svg');
    await renderMermaid(join(FIXTURES_DIR, 'flow-valid.mmd'), validOutput);
    let invalidRejected = false;
    try { await renderMermaid(join(FIXTURES_DIR, 'invalid-mermaid-source.mmd'), join(workDir, 'invalid.svg')); }
    catch (error) { invalidRejected = /parse error|mermaid render failed/i.test(error.message); }
    if (!invalidRejected) throw new Error('invalid Mermaid source was not rejected with a parse failure');
    console.log('OK · Mermaid authoring path renders valid source and rejects invalid source');
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}

function usage() {
  console.log('Usage: node render-mermaid.mjs <input.mmd> <output.svg>');
  console.log('       node render-mermaid.mjs --self-test');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 4 && args[0] === '--render-worker') {
    await renderMermaidWorker(resolve(args[1]), resolve(args[2]), resolve(args[3]));
    return 0;
  }
  if (args.includes('--help') || args.includes('-h')) { usage(); return 0; }
  if (args.length === 1 && args[0] === '--self-test') { await selfTest(); return 0; }
  if (args.length !== 2 || args.some((arg) => arg.startsWith('--'))) { usage(); return args.length === 0 ? 0 : 1; }
  const input = resolve(args[0]); const output = resolve(args[1]);
  await renderMermaid(input, output);
  console.log(`OK · rendered ${basename(input)} → ${output}`);
  console.log('Next: inline the SVG, remove generator metadata, add diagram semantic markers, and run detect.mjs plus browser-diagram.mjs.');
  return 0;
}

function isMain() {
  try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1]); } catch { return false; }
}
if (isMain()) main().then((code) => { process.exitCode = code; }).catch((error) => { console.error(`render-mermaid failed: ${error.message}`); process.exitCode = 1; });
