import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';

const port = 4273;
const server = spawn(process.execPath, ['server.mjs'], {
  cwd: new URL('..', import.meta.url),
  env: { ...process.env, PORT: String(port) },
});

await new Promise((resolve, reject) => {
  server.stdout.once('data', resolve);
  server.once('error', reject);
  server.once('exit', (code) => reject(new Error(`server exited before ready: ${code}`)));
});

test.after(() => server.kill());

test('preview server serves the site and rejects unknown files', async () => {
  const home = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /text\/html/);
  assert.match(await home.text(), /Customer Growth Leader/);

  const missing = await fetch(`http://127.0.0.1:${port}/missing-file`);
  assert.equal(missing.status, 404);
});
