# Portfolio Build Brief Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine Nguyen Van Nhan's static portfolio into a bright, executive B2B Customer Growth & Business Operations site that follows the approved build brief, uses only approved public metrics, and provides three indexable case-study routes.

**Architecture:** Keep the dependency-free static architecture. The homepage remains the narrative hub; three directory-style HTML pages become the canonical case studies; shared CSS provides the design system; a small progressive-enhancement script owns the mobile navigation, section state, and optional reveal motion. The preview server resolves directory routes safely without adding a framework or client router.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla ES modules, Node.js built-in test runner and HTTP server, Python/PyMuPDF/Pillow only for deterministic image generation.

**Spec:** `docs/superpowers/specs/2026-09-09-portfolio-build-brief-refinement-design.md`

## Global Constraints

- The 2026-09-09 approved brief is authoritative for conflicting public metrics: `500+` accounts, `18 tỷ VNĐ+` portfolio, team `8–15`, retention `28% → 58%` in more than 12 months, `110% mục tiêu upsell` with MRR upsell `100 triệu VNĐ`, and credit usage `20% → 60%`.
- Never rewrite `110% mục tiêu upsell` as `110% growth`, `+110%`, `110% increase`, or `tăng trưởng upsell 110%`.
- The older CV remains a secondary source only for non-conflicting employers, dates, tools, education, and recognition.
- All unverified artefacts and AI concepts must carry a visible `Demo data` or `Concept` label.
- Operational Transformation may claim qualitative outcomes only; no invented percentage, money, or time-saving result.
- Core content, navigation, contact links, and all case-study copy must work with JavaScript disabled.
- Do not add a CMS, analytics, contact backend, CV download, dependency manager, or front-end framework.
- Use `rtk` for every shell command in this repository.

## File Map and Responsibilities

| Path | Responsibility |
|---|---|
| `index.html` | Homepage narrative, approved public facts, section landmarks, SEO metadata, static case links, direct contact paths |
| `assets/css/styles.css` | Shared tokens, typography, homepage layout, components, navigation, focus, responsive behavior, reduced motion |
| `assets/css/case-study.css` | Case-study-only layout for the 12-part evidence narrative |
| `assets/js/main.js` | Progressive enhancement: mobile disclosure, active section, reveal states; no content ownership |
| `assets/js/case-studies.js` | Delete after static case routes replace the modal data source |
| `case-studies/retention-recovery/index.html` | Canonical retention case, including the approved `28% → 58%` result |
| `case-studies/expansion-revenue/index.html` | Canonical expansion case, including `110% mục tiêu upsell` and MRR `100 triệu VNĐ` wording |
| `case-studies/operational-transformation/index.html` | Canonical operations case with qualitative outcomes only |
| `assets/images/nguyen-van-nhan.webp` | Locally extracted portrait for the approved asset slot; branch review required before publication |
| `assets/images/favicon.svg` | Monogram browser icon |
| `assets/images/og-portfolio.png` | 1200×630 share image without unverified metrics |
| `scripts/build-portfolio-assets.py` | Deterministically crop the CV portrait and generate social assets |
| `server.mjs` | Safe static delivery and directory-index resolution |
| `tests/portfolio.test.mjs` | Homepage content, semantics, visual tokens, and no-JS contracts |
| `tests/case-studies.test.mjs` | Three-route completeness, 12-part schema, evidence wording, and link contracts |
| `tests/server.test.mjs` | HTTP status, directory routes, traversal protection, and MIME headers |
| `README.md` | Preview, asset regeneration, content-authority, and case-route maintenance notes |

## Stable Interfaces Between Tasks

