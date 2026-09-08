import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
const caseData = await readFile(new URL('../assets/js/case-studies.js', import.meta.url), 'utf8');
const script = await readFile(new URL('../assets/js/main.js', import.meta.url), 'utf8');

test('home page exposes source-backed headline proof points', () => {
  for (const fact of [
    '400+ accounts',
    '~12B VNĐ portfolio',
    '7-10 thành viên',
    '30% → 58% retention',
    '70% → 30% churn rủi ro cao',
    '+120% upsell revenue (MRR 100M)',
  ]) {
    assert.match(page, new RegExp(fact.replace(/[+()]/g, '\\$&')));
  }
  assert.doesNotMatch(`${page}\n${caseData}`, /(?<![~≈])12B VNĐ portfolio/);
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

test('progressive enhancement never hides content without JavaScript', () => {
  assert.match(script, /document\.documentElement\.classList\.add\('js-ready'\)/);
  assert.match(css, /html\.js-ready\s+\.reveal/);
  assert.doesNotMatch(css, /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{\s*\.reveal\s*\{/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('case studies retain a complete, generic demo schema and no-JS detail', () => {
  for (const field of ['context', 'challenge', 'role', 'intervention', 'outcomes', 'artefacts', 'learning', 'evidenceStatus']) {
    assert.equal((caseData.match(new RegExp(`${field}:`, 'g')) || []).length, 3, `${field} is present for every demo`);
  }
  assert.doesNotMatch(caseData, /body:/);
  assert.equal((page.match(/<details class="case-study-fallback">/g) || []).length, 3);
  assert.equal((page.match(/<summary>Chi tiết case study demo<\/summary>/g) || []).length, 3);
  assert.match(page, /Bằng chứng &amp; trạng thái/);
});

test('case-study dialog has labelled structured slots populated as text', () => {
  for (const slot of ['context', 'challenge', 'role', 'intervention', 'outcomes', 'artefacts', 'learning', 'evidence']) {
    assert.match(page, new RegExp(`data-case-study-slot="${slot}"`));
  }
  assert.match(script, /dialogSlots\.forEach/);
  assert.match(script, /slot\.textContent/);
});

test('header and desktop layout meet mobile and readability release constraints', () => {
  assert.match(css, /\.site-header\s*\{[^}]*position:\s*sticky[^}]*top:\s*0[^}]*z-index:/);
  assert.match(css, /\.wordmark\s*\{[^}]*min-height:\s*44px/);
  assert.doesNotMatch(css, /\.wordmark span,\s*\.header-cta\s*\{\s*display:\s*none/);
  assert.match(css, /\.impact-grid\s*\{\s*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(css, /\.impact-grid\s*\{\s*grid-template-columns:\s*repeat\(4/);
  assert.match(css, /\.wordmark span\s*\{[^}]*font-size:\s*\.8125rem/);
  assert.match(css, /\.lifecycle p\s*\{[^}]*font-size:\s*1rem/);
  assert.match(page, /class="lifecycle-evidence"/);
});

test('normal-size semantic labels use contrast-safe cyan and green text tokens', () => {
  assert.match(css, /--cyan-text:\s*#[0-9A-F]{6}/);
  assert.match(css, /--green-text:\s*#[0-9A-F]{6}/);
  assert.match(css, /\.eyebrow\s*\{[^}]*color:\s*var\(--cyan-text\)/);
  assert.match(css, /\.metric\s*\{[^}]*color:\s*var\(--green-text\)/);
});

test('case-study data contains exactly three visibly labelled demos', () => {
  assert.equal((caseData.match(/label: 'Case study demo'/g) || []).length, 3);
  assert.match(caseData, /retention-recovery/);
  assert.match(caseData, /expansion-motion/);
  assert.match(caseData, /operational-scaling/);
  assert.match(caseData, /Chờ bổ sung tài liệu/);
});

test('case-study interaction uses native dialog, close behavior, and URL state', () => {
  assert.match(page, /<dialog id="case-study-dialog"/);
  assert.match(script, /export function openCaseStudy\(caseStudy\)/);
  assert.match(script, /export function closeCaseStudy\(\)/);
  assert.match(script, /history\.replaceState/);
  assert.match(script, /caseStudyDialog\.close\(\)/);
  assert.match(script, /Escape/);
});

test('progressive enhancement honors reduced motion and active-section navigation', () => {
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(script, /is-active/);
  assert.match(script, /is-visible/);
  assert.match(page, /data-section-link/);
});
