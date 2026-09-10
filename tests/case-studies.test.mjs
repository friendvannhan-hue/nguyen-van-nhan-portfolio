import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const cases = [
  ['retention-recovery', '28% → 58%', 'Khởi động chiến lược giữ chân và gia hạn trên quy mô toàn công ty', 'Đội gia hạn phần mềm còn non trẻ, thiếu người dẫn dắt và chưa có hệ thống chung.'],
  ['expansion-revenue', '110% mục tiêu upsell', 'Biến QBR và kế hoạch tài khoản thành động lực tăng trưởng bền vững', 'Doanh thu chững lại, cơ hội bán thêm khó xác định và đội ngũ thiếu nhịp phối hợp.'],
  ['operational-transformation', 'Qualitative', 'Tái thiết vận hành sau bán hàng thành mô hình xuyên suốt', 'Quy trình chồng chéo, trách nhiệm mơ hồ và hành trình khách hàng chưa được tối ưu.'],
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

test('homepage links to the two approved detailed case studies', () => {
  assert.equal((home.match(/class="case-card(?:\s|\")/g) || []).length, 3);
  for (const [slug] of cases.slice(0, 2)) {
    assert.match(home, new RegExp(`href="/case-studies/${slug}/"`));
  }
  assert.doesNotMatch(home, /href="\/case-studies\/operational-transformation\/"/);
  assert.doesNotMatch(home, /Xem chi tiết chuyển đổi vận hành/);
  assert.doesNotMatch(home, /<dialog\b|data-case-study-id|#case-study=/);
});

test('three canonical case pages implement the shared twelve-part narrative', async () => {
  for (const [slug, proof, title, context] of cases) {
    const html = await readFile(new URL(`../case-studies/${slug}/index.html`, import.meta.url), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${slug} should have one H1`);
    assert.equal((html.match(/<li class="case-section"/g) || []).length, 12, `${slug} should have twelve sections`);
    for (const heading of requiredSections) assert.ok(html.includes(`>${heading}<`), `${slug} missing ${heading}`);
    assert.ok(html.includes(proof), `${slug} missing approved evidence state`);
    assert.ok(html.includes(`<h1>${title}</h1>`), `${slug} missing localized title`);
    assert.ok(html.includes(context), `${slug} missing business context`);
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

test('public pages contain no superseded portfolio claims', async () => {
  const pages = [home];
  for (const [slug] of cases) pages.push(await readFile(new URL(`../case-studies/${slug}/index.html`, import.meta.url), 'utf8'));
  const corpus = pages.join('\n');
  for (const stale of ['400+ accounts', '~12B', '7-10', '30% → 58%', '+120%']) {
    assert.ok(!corpus.includes(stale), `superseded claim remains: ${stale}`);
  }
  assert.doesNotMatch(corpus, /(?:\+110%|110%\s+(?:growth|increase)|tăng trưởng upsell 110%)/i);
});