- Homepage section IDs: `impact`, `solutions`, `operating-system`, `strategy-loop`, `case-studies`, `ai-lab`, `leadership`, `experience`, `first-90-days`, `contact`.
- Navigation enhancement hooks: `[data-nav-disclosure]`, `[data-menu-toggle]`, `[data-primary-nav]`, `[data-section-link]`.
- Reveal enhancement hooks: `.reveal`; JavaScript may add `.is-visible` only after adding `html.js-ready`.
- Case-card links are ordinary anchors to `/case-studies/<slug>/`; no buttons, dialog, hash router, or JavaScript data hydration.
- Every case page has one `<h1>`, a `main.case-study-page`, an ordered `ol.case-study-sections`, exactly twelve direct `li` items, and a visible evidence-state badge.
- Shared CTA wording is `Trao đổi cùng tôi`; it links to `/#contact` from case pages and `#contact` from the homepage.
- Asset script CLI: `python scripts/build-portfolio-assets.py --pdf <absolute-pdf-path> --output-dir assets/images`.

---

### Task 1: Lock the authoritative homepage content contract

**Files:**
- Modify: `tests/portfolio.test.mjs`
- Modify: `index.html`

**Interfaces:** Homepage SEO, `hero`, `manifesto`, and `impact` become the source of truth for approved positioning and metrics. Later tasks append sections without changing these facts.

- [ ] **Step 1: Replace the entire stale portfolio contract with the approved brief contract**

Remove the old dark-command-center, modal, four-impact-card, and superseded metric assertions before adding the new tests below; do not extend assertions that deliberately encode the 2026-09-07 design.

```js
test('home page uses only the approved public headline metrics', () => {
  for (const fact of [
    '500+ tài khoản SME &amp; Enterprise',
    '18 tỷ VNĐ+',
    '8–15',
    '28% → 58%',
    '110% mục tiêu upsell',
    'MRR upsell 100 triệu VNĐ',
    '20% → 60%',
  ]) assert.match(page, new RegExp(fact));

  for (const stale of ['400+ accounts', '~12B', '7-10', '30% → 58%', '+120%']) {
    assert.doesNotMatch(page, new RegExp(stale.replace('+', '\\+')));
  }
  assert.doesNotMatch(page, /(?:\+110%|110%\s+(?:growth|increase)|tăng trưởng upsell 110%)/i);
});
```

- [ ] **Step 2: Add tests for identity, metadata, section order, and direct contact**

```js
test('hero and first chapters follow the approved executive narrative', () => {
  assert.match(page, /<title>Nguyễn Văn Nhân \| Customer Growth &amp; Business Operations Leader<\/title>/);
  assert.match(page, /<h1 id="hero-title">Tôi xây hệ thống giúp chiến lược được thực thi, đội ngũ vận hành ổn định và khách hàng hiện hữu tạo ra tăng trưởng\.<\/h1>/);
  const sequence = ['hero', 'manifesto', 'impact'].map((name) => page.indexOf(`id="${name}"`));
  assert.ok(sequence.every((offset) => offset > -1));
  assert.deepEqual(sequence, [...sequence].sort((a, b) => a - b));
  assert.match(page, /href="tel:\+84967347781"/);
  assert.match(page, /href="mailto:nhannv\.working@gmail\.com"/);
  assert.doesNotMatch(page, /<a[^>]+download/i);
});
```

- [ ] **Step 3: Run the focused test and confirm it fails on the old site**

Run: `rtk node --test tests/portfolio.test.mjs`

Expected: FAIL because the old page still contains `400+`, `~12B`, `7-10`, `30% → 58%`, and `+120%`.

- [ ] **Step 4: Replace homepage metadata, header, hero, manifesto, and impact markup**

Use semantic static content and six impact cards. The first card pattern is:

```html
<section id="impact" class="section impact" aria-labelledby="impact-title">
  <div class="section-shell">
    <p class="eyebrow">Business impact</p>
    <h2 id="impact-title">Kết quả kinh doanh, không chỉ hoạt động.</h2>
    <div class="impact-grid">
      <article class="impact-card">
        <p class="metric">28% → 58%</p>
        <h3>Retention recovery</h3>
        <p>Trong hơn 12 tháng, thông qua segmentation, early-warning và nhịp can thiệp theo mức độ rủi ro.</p>
      </article>
    </div>
  </div>
</section>
```

