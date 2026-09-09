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

test('solutions expose six complete business problem-solving records', () => {
  const solutions = page.slice(page.indexOf('<section id="solutions"'), page.indexOf('<section id="operating-system"'));
  assert.equal((solutions.match(/class="solution-card(?:\s|\")/g) || []).length, 6);
  for (const name of ['Customer Retention System', 'Expansion Revenue Engine', 'Onboarding &amp; Adoption', 'Business Operations &amp; Governance', 'Cross-functional Execution', 'AI-enabled Operations']) {
    assert.ok(solutions.includes(name), `missing solution: ${name}`);
  }
  for (const label of ['Bài toán', 'Cách tiếp cận', 'Đầu ra', 'Bằng chứng']) {
    assert.equal((solutions.match(new RegExp(`>${label}<`, 'g')) || []).length, 6);
  }
});

test('operating system and execution loop preserve their six-step source order', () => {
  const layers = ['Strategy', 'Operating Model', 'Execution System', 'Intelligence', 'Cross-functional Motions', 'Business Outcomes'];
  const steps = ['Translate', 'Align', 'Execute', 'Review', 'Intervene', 'Learn'];
  assert.equal((page.match(/class="os-layer"/g) || []).length, 6);
  assert.equal((page.match(/class="loop-step"/g) || []).length, 6);
  for (const orderedLabels of [layers, steps]) {
    const positions = orderedLabels.map((label) => page.indexOf(`>${label}<`));
    assert.ok(positions.every((position) => position > -1));
    assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  }
});

test('AI Operations Lab presents five human-controlled concepts', () => {
  assert.equal((page.match(/class="ai-concept-card(?:\s|\")/g) || []).length, 5);
  assert.equal((page.match(/data-status="concept"/g) || []).length, 5);
  for (const name of ['Account Risk Radar', 'QBR Copilot', 'Voice of Customer Miner', 'Report &amp; Decision Assistant', 'Conversation QA &amp; Coaching']) {
    assert.ok(page.includes(name), `missing AI concept: ${name}`);
  }
  assert.match(page, /không thay thế judgment của đội ngũ/i);
});

test('leadership, career, and 90-day value plan match the approved scope', () => {
  assert.match(page, /id="leadership"/);
  assert.match(page, /Quản lý đội ngũ 8–15 nhân sự/);
  assert.equal((page.match(/class="career-phase(?:\s|\")/g) || []).length, 4);
  for (const company of ['CNV CDP', '1Office', 'Haravan', 'Shinhan Finance']) assert.ok(page.includes(company));
  assert.equal((page.match(/class="ninety-day-phase(?:\s|\")/g) || []).length, 3);
  for (const phase of ['0–30 ngày · Diagnose', '31–60 ngày · Build', '61–90 ngày · Activate']) assert.ok(page.includes(phase));
  assert.match(page, /Không hứa trước một tỷ lệ tăng trưởng cụ thể/);
});

test('contact close uses the approved invitation and direct channels only', () => {
  assert.match(page, /Nếu doanh nghiệp của bạn cần biến chiến lược Customer Growth thành một bộ máy có thể vận hành, chúng ta nên trao đổi\./);
  assert.doesNotMatch(page, /<form\b/i);
});

test('mobile navigation is a labelled native disclosure with progressive closing', () => {
  assert.match(page, /<details[^>]*open[^>]*data-nav-disclosure/);
  assert.match(page, /<summary[^>]*data-menu-toggle[^>]*>Menu<\/summary>/);
  assert.match(page, /<nav id="primary-navigation"[^>]*data-primary-nav/);
  assert.match(script, /navDisclosure\.removeAttribute\('open'\)/);
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /link\.addEventListener\('click'/);
});

test('homepage chapters follow the approved twelve-part reading path', () => {
  const ids = ['hero', 'manifesto', 'impact', 'solutions', 'operating-system', 'strategy-loop', 'case-studies', 'ai-lab', 'leadership', 'experience', 'first-90-days', 'contact'];
  const positions = ids.map((id) => page.indexOf(`id="${id}"`));
  assert.ok(positions.every((position) => position > -1));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('core content stays readable without script and motion is optional', () => {
  assert.match(page, /<details[^>]*open[^>]*data-nav-disclosure/);
  assert.doesNotMatch(page, /hidden[^>]*data-primary-nav/);
  assert.match(css, /html\.js-ready\s+\.reveal/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /scroll-padding-top/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
});

test('homepage identifiers, headings, and images remain accessible', () => {
  const ids = [...page.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  for (const image of page.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image[0], /alt="[^"]+"/);
    assert.match(image[0], /width="\d+"[^>]*height="\d+"/);
  }
  assert.doesNotMatch(page, /target="_blank"(?![^>]*rel="noopener noreferrer")/);
});

export { css, page, script };
