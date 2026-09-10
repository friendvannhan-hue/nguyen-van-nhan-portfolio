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
  assert.match(await home.text(), /Customer Growth &amp; Business Operations Leader/);

  const missing = await fetch(`http://127.0.0.1:${port}/missing-file`);
  assert.equal(missing.status, 404);
});

test('preview server handles malformed and directory-like paths without 500s', async () => {
  for (const path of ['//', '/assets/', '/%2e%2e%2fserver.mjs', '/%ZZ']) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    assert.ok([400, 403, 404].includes(response.status), `${path} returned ${response.status}`);
  }
});

test('preview server resolves canonical case-study directories', async () => {
  for (const slug of ['retention-recovery', 'expansion-revenue', 'operational-transformation']) {
    const response = await fetch(`http://127.0.0.1:${port}/case-studies/${slug}/`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /<main class="case-study-page"/);
  }

  const missing = await fetch(`http://127.0.0.1:${port}/case-studies/not-public/`);
  assert.equal(missing.status, 404);
});

test('preview server supplies explicit safe MIME types for static assets', async () => {
  for (const [path, type] of [
    ['/assets/css/styles.css', /text\/css/],
    ['/assets/js/main.js', /text\/javascript/],
    ['/assets/images/portrait-placeholder.svg', /image\/svg\+xml/],
    ['/assets/images/dashboards/dashboard-renewal-report.jpg', /image\/jpeg/],
  ]) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), type);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  }
});