The six cards must cover retention, high-risk churn, upsell target/MRR, accounts, portfolio/team, and credit usage. Keep `110% mục tiêu upsell` intact in one text node.

- [ ] **Step 5: Run homepage tests**

Run: `rtk node --test tests/portfolio.test.mjs`

Expected: PASS for the new content and landmark assertions.

- [ ] **Step 6: Commit the authoritative content slice**

```bash
rtk git add index.html tests/portfolio.test.mjs
rtk git commit -m "feat: align portfolio with approved growth metrics"
```

---

### Task 2: Build the bright executive visual foundation and verified asset pipeline

**Files:**
- Create: `scripts/build-portfolio-assets.py`
- Create: `assets/images/nguyen-van-nhan.webp`
- Create: `assets/images/favicon.svg`
- Create: `assets/images/og-portfolio.png`
- Modify: `assets/css/styles.css`
- Modify: `index.html`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:** The script accepts the stable CLI documented above. CSS exposes shared custom properties for later homepage and case-study components.

- [ ] **Step 1: Add failing token, asset, and accessibility assertions**

```js
test('visual foundation exposes approved tokens and share assets', async () => {
  for (const color of ['#F6F7F9', '#FFFFFF', '#0B1F3A', '#475569', '#2563EB', '#1E9B6A', '#C93D5B', '#DCE2EA', '#145DD7']) {
    assert.match(css, new RegExp(color));
  }
  assert.match(page, /href="assets\/images\/favicon\.svg"/);
  assert.match(page, /content="\/assets\/images\/og-portfolio\.png"/);
  assert.match(page, /src="assets\/images\/nguyen-van-nhan\.webp"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);
});
```

Add a PNG header helper to validate `og-portfolio.png` is exactly 1200×630 and `stat()` assertions that all three files exist.

- [ ] **Step 2: Run the focused test and confirm missing assets fail**

Run: `rtk node --test --test-name-pattern="visual foundation" tests/portfolio.test.mjs`

Expected: FAIL because the new tokens, portrait, favicon, and OG image do not exist.

- [ ] **Step 3: Add the deterministic asset builder**

Implement `scripts/build-portfolio-assets.py` with this public CLI and normalized first-page crop:

```python
parser.add_argument('--pdf', required=True)
parser.add_argument('--output-dir', required=True)
page = fitz.open(args.pdf)[0]
clip = fitz.Rect(
    page.rect.width * 0.68,
    page.rect.height * 0.04,
    page.rect.width * 0.97,
    page.rect.height * 0.35,
)
pix = page.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip, alpha=False)
portrait = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
portrait = ImageOps.fit(portrait, (720, 900), method=Image.Resampling.LANCZOS)
portrait.save(output_dir / 'nguyen-van-nhan.webp', 'WEBP', quality=88, method=6)
```

The same script must generate a 1200×630 navy/white/blue OG canvas with the name, title, and `Customer Growth · Business Operations`, and write an original `NVN` SVG favicon; do not place performance metrics on the OG image.

- [ ] **Step 4: Generate and inspect the portrait and OG assets**

Run:

```bash
rtk /Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/build-portfolio-assets.py --pdf "/Users/cellphones/Downloads/Cv CSL Bảng chuẩn.pdf" --output-dir assets/images
```

Expected: `nguyen-van-nhan.webp`, `favicon.svg`, and `og-portfolio.png` exist; the portrait crop shows the person without CV text in the final 4:5 frame. If the source layout shifted, adjust the four normalized crop constants once and regenerate.

- [ ] **Step 5: Rebuild the shared CSS foundation**

Start with these tokens and type roles, then style the sticky header, bright hero, portrait frame, manifesto, and 3×2 impact grid:

