import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { runGenerateImage } from './generate-image.mjs';
import { LIMITS, createDeterministicPng } from './image-contract.mjs';
import { JPEG_FIXTURE } from './image-test-fixtures.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'visualize-generation-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'assets'));
  return root;
}

function options(root, route, extra = {}) {
  return { prompt: 'A quiet geometric study', refs: [], out: 'assets/result.png', approved_root: root, route, ...extra };
}

function geminiOptions(root, extra = {}) {
  return options(root, 'gemini-api', { out: 'assets/result.jpg', ...extra });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function paddedPng(seed, paddingBytes) {
  const png = createDeterministicPng({ seed });
  const type = Buffer.from('vpAg');
  const data = Buffer.alloc(paddingBytes);
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  type.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([type, data])), 8 + data.length);
  return Buffer.concat([png.subarray(0, -12), chunk, png.subarray(-12)]);
}

test('fake route is deterministic, network-free, and uses the common finalizer', async (t) => {
  const root = await fixture(t);
  let fetches = 0;
  const runtime = { fetch: async () => { fetches += 1; throw new Error('network forbidden'); } };
  const first = await runGenerateImage(options(root, 'fake'), runtime);
  const firstBytes = await readFile(first.out);
  await runGenerateImage(options(root, 'fake', { replace: true }), runtime);
  assert.deepEqual(await readFile(first.out), firstBytes);
  assert.equal(fetches, 0);
  assert.equal(first.result.billing, 'none');
  assert.deepEqual(await readdir(join(root, 'assets')), ['result.png']);
});

test('generate-image CLI keeps its JSON envelope and runs through a symlink', async (t) => {
  const root = await fixture(t);
  const script = fileURLToPath(new URL('generate-image.mjs', import.meta.url));
  const invalid = spawnSync(process.execPath, [script, '--json'], { encoding: 'utf8' });
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stderr, '');
  assert.equal(JSON.parse(invalid.stdout).error.code, 'invalid-arguments');
  const oversized = spawnSync(process.execPath, [script, `--${'x'.repeat(200_000)}`], { encoding: 'utf8' });
  assert.equal(oversized.status, 1);
  assert.ok(oversized.stdout.length < 512);

  const linked = join(root, 'generate-image-link.mjs');
  await symlink(script, linked);
  const generated = spawnSync(process.execPath, [linked, '--prompt', 'Symlink smoke', '--out', 'assets/symlink.png', '--approved-root', root, '--route', 'fake'], { encoding: 'utf8' });
  assert.equal(generated.status, 0, generated.stderr);
  assert.equal(JSON.parse(generated.stdout).ok, true);
});

test('fake output changes when prompt or reference bytes change', async (t) => {
  const root = await fixture(t);
  const a = await runGenerateImage(options(root, 'fake'), {});
  const bytesA = await readFile(a.out);
  const b = await runGenerateImage(options(root, 'fake', { prompt: 'A different study', replace: true }), {});
  assert.notDeepEqual(bytesA, await readFile(b.out));
  const ref = join(root, 'assets', 'reference.png');
  const referenceA = createDeterministicPng({ seed: 'reference-a' });
  await writeFile(ref, referenceA);
  const c = await runGenerateImage(options(root, 'fake', { refs: [ref], replace: true }), {});
  const bytesC = await readFile(c.out);
  const relocated = join(root, 'assets', 'relocated.png');
  await writeFile(relocated, referenceA);
  const relocatedResult = await runGenerateImage(options(root, 'fake', { refs: [relocated], replace: true }), {});
  assert.deepEqual(bytesC, await readFile(relocatedResult.out));
  await writeFile(ref, createDeterministicPng({ seed: 'reference-b' }));
  const d = await runGenerateImage(options(root, 'fake', { refs: [ref], replace: true }), {});
  assert.notDeepEqual(bytesC, await readFile(d.out));
});

test('fake supports multiple references and stable operational diagnostics', async (t) => {
  const root = await fixture(t);
  const refs = [join(root, 'assets', 'one.png'), join(root, 'assets', 'two.png')];
  await writeFile(refs[0], createDeterministicPng({ seed: 'one' })); await writeFile(refs[1], createDeterministicPng({ seed: 'two' }));
  const first = await runGenerateImage(options(root, 'fake', { refs }));
  const firstBytes = await readFile(first.out);
  const second = await runGenerateImage(options(root, 'fake', { refs, replace: true }));
  assert.deepEqual(first.result, second.result);
  assert.deepEqual(firstBytes, await readFile(second.out));
});

