import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, stat } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
const script = await readFile(new URL('../assets/js/main.js', import.meta.url), 'utf8');

test('home page uses only the approved public headline metrics', () => {
  for (const fact of [
    '500+ tài khoản SME &amp; Enterprise',
    '18 tỷ VNĐ+',
    '8–15',
    '28% → 58%',
    '110% mục tiêu upsell',
    '100 triệu VNĐ',
    '20% → 60%',
  ]) {
    assert.ok(page.includes(fact), `missing approved fact: ${fact}`);
  }

  for (const stale of ['400+ accounts', '~12B', '7-10', '30% → 58%', '+120%']) {
    assert.doesNotMatch(page, new RegExp(stale.replace('+', '\\+')));
  }
  assert.doesNotMatch(page, /(?:\+110%|110%\s+(?:growth|increase)|tăng trưởng upsell 110%)/i);
});

test('hero and first chapters follow the approved executive narrative', () => {
  assert.match(page, /<title>Nguyễn Văn Nhân \| Customer Growth &amp; Business Operations Leader<\/title>/);
  assert.match(page, /<h1 id="hero-title">Tôi xây hệ thống giúp chiến lược được thực thi, đội ngũ vận hành ổn định và khách hàng hiện hữu tạo ra tăng trưởng\.<\/h1>/);
  const sequence = ['hero', 'manifesto', 'impact'].map((name) => page.indexOf(`id="${name}"`));
  assert.ok(sequence.every((offset) => offset > -1));
  assert.deepEqual(sequence, [...sequence].sort((a, b) => a - b));
});

test('approved impact is represented by six contextual cards', () => {
  assert.equal((page.match(/class="impact-card"/g) || []).length, 6);
  assert.match(page, /trong hơn 12 tháng/i);
  assert.match(page, /70% → 30%/);
  assert.match(page, /MRR upsell 100 triệu VNĐ/);
});

test('page keeps semantic landmarks and direct contact paths', () => {
  assert.match(page, /<a class="skip-link" href="#main-content">/);
  assert.match(page, /<main id="main-content">/);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.match(page, /href="tel:\+84967347781"/);
  assert.match(page, /href="mailto:nhannv\.working@gmail\.com"/);
  assert.match(page, /href="https:\/\/www\.linkedin\.com\/in\/nguyenvannhan\/"/);
  assert.doesNotMatch(page, /<a[^>]+download/i);
});

test('visual foundation exposes approved tokens and publication assets', async () => {
  for (const color of ['#F6F7F9', '#FFFFFF', '#0B1F3A', '#475569', '#2563EB', '#1E9B6A', '#C93D5B', '#DCE2EA', '#145DD7']) {
    assert.match(css, new RegExp(color));
  }

  assert.match(page, /href="assets\/images\/favicon\.svg"/);
  assert.match(page, /rel="canonical" href="\/"/);
  assert.match(page, /property="og:image" content="\/assets\/images\/og-portfolio\.png"/);
  assert.match(page, /src="assets\/images\/nguyen-van-nhan\.webp"[^>]*width="720"[^>]*height="900"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);

  for (const asset of ['favicon.svg', 'og-portfolio.png', 'nguyen-van-nhan.webp']) {
    const info = await stat(new URL(`../assets/images/${asset}`, import.meta.url));
    assert.ok(info.size > 100, `${asset} should contain a real asset`);
  }

  const png = await readFile(new URL('../assets/images/og-portfolio.png', import.meta.url));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

export { css, page, script };