```css
:root {
  --canvas: #F6F7F9;
  --surface: #FFFFFF;
  --navy: #0B1F3A;
  --body: #475569;
  --blue: #2563EB;
  --green: #1E9B6A;
  --coral: #C93D5B;
  --border: #DCE2EA;
  --focus: #145DD7;
  --content: 1180px;
  --radius-card: 24px;
}

html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
body { margin: 0; overflow-x: clip; background: var(--canvas); color: var(--body); }
h1, h2, h3 { color: var(--navy); font-family: Manrope, Inter, system-ui, sans-serif; }
a, button { min-height: 44px; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.impact-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
```

- [ ] **Step 6: Connect SEO and portrait markup**

Add the exact brief title and description, canonical `/`, Open Graph/Twitter tags, explicit image dimensions, and useful alt text:

```html
<link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
<link rel="canonical" href="/">
<meta name="description" content="Portfolio của Nguyễn Văn Nhân — Customer Growth & Business Operations Leader với kinh nghiệm xây hệ thống retention, expansion revenue, Customer Success Operations và AI-enabled execution.">
<meta property="og:image" content="/assets/images/og-portfolio.png">
<img src="assets/images/nguyen-van-nhan.webp" width="720" height="900" alt="Nguyễn Văn Nhân, Customer Growth & Business Operations Leader">
```

- [ ] **Step 7: Run tests and commit**

Run: `rtk node --test tests/portfolio.test.mjs`

Expected: PASS.

```bash
rtk git add index.html assets/css/styles.css assets/images scripts/build-portfolio-assets.py tests/portfolio.test.mjs
rtk git commit -m "feat: establish executive portfolio visual system"
```

---

### Task 3: Add solutions, Business Growth OS, and strategy-execution loop

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:** `#solutions`, `#operating-system`, and `#strategy-loop` are independent navigable chapters. Each solution card uses the same four-labelled structure.

- [ ] **Step 1: Add failing structure tests**

```js
test('solutions and operating system express the approved business model', () => {
  assert.equal((page.match(/class="solution-card"/g) || []).length, 6);
  for (const label of ['Bài toán', 'Cách tiếp cận', 'Đầu ra', 'Bằng chứng']) {
    assert.equal((page.match(new RegExp(`>${label}<`, 'g')) || []).length, 6);
  }
  for (const layer of ['Strategy', 'Operating Model', 'Execution System', 'Intelligence', 'Cross-functional Motions', 'Business Outcomes']) {
    assert.match(page, new RegExp(`>${layer}<`));
  }
  for (const step of ['Translate', 'Align', 'Execute', 'Review', 'Intervene', 'Learn']) {
    assert.match(page, new RegExp(`>${step}<`));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `rtk node --test --test-name-pattern="solutions and operating" tests/portfolio.test.mjs`

Expected: FAIL because the new solution cards, OS layers, and strategy loop are absent.

- [ ] **Step 3: Add six solution cards**

Cover Customer Retention System, Expansion Revenue Engine, Onboarding & Adoption, Business Operations & Governance, Cross-functional Execution, and AI-enabled Operations. Use a real definition list so the four labels remain semantic:

```html
<article class="solution-card">
  <p class="solution-index">01</p>
  <h3>Customer Retention System</h3>
  <dl>
    <div><dt>Bài toán</dt><dd>Phát hiện rủi ro muộn, xử lý churn bị động.</dd></div>
    <div><dt>Cách tiếp cận</dt><dd>Segmentation, health score, early-warning, risk review và renewal forecast.</dd></div>
    <div><dt>Đầu ra</dt><dd>Risk matrix, action plan, dashboard và cơ chế escalation.</dd></div>
    <div><dt>Bằng chứng</dt><dd>Retention 28% → 58%; high-risk churn 70% → 30%.</dd></div>
  </dl>