test('concurrent identical fake generations use independent staging files', async (t) => {
  const root = await fixture(t);
  const [first, second] = await Promise.all([
    runGenerateImage({ prompt: 'Same request', refs: [], out: 'assets/first.png', approved_root: root, route: 'fake' }),
    runGenerateImage({ prompt: 'Same request', refs: [], out: 'assets/second.png', approved_root: root, route: 'fake' }),
  ]);
  assert.deepEqual(await readFile(first.out), await readFile(second.out));
  assert.equal((await readdir(join(root, 'assets'))).filter((name) => name.startsWith('.visualize-source-')).length, 0);
});

test('post-commit source cleanup failure does not overturn verified success', async (t) => {
  const root = await fixture(t);
  const result = await runGenerateImage(options(root, 'fake'), {
    remove: async (path, optionsValue) => {
      if (path.includes('.visualize-source-')) throw new Error('cleanup failed');
      return rm(path, optionsValue);
    },
  });
  assert.equal(result.result.route, 'fake');
  assert.ok((await readFile(result.out)).length > 0);
});

test('maximum escape-heavy prompt remains preflight-valid and finalizable', async (t) => {
  const root = await fixture(t);
  const prompt = '"'.repeat(32 * 1024);
  const result = await runGenerateImage(options(root, 'fake', { prompt }), {});
  assert.equal(result.result.actual.path, 'assets/result.png');
  assert.doesNotMatch(JSON.stringify(result.result), /"{128}/);
});

test('invalid or occupied outputs stop before a billable dispatch', async (t) => {
  const root = await fixture(t);
  let calls = 0;
  const runtime = { env: { OPENAI_API_KEY: 'secret' }, fetch: async () => { calls += 1; throw new Error('must not dispatch'); } };
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api', { out: 'assets/result.gif' }), runtime), /\.png, \.jpg, or \.jpeg/);
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api', { out: '../escape.png' }), runtime), /escapes/);
  await writeFile(join(root, 'assets', 'result.png'), createDeterministicPng({ seed: 'existing' }));
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), runtime), /already exists/);
  assert.equal(calls, 0);
});

