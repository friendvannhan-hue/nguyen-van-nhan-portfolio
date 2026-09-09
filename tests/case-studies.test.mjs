import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const cases = [
  ['retention-recovery', '28% → 58%'],
  ['expansion-revenue', '110% mục tiêu upsell'],
  ['operational-transformation', 'Qualitative'],
];
const requiredSections = [
  'Executive summary',
  'Bối cảnh kinh doanh',
  'Vấn đề và baseline',
  'Vai trò và phạm vi quyết định của Nhân',
  'Chẩn đoán nguyên nhân',
  'Chiến lược lựa chọn',
  'Các bước triển khai',
  'Các phòng ban liên quan',
  'KPI/OKR và cơ chế kiểm soát',
  'Kết quả định lượng và định tính',
  'Artefact đã tạo',
  'Bài học và cách áp dụng ở doanh nghiệp khác',
];

test('homepage links to exactly three canonical case-study routes', () => {
  assert.equal((home.match(/class="case-card(?:\s|\")/g) || []).length, 3);
  for (const [slug] of cases) {
    assert.match(home, new RegExp(`href="/case-studies/${slug}/"`));
  }
  assert.doesNotMatch(home, /<dialog\b|data-case-study-id|#case-study=/);
});

test('three canonical case pages implement the shared twelve-part narrative', async () => {
  for (const [slug, proof] of cases) {
    const html = await readFile(new URL(`../case-studies/${slug}/index.html`, import.meta.url), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${slug} should have one H1`);
    assert.equal((html.match(/<li class="case-section"/g) || []).length, 12, `${slug} should have twelve sections`);
    for (const heading of requiredSections) assert.ok(html.includes(`>${heading}<`), `${slug} missing ${heading}`);
    assert.ok(html.includes(proof), `${slug} missing approved evidence state`);
    assert.match(html, /href="\/#contact"/);
  }
});

test('operational transformation keeps outcomes qualitative and demo artefacts labelled', async () => {
  const html = await readFile(new URL('../case-studies/operational-transformation/index.html', import.meta.url), 'utf8');
  const result = html.slice(html.indexOf('id="results"'), html.indexOf('id="artefacts"'));
  assert.doesNotMatch(result, /\d+%|triệu|tỷ|tháng|ngày/);
  assert.match(result, /trách nhiệm|cadence|phối hợp/i);
  assert.match(html, /Demo data/);
});
