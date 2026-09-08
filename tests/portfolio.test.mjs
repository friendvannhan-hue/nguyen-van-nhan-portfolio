import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');

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
  assert.match(page, /<h1[^>]*>[^<]*tăng trưởng[^<]*<\/h1>/i);
});

test('page has landmarks, a keyboard skip link, and direct contact paths', () => {
  assert.match(page, /<a class="skip-link" href="#main-content">/);
  assert.match(page, /<main id="main-content">/);
  for (const id of ['impact', 'operating-system', 'experience', 'case-studies', 'contact']) {
    assert.match(page, new RegExp(`<(section|footer)[^>]*id="${id}"`));
  }
  assert.match(page, /href="tel:\+84967347781"/);
  assert.match(page, /href="mailto:nhannv\.working@gmail\.com"/);
  assert.match(page, /href="https:\/\/www\.linkedin\.com\/in\/nguyenvannhan\/"/);
  assert.match(page, /<h1[^>]*>Biến Customer Success thành động cơ tăng trưởng\.<\/h1>/);
  assert.doesNotMatch(page, /<a[^>]+download(?:=|\s|>)/i);
});

test('hero uses the required accessible heading and CV-supported sectors', () => {
  assert.match(page, /<section class="hero" aria-labelledby="hero-title">/);
  assert.match(page, /<h1 id="hero-title">Biến Customer Success thành động cơ tăng trưởng\.<\/h1>/);
  assert.doesNotMatch(page, /SaaS, Martech, Retail và FMCG/);
  assert.match(page, /SaaS, Martech, ERP, E-commerce và Finance/);
});

test('styles provide the approved visual tokens and critical accessibility rules', () => {
  for (const color of ['#F6F7F9', '#FFFFFF', '#0B1F3A', '#536176', '#F0647C', '#C93D5B', '#2BA6C8', '#1E9B6A', '#DCE2EA', '#145DD7']) {
    assert.match(css, new RegExp(color));
  }
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
  assert.match(css, /min-height:\s*44px/);
});