test('OpenAI generation uses one explicit request and canonical authorization', async (t) => {
  const root = await fixture(t);
  const png = createDeterministicPng({ seed: 'openai' });
  const calls = [];
  const result = await runGenerateImage(options(root, 'openai-api', { size: '1024x1024', quality: 'medium' }), {
    env: { OPENAI_API_KEY: 'secret-openai' },
    fetch: async (url, init) => { calls.push({ url, init }); return new Response(JSON.stringify({ model: 'gpt-image-2-2026-04-21', data: [{ b64_json: png.toString('base64') }] }), { status: 200, headers: { 'content-type': 'application/json' } }); },
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.openai.com/v1/images/generations');
  assert.equal(calls[0].init.headers.authorization, 'Bearer secret-openai');
  assert.equal(calls[0].init.redirect, 'error');
  assert.deepEqual(JSON.parse(calls[0].init.body), { model: 'gpt-image-2', prompt: 'A quiet geometric study', size: '1024x1024', quality: 'medium', output_format: 'png', n: 1 });
  assert.equal(result.result.billing, 'api-key');
  assert.equal(result.result.model, 'gpt-image-2-2026-04-21');
});

test('OpenAI edit carries detected reference MIME and requests the selected output format', async (t) => {
  const root = await fixture(t);
  const ref = join(root, 'assets', 'reference.jpg');
  await writeFile(ref, JPEG_FIXTURE);
  let call;
  const result = await runGenerateImage(options(root, 'openai-api', { refs: [ref], out: 'assets/result.jpg' }), {
    env: { OPENAI_API_KEY: 'secret' },
    fetch: async (url, init) => { call = { url, init }; return new Response(JSON.stringify({ data: [{ b64_json: JPEG_FIXTURE.toString('base64') }] }), { status: 200 }); },
  });
  assert.equal(call.url, 'https://api.openai.com/v1/images/edits');
  assert.equal(call.init.body.getAll('image[]').length, 1);
  assert.equal(call.init.body.getAll('image[]')[0].name, 'reference-1.jpg');
  assert.equal(call.init.body.getAll('image[]')[0].type, 'image/jpeg');
  assert.equal(call.init.body.get('output_format'), 'jpeg');
  assert.equal(call.init.headers['content-type'], undefined);
  assert.equal(result.result.actual.mimeType, 'image/jpeg');
});

test('Gemini uses the current Interactions contract with ordered typed references', async (t) => {
  const root = await fixture(t);
  const ref = join(root, 'assets', 'reference.png');
  await writeFile(ref, createDeterministicPng({ seed: 'gemini-ref' }));
  let call;
  const result = await runGenerateImage(geminiOptions(root, { refs: [ref], size: '1536x1024', quality: 'medium' }), {
    env: { GEMINI_API_KEY: 'secret-gemini' },
    fetch: async (url, init) => { call = { url, init }; return new Response(JSON.stringify({ status: 'completed', model: 'gemini-3.1-flash-image', steps: [{ type: 'model_output', content: [{ type: 'text', text: 'discarded' }, { type: 'image', mime_type: 'image/jpeg', data: JPEG_FIXTURE.toString('base64') }] }] }), { status: 200 }); },
  });
  const body = JSON.parse(call.init.body);
  assert.equal(call.url, 'https://generativelanguage.googleapis.com/v1beta/interactions');
  assert.equal(call.init.headers['x-goog-api-key'], 'secret-gemini');
  assert.equal(call.init.redirect, 'error');
  assert.equal(body.model, 'gemini-3.1-flash-image');
  assert.deepEqual(body.response_format, { type: 'image', mime_type: 'image/jpeg', image_size: '1K', aspect_ratio: '3:2' });
  assert.equal(body.input[0].text, 'A quiet geometric study');
  assert.equal(body.input[1].mime_type, 'image/png');
  assert.equal(result.result.model, 'gemini-3.1-flash-image');
  assert.equal(result.result.tool, 'gemini-interactions-api');
  assert.equal(result.result.actual.mimeType, 'image/jpeg');
  assert.deepEqual(await readFile(result.out), JPEG_FIXTURE);
});

test('Gemini maps medium quality to the supported 1K size and rejects other quality values', async (t) => {
  const root = await fixture(t);
  let call;
  await runGenerateImage(geminiOptions(root, { quality: 'medium' }), {
    env: { GEMINI_API_KEY: 'secret-gemini' },
    fetch: async (_url, init) => { call = init; return new Response(JSON.stringify({ status: 'completed', steps: [{ type: 'model_output', content: [{ type: 'image', mime_type: 'image/jpeg', data: JPEG_FIXTURE.toString('base64') }] }] }), { status: 200 }); },
  });
  assert.equal(JSON.parse(call.body).response_format.image_size, '1K');
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root, { quality: 'high', out: 'assets/high.jpg' }), { env: { GEMINI_API_KEY: 'secret-gemini' }, fetch: async () => { throw new Error('must not dispatch'); } }),
    (error) => error.code === 'unsupported-option' && !error.ambiguous,
  );
  await assert.rejects(
    () => runGenerateImage(options(root, 'gemini-api'), { env: { GEMINI_API_KEY: 'secret-gemini' }, fetch: async () => { throw new Error('must not dispatch'); } }),
    (error) => error.code === 'unsupported-output-format' && !error.ambiguous,
  );
});

test('Gemini accepts four references and the shared contract rejects a fifth before dispatch', async (t) => {
  const root = await fixture(t);
  const refs = [];
  for (let index = 0; index < 5; index += 1) {
    const ref = join(root, 'assets', `reference-${index}.png`);
    await writeFile(ref, createDeterministicPng({ seed: `gemini-reference-${index}` }));
    refs.push(ref);
  }
  let calls = 0;
  await runGenerateImage(geminiOptions(root, { refs: refs.slice(0, 4), quality: 'medium' }), {
    env: { GEMINI_API_KEY: 'secret-gemini' },
    fetch: async () => { calls += 1; return new Response(JSON.stringify({ status: 'completed', steps: [{ type: 'model_output', content: [{ type: 'image', mime_type: 'image/jpeg', data: JPEG_FIXTURE.toString('base64') }] }] }), { status: 200 }); },
  });
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root, { refs, quality: 'medium', out: 'assets/five.jpg' }), { env: { GEMINI_API_KEY: 'secret-gemini' }, fetch: async () => { calls += 1; } }),
    (error) => error.code === 'too-many-references' && !error.ambiguous,
  );
  assert.equal(calls, 1);
});