</article>
```

- [ ] **Step 4: Add the six-layer Business Growth OS and six-step loop**

Use an ordered list for the loop and a labelled grid for the OS. Ensure the mobile source order remains Strategy → Outcomes and Translate → Learn without CSS reordering.

- [ ] **Step 5: Style both sections for scanning and responsive stacking**

Use white cards, subtle border/shadow, restrained blue/green/coral accents, and no auto-running carousels. At `max-width: 900px`, collapse both dense layouts to one column or an accessible two-column grid without horizontal scrolling.

- [ ] **Step 6: Run tests and commit**

Run: `rtk node --test tests/portfolio.test.mjs`

Expected: PASS.

```bash
rtk git add index.html assets/css/styles.css tests/portfolio.test.mjs
rtk git commit -m "feat: add growth solutions and operating model"
```

---

### Task 4: Complete the leadership, AI Lab, career, 90-day, and contact story

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:** AI cards use `[data-status="concept"]`; career uses four chronological phases; 90-day plan uses three ordered phases; contact remains direct links only.

- [ ] **Step 1: Add failing chapter-completeness tests**

```js
test('decision-support and leadership chapters are complete', () => {
  assert.equal((page.match(/class="ai-concept-card"/g) || []).length, 5);
  assert.equal((page.match(/data-status="concept"/g) || []).length, 5);
  assert.match(page, />Account Risk Radar</);
  assert.match(page, />QBR Copilot</);
  assert.match(page, />Voice of Customer Miner</);
  assert.match(page, />Report &amp; Decision Assistant</);
  assert.match(page, />Conversation QA &amp; Coaching</);
  assert.equal((page.match(/class="career-phase"/g) || []).length, 4);
  assert.equal((page.match(/class="ninety-day-phase"/g) || []).length, 3);
  assert.match(page, /8–15/);
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `rtk node --test --test-name-pattern="decision-support" tests/portfolio.test.mjs`

Expected: FAIL because the AI Lab, four-phase career, and 90-day plan are not present.

- [ ] **Step 3: Add the five AI Lab concept cards**

Each card must show the input problem, non-sensitive data flow, AI responsibility, human checkpoint, output artefact, and a visible `Concept` status. Example:

```html
<article class="ai-concept-card" data-status="concept">
  <div class="card-heading"><h3>Account Risk Radar</h3><span>Concept</span></div>
  <dl>
    <div><dt>Vấn đề đầu vào</dt><dd>Tín hiệu rủi ro nằm rải rác giữa usage, ticket và trao đổi.</dd></div>
    <div><dt>Luồng dữ liệu</dt><dd>Usage, health signals và support notes đã loại thông tin nhạy cảm.</dd></div>
    <div><dt>AI thực hiện</dt><dd>Tổng hợp risk brief và đề xuất action queue.</dd></div>
    <div><dt>Human checkpoint</dt><dd>CSM xác minh tín hiệu và quyết định hành động.</dd></div>
    <div><dt>Đầu ra</dt><dd>Risk summary và danh sách tài khoản cần ưu tiên.</dd></div>
  </dl>
</article>
```

- [ ] **Step 4: Add leadership scope, four career phases, and 90-day value plan**

Keep leadership anchored on team `8–15`, KPI/OKR cadence, coaching, and cross-functional decision rights. Use the four approved company phases: CNV CDP, 1Office, Haravan, and Shinhan Finance. The 90-day ordered list must be `0–30 ngày · Diagnose`, `31–60 ngày · Build`, `61–90 ngày · Activate`.

- [ ] **Step 5: Replace the footer with the approved direct-contact close**

Use the headline `Nếu doanh nghiệp của bạn cần biến chiến lược Customer Growth thành một bộ máy có thể vận hành, chúng ta nên trao đổi.` with tel, email, LinkedIn, and no form.

- [ ] **Step 6: Style and verify the complete homepage sequence**

Add a test that asserts all twelve IDs appear in the exact approved order. Confirm the mobile DOM order matches the visual order.

- [ ] **Step 7: Run tests and commit**

Run: `rtk node --test tests/portfolio.test.mjs`

Expected: PASS.

```bash
rtk git add index.html assets/css/styles.css tests/portfolio.test.mjs
rtk git commit -m "feat: complete portfolio leadership narrative"
```

---

### Task 5: Replace modal demos with three canonical static case-study routes

**Files:**
- Create: `tests/case-studies.test.mjs`
- Create: `assets/css/case-study.css`
- Create: `case-studies/retention-recovery/index.html`
- Create: `case-studies/expansion-revenue/index.html`
- Create: `case-studies/operational-transformation/index.html`
- Modify: `index.html`
- Modify: `assets/js/main.js`
- Delete: `assets/js/case-studies.js`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:** Each case is a standalone HTML document using `../../assets/css/styles.css`, `../../assets/css/case-study.css`, and `../../assets/js/main.js`. Homepage cards link directly to directory routes.

- [ ] **Step 1: Create failing route and 12-part narrative tests**

```js
const cases = [
  ['retention-recovery', '28% → 58%'],
  ['expansion-revenue', '110% mục tiêu upsell'],
  ['operational-transformation', 'Demo data'],
];

test('three canonical case pages implement the twelve-part template', async () => {
  for (const [slug, proof] of cases) {
    const html = await readFile(new URL(`../case-studies/${slug}/index.html`, import.meta.url), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal((html.match(/<li class="case-section"/g) || []).length, 12);
    assert.match(html, new RegExp(proof));
    assert.match(html, /href="\/\#contact"/);
  }
});
```

Also assert the operational page contains none of the approved performance numbers and every homepage case link matches one of the three routes.

- [ ] **Step 2: Run the case test and confirm it fails**

Run: `rtk node --test tests/case-studies.test.mjs`

Expected: FAIL with `ENOENT` because the three route files do not exist.

- [ ] **Step 3: Build the shared case-study page skeleton**

Each page uses this structural contract:

```html
<main class="case-study-page">
  <header class="case-hero">
    <a href="/">← Portfolio</a>
    <p class="eyebrow">Case study</p>
    <h1>Retention Recovery</h1>
    <p class="case-result">Retention 28% → 58% trong hơn 12 tháng.</p>
  </header>
  <ol class="case-study-sections">
    <li class="case-section"><span>01</span><h2>Executive summary</h2><p>Tái thiết nhịp retention bằng segmentation, cảnh báo sớm và can thiệp theo mức độ rủi ro.</p></li>
  </ol>
</main>
```

The twelve headings are: Executive summary; Bối cảnh kinh doanh; Vấn đề và baseline; Vai trò và phạm vi quyết định của Nhân; Chẩn đoán nguyên nhân; Chiến lược lựa chọn; Các bước triển khai; Các phòng ban liên quan; KPI/OKR và cơ chế kiểm soát; Kết quả định lượng và định tính; Artefact đã tạo; Bài học và cách áp dụng ở doanh nghiệp khác.

- [ ] **Step 4: Write Retention Recovery and Expansion Revenue with approved evidence wording**

Retention owns `28% → 58%` and more than 12 months; Expansion owns `110% mục tiêu upsell`, MRR `100 triệu VNĐ`, and credit usage `20% → 60%`. Do not repeat unrelated metrics as if they were case-level outcomes. Mark reconstructed artefact mockups `Demo data`.

- [ ] **Step 5: Write Operational Transformation with qualitative results only**

Its results must describe clearer accountability, more consistent cadence, earlier escalation, and better cross-functional visibility. Keep scope `500+ accounts`, `18 tỷ VNĐ+ portfolio`, and team `8–15` in Context, not as improvement claims. Add a `Demo data` badge to KPI/OKR and artefact examples.

- [ ] **Step 6: Replace homepage case buttons and dialog with static links**

Use exactly these routes:

```html
<a class="case-card-link" href="/case-studies/retention-recovery/">Xem Retention Recovery</a>
<a class="case-card-link" href="/case-studies/expansion-revenue/">Xem Expansion Revenue</a>
<a class="case-card-link" href="/case-studies/operational-transformation/">Xem Operational Transformation</a>
```

Remove the `<dialog>`, hash-state code, `case-studies.js` import, and the unused data file.

- [ ] **Step 7: Style the case template and no-JS navigation**

Use a narrow reading column for prose, a sticky desktop table-of-contents only if it remains ordinary anchors, numbered sections, visible evidence badges, and `scroll-margin-top` for anchored headings.

- [ ] **Step 8: Run both suites and commit**

Run: `rtk node --test tests/portfolio.test.mjs tests/case-studies.test.mjs`

Expected: PASS.

```bash
rtk git add index.html assets/css assets/js/main.js case-studies tests
rtk git rm assets/js/case-studies.js
rtk git commit -m "feat: publish three static case study routes"
```

---

### Task 6: Add accessible mobile navigation and directory-route serving

**Files:**
- Modify: `assets/js/main.js`
- Modify: `assets/css/styles.css`
- Modify: `index.html`
- Modify: `server.mjs`
- Modify: `tests/portfolio.test.mjs`
- Modify: `tests/server.test.mjs`

**Interfaces:** A native `<details open data-nav-disclosure>` owns the menu state, its `<summary data-menu-toggle>` provides the labelled control, and `[data-primary-nav]` contains ordinary anchors. The server maps only existing directory paths to their own `index.html`; it never falls back unknown URLs to the homepage.

- [ ] **Step 1: Add failing navigation-contract tests**

```js
test('mobile navigation is a labelled native disclosure', () => {
  assert.match(page, /<details[^>]*open[^>]*data-nav-disclosure/);
  assert.match(page, /<summary[^>]*data-menu-toggle[^>]*>Menu<\/summary>/);
  assert.match(page, /<nav id="primary-navigation"[^>]*data-primary-nav/);
  assert.match(script, /navDisclosure\.removeAttribute\('open'\)/);
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /link\.addEventListener\('click'/);
});
```

- [ ] **Step 2: Add failing HTTP tests for all directory routes**

```js
test('preview server resolves canonical case directories', async () => {
  for (const slug of ['retention-recovery', 'expansion-revenue', 'operational-transformation']) {
    const response = await fetch(`http://127.0.0.1:${port}/case-studies/${slug}/`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /<main class="case-study-page">/);
  }
});
```

Keep the existing traversal and malformed-path assertions. Change `/assets/` to remain 404 while valid case directories return 200.

- [ ] **Step 3: Run the focused suites and confirm failures**

Run: `rtk node --test --test-name-pattern="mobile navigation|canonical case" tests/portfolio.test.mjs tests/server.test.mjs`

Expected: FAIL because the disclosure interface and directory index behavior are not implemented.

- [ ] **Step 4: Implement the disclosure menu as progressive enhancement**

```js
const navDisclosure = document.querySelector('[data-nav-disclosure]');
const navSummary = document.querySelector('[data-menu-toggle]');
const mobileViewport = window.matchMedia('(max-width: 768px)');

