import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('home page exposes source-backed headline proof points', () => {
  for (const fact of [
    '400+ accounts',
    '12B VNĐ portfolio',
    '7-10 thành viên',
    '30% → 58% retention',
    '70% → 30% churn rủi ro cao',
    '+120% upsell revenue (MRR 100M)',
  ]) {
    assert.match(page, new RegExp(fact.replace(/[+()]/g, '\\$&')));
  }
});

test('home page presents a Vietnamese-first identity', () => {
  assert.match(page, /<title>[^<]*Tăng trưởng[^<]*<\/title>/);
  assert.match(page, /<h1>[^<]*Tăng trưởng[^<]*<\/h1>/);
});