test('Gemini enforces the serialized inline request boundary before dispatch', async (t) => {
  const root = await fixture(t);
  const refs = [join(root, 'assets', 'large-one.png'), join(root, 'assets', 'large-two.png')];
  await writeFile(refs[0], paddedPng('large-one', 7_450_000));
  await writeFile(refs[1], paddedPng('large-two', 7_450_000));
  let calls = 0;
  await runGenerateImage(geminiOptions(root, { refs, quality: 'medium' }), {
    env: { GEMINI_API_KEY: 'secret-gemini' },
    fetch: async () => { calls += 1; return new Response(JSON.stringify({ status: 'completed', steps: [{ type: 'model_output', content: [{ type: 'image', mime_type: 'image/jpeg', data: JPEG_FIXTURE.toString('base64') }] }] }), { status: 200 }); },
  });
  assert.equal(calls, 1);

  await writeFile(refs[0], paddedPng('large-one', 8 * 1024 * 1024));
  await writeFile(refs[1], paddedPng('large-two', 8 * 1024 * 1024));
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root, { refs, quality: 'medium', out: 'assets/oversized.jpg' }), { env: { GEMINI_API_KEY: 'secret-gemini' }, fetch: async () => { calls += 1; } }),
    (error) => error.code === 'provider-request-too-large' && !error.ambiguous,
  );
  assert.equal(calls, 1);
});

test('Gemini rejection projects bounded sanitized provider detail', async (t) => {
  const root = await fixture(t);
  const providerMessage = `Invalid field\nsecret-gemini\n${'x'.repeat(400)}`;
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root), {
      env: { GEMINI_API_KEY: 'secret-gemini' },
      fetch: async () => new Response(JSON.stringify({ error: { status: 'INVALID_ARGUMENT', message: providerMessage } }), { status: 400 }),
    }),
    (error) => error.code === 'provider-rejected'
      && error.ambiguous
      && error.message.startsWith('Gemini request failed with status 400 (INVALID_ARGUMENT: Invalid field [redacted] ')
      && error.message.length < 340
      && !error.message.includes('\n')
      && !error.message.includes('secret-gemini'),
  );
});

test('API routes require explicit canonical credentials and stop after ambiguous failure', async (t) => {
  const root = await fixture(t);
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), { env: {} }), /OPENAI_API_KEY/);
  let calls = 0;
  await assert.rejects(() => runGenerateImage(geminiOptions(root), { env: { GEMINI_API_KEY: 'secret', OPENAI_API_KEY: 'also-present' }, fetch: async () => { calls += 1; return new Response('upstream failed', { status: 503 }); } }), (error) => error.code === 'provider-rejected' && error.ambiguous);
  assert.equal(calls, 1);
  await assert.rejects(() => readFile(join(root, 'assets', 'result.png')));
});

test('route selection and credential availability remain separate', async (t) => {
  const root = await fixture(t);
  await assert.rejects(() => runGenerateImage({ prompt: 'No route', refs: [], out: 'assets/result.png', approved_root: root }, { env: { OPENAI_API_KEY: 'present' } }), /--route is required/);
  await assert.rejects(() => runGenerateImage(geminiOptions(root), { env: { OPENAI_API_KEY: 'wrong-provider' } }), /GEMINI_API_KEY/);
});

test('unknown generator options fail before generation', async (t) => {
  const root = await fixture(t);
  await assert.rejects(() => runGenerateImage({ ...options(root, 'fake'), unexpected: 'value' }), /unsupported generator option/);
  await assert.rejects(() => readFile(join(root, 'assets', 'result.png')));
});

test('provider response byte boundaries stop after one request', async (t) => {
  const root = await fixture(t);
  let calls = 0;
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), { env: { OPENAI_API_KEY: 'secret' }, fetch: async () => { calls += 1; return new Response('{}', { status: 200, headers: { 'content-length': String(49 * 1024 * 1024) } }); } }), (error) => error.code === 'provider-response-too-large' && error.ambiguous);
  assert.equal(calls, 1);
});