if (mobileViewport.matches) navDisclosure?.removeAttribute('open');

document.querySelectorAll('[data-primary-nav] a').forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileViewport.matches) navDisclosure?.removeAttribute('open');
  });
});
```

Close on link activation and Escape; restore `open` when the viewport returns to desktop. After Escape, return focus to `navSummary`. The contact CTA stays visible outside the disclosure.

- [ ] **Step 5: Resolve existing directory indexes safely**

Replace the unconditional directory rejection in `server.mjs` with:

```js
const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
const relativePath = pathname.endsWith('/') ? `${requestedPath}index.html` : requestedPath;
const filePath = resolve(root, relativePath);
```

Preserve the resolved-root prefix check before `stat()`/`readFile()` and preserve 404 for missing directories.

- [ ] **Step 6: Run all Node tests and commit**

Run: `rtk node --test tests/*.test.mjs`

Expected: PASS.

```bash
rtk git add index.html assets/css/styles.css assets/js/main.js server.mjs tests
rtk git commit -m "feat: support mobile nav and static case routes"
```

---

### Task 7: Finish responsive, accessibility, SEO, and maintenance verification

**Files:**
- Modify: `assets/css/styles.css`
- Modify: `assets/css/case-study.css`
- Modify: `assets/js/main.js`
- Modify: `tests/portfolio.test.mjs`
- Modify: `tests/case-studies.test.mjs`
- Modify: `README.md`

**Interfaces:** This task does not add product scope. It closes the release contracts at 375, 768, 1024, and 1440 CSS pixels and documents future content replacement.

- [ ] **Step 1: Add final static accessibility and resilience assertions**

```js
test('core content survives without script and motion is optional', () => {
  assert.doesNotMatch(page, /hidden[^>]*data-primary-nav/);
  assert.match(css, /html\.js-ready/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /scroll-padding-top/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
});
```

Add checks for one H1 per document, unique IDs, non-empty image alt text, no old metric strings anywhere in HTML/JS, and no `target="_blank"` without `rel="noopener noreferrer"`.

- [ ] **Step 2: Run all tests before polish and record any failing contract**

Run: `rtk node --test tests/*.test.mjs`

Expected: Any remaining failures identify only missing release hardening, not new content requirements.

- [ ] **Step 3: Complete responsive and reduced-motion CSS**

At 1024px reduce gutters and dense grids; at 768px activate the disclosure menu and stack OS/career layouts; at 375px keep one-column cards and prevent long metric strings from overflowing. Disable smooth scrolling and transitions for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 4: Update maintenance documentation**

Document:

- the authoritative metric list and the forbidden upsell rewrites;
- the three case routes and 12-part schema;
- the asset regeneration command and portrait publication review requirement;
- the local preview and test commands;
- how `Demo data` and `Concept` labels may be removed only after evidence approval.

- [ ] **Step 5: Run automated release verification**

```bash
rtk node --test tests/*.test.mjs
rtk git diff --check
rtk git status --short
```

Expected: all tests PASS, `git diff --check` prints nothing, and status lists only the intended Task 7 files.

- [ ] **Step 6: Run visual QA at the four target widths**

Start: `rtk node server.mjs`

Inspect homepage, all three case routes, `#contact`, menu open/close, keyboard focus, and no-script behavior at 375×812, 768×1024, 1024×768, and 1440×900. Confirm no horizontal overflow, sticky header does not cover anchors, all touch targets are at least 44px, the portrait crop is correct, and focus return works after closing the mobile menu.

- [ ] **Step 7: Commit the release hardening**

```bash
rtk git add README.md assets/css assets/js/main.js tests
rtk git commit -m "chore: harden portfolio release experience"
```

- [ ] **Step 8: Record final evidence**

Run:

```bash
rtk git log --oneline -7
rtk git status --short --branch
rtk node --test tests/*.test.mjs
```

Expected: seven implementation commits after the approved design and plan commits, a clean branch, and a complete passing test summary.

## Plan Self-Review Checklist

- Every approved homepage chapter is owned by exactly one task.
- All three case routes, all twelve case fields, and server directory handling have explicit tests before implementation.
- Approved public facts and forbidden stale/ambiguous wordings are encoded as executable assertions.
- Asset generation, portrait review, mobile navigation, no-JS behavior, focus, reduced motion, SEO, and responsive widths are covered.
- Each task names exact files, stable interfaces, expected failing/passing commands, and a focused commit.
- The plan contains no deferred implementation gaps or cross-references that require guessing.
