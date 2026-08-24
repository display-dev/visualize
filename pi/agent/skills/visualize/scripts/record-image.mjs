#!/usr/bin/env node
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  BILLING_VALUES,
  ImageContractError,
  RECORDER_ROUTES,
  finalizeImage,
  resolveApprovedRoot,
} from './image-contract.mjs';

function parseArgs(argv) {
  const options = { replace: false };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === '--replace') { options.replace = true; continue; }
    if (!flag.startsWith('--')) throw new ImageContractError('invalid-arguments', 'unexpected positional argument');
    const value = argv[++index];
    if (value === undefined) throw new ImageContractError('invalid-arguments', 'option requires a value');
    options[flag.slice(2).replaceAll('-', '_')] = value;
  }
  return options;
}

function requireOption(options, key) {
  if (!options[key]) throw new ImageContractError('invalid-arguments', `--${key.replaceAll('_', '-')} is required`);
}

export async function runRecordImage(options) {
  for (const key of ['source', 'out', 'approved_root', 'route']) requireOption(options, key);
  const allowed = new Set(['source', 'out', 'approved_root', 'route', 'provider', 'tool', 'model', 'billing', 'replace']);
  const unsupported = Object.keys(options).find((key) => !allowed.has(key));
  if (unsupported) throw new ImageContractError('invalid-arguments', 'unsupported recorder option');
  if (!RECORDER_ROUTES.includes(options.route)) throw new ImageContractError('invalid-route', `--route must be one of ${RECORDER_ROUTES.join(', ')}`);
  const billing = options.billing ?? 'unknown';
  if (!BILLING_VALUES.includes(billing) || !['host-managed', 'unknown'].includes(billing)) throw new ImageContractError('invalid-billing', 'record-image billing must be host-managed or unknown');
  try {
    const root = await resolveApprovedRoot(options.approved_root);
    return await finalizeImage({
      approvedRoot: root,
      source: options.source,
      out: options.out,
      route: options.route,
      provider: options.provider ?? null,
      tool: options.tool ?? null,
      model: options.model ?? null,
      billing,
      replace: options.replace,
    });
  } catch (error) {
    if (error instanceof ImageContractError) {
      throw new ImageContractError(error.code, error.message, { ambiguous: true });
    }
    throw new ImageContractError('post-dispatch-failure', 'image recording failed after generation', { ambiguous: true });
  }
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const result = await runRecordImage(options);
    process.stdout.write(`${JSON.stringify({ ok: true, out: result.out, result: result.result })}\n`);
  } catch (error) {
    const projected = error instanceof ImageContractError ? error : new ImageContractError('unexpected-failure', 'image recording failed');
    process.stdout.write(`${JSON.stringify({ ok: false, error: { code: projected.code, message: projected.message, ambiguous: projected.ambiguous === true } })}\n`);
    process.exitCode = 1;
  }
}

function isMain() {
  try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1]); } catch { return false; }
}

if (isMain()) await main();