test('provider transport failure projects bounded sanitized diagnostics', async (t) => {
  const root = await fixture(t);
  const cases = [
    ['openai-api', 'OPENAI_API_KEY', 'openai-secret-redaction-123456', options(root, 'openai-api')],
    ['gemini-api', 'GEMINI_API_KEY', 'gemini-secret-redaction-123456', geminiOptions(root, { out: 'assets/gemini-transport.jpg' })],
  ];
  for (const [route, variable, secret, requestOptions] of cases) {
    const cause = Object.assign(new Error(`proxy rejected Authorization: Bearer ${secret}; x-goog-api-key: ${secret}\n${'x'.repeat(400)}`), { code: 'UND_ERR_SOCKET' });
    await assert.rejects(
      () => runGenerateImage(requestOptions, {
        env: { [variable]: secret },
        fetch: async () => { throw new TypeError('fetch failed', { cause }); },
      }),
      (error) => error.code === 'provider-transport-failure'
        && error.ambiguous
        && error.message.includes('[redacted]')
        && !error.message.includes(secret)
        && error.message.length < 340
        && !error.message.includes('\n'),
      route,
    );
  }
});

test('provider rejection and post-response finalization failures remain ambiguous', async (t) => {
  const rejectedRoot = await fixture(t);
  await assert.rejects(() => runGenerateImage(options(rejectedRoot, 'openai-api'), { env: { OPENAI_API_KEY: 'secret' }, fetch: async () => new Response('{"error":{}}', { status: 400 }) }), (error) => error.code === 'provider-rejected' && error.ambiguous);
  const finalizationRoot = await fixture(t);
  const png = createDeterministicPng({ seed: 'accepted-before-local-failure' });
  await assert.rejects(() => runGenerateImage(options(finalizationRoot, 'openai-api'), {
    env: { OPENAI_API_KEY: 'secret' },
    fetch: async () => {
      await rm(join(finalizationRoot, 'assets'), { recursive: true, force: true });
      return new Response(JSON.stringify({ data: [{ b64_json: png.toString('base64') }] }), { status: 200 });
    },
  }), (error) => error.code === 'post-dispatch-failure' && error.ambiguous);
});

test('Gemini rejects multiple image parts before finalization', async (t) => {
  const root = await fixture(t);
  const image = { type: 'image', mime_type: 'image/jpeg', data: JPEG_FIXTURE.toString('base64') };
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root), { env: { GEMINI_API_KEY: 'secret' }, fetch: async () => new Response(JSON.stringify({ status: 'completed', steps: [{ type: 'model_output', content: [image, image] }] }), { status: 200 }) }),
    (error) => error.message === 'Gemini returned zero or multiple completed JPEG images; received 2 image part(s) with MIME image/jpeg' && error.ambiguous,
  );
});

test('Gemini identifies an unexpected output MIME without accepting it', async (t) => {
  const root = await fixture(t);
  const png = { type: 'image', mime_type: 'image/png', data: createDeterministicPng({ seed: 'unexpected-png' }).toString('base64') };
  await assert.rejects(
    () => runGenerateImage(geminiOptions(root), { env: { GEMINI_API_KEY: 'secret' }, fetch: async () => new Response(JSON.stringify({ status: 'completed', steps: [{ type: 'model_output', content: [png] }] }), { status: 200 }) }),
    (error) => error.message === 'Gemini returned zero or multiple completed JPEG images; received 1 image part(s) with MIME image/png' && error.ambiguous,
  );
});

test('provider deadline covers a stalled response body', async (t) => {
  const root = await fixture(t);
  const body = new ReadableStream({ start() {} });
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), { env: { OPENAI_API_KEY: 'secret' }, timeoutMs: 5, fetch: async () => new Response(body, { status: 200 }) }), (error) => error.code === 'provider-timeout' && error.ambiguous);
});

test('malformed provider image bytes are an ambiguous post-dispatch failure', async (t) => {
  const root = await fixture(t);
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), { env: { OPENAI_API_KEY: 'secret' }, fetch: async () => new Response(JSON.stringify({ data: [{ b64_json: Buffer.from('not png').toString('base64') }] }), { status: 200 }) }), (error) => error.code === 'provider-invalid-output' && error.ambiguous);
});

test('oversized provider image bytes use the same invalid-output diagnostic', async (t) => {
  const root = await fixture(t);
  const oversized = Buffer.alloc(LIMITS.imageBytes + 1).toString('base64');
  await assert.rejects(() => runGenerateImage(options(root, 'openai-api'), { env: { OPENAI_API_KEY: 'secret' }, fetch: async () => new Response(JSON.stringify({ data: [{ b64_json: oversized }] }), { status: 200 }) }), (error) => error.code === 'provider-invalid-output' && error.ambiguous);
});
