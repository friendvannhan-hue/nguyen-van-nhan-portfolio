# Personal Growth OS Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, accessible, Vietnamese-first static portfolio that positions Nguyen Van Nhan first as a Customer Growth Leader, followed by Customer Success Leader, Account Management, and Sales Operations, through verifiable outcomes and expandable demo case studies.

**Architecture:** Use a dependency-free static site: semantic HTML for content and resilient no-JavaScript reading, CSS custom properties for the bright Personal Growth OS design system, and a small progressive-enhancement JavaScript module for active navigation, motion, and case-study disclosure. Keep copy and case-study configuration in a local JavaScript data module so supplied portrait assets and evidence can be inserted later without restructuring the page.

**Tech Stack:** HTML5, CSS3 custom properties and media queries, vanilla JavaScript ES modules, and the Node built-in test runner. The output is compatible with GitHub Pages, but deployment configuration is deferred until the GitHub username and repository are supplied. Use the bundled Node runtime at `/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node` for automated checks; no npm dependencies, build tool, analytics, backend, or form service.

**Spec:** `docs/superpowers/specs/2026-09-07-personal-growth-os-design.md`

## Global Constraints

- Build a Vietnamese-first single-page portfolio with deep-linkable case-study states, direct phone, email, and LinkedIn actions, and no data collection.
- Use this positioning order: Customer Growth Leader, Customer Success Leader, Account Management, then Sales Operations.
- Public contact endpoints are phone `096 734 7781` rendered as `tel:+84967347781`, email `nhannv.working@gmail.com`, and LinkedIn `https://www.linkedin.com/in/nguyenvannhan/`.
- Do not publish, embed, link, or offer the current CV PDF as a download.
- Use only claims and figures documented in the supplied CV or later explicitly approved by Nhan. Preserve each metric's time frame, account segment, and scope.
- Use the bright Personal Growth OS tokens: `#F6F7F9`, `#FFFFFF`, `#0B1F3A`, `#536176`, decorative coral `#F0647C`, interactive coral `#C93D5B`, `#2BA6C8`, `#1E9B6A`, `#DCE2EA`, and `#145DD7`.
- White text may use `#C93D5B` because it measures 4.88:1. White text must not use `#F0647C`, `#2BA6C8`, or `#1E9B6A` as its background.
- Use Inter for body/UI and Manrope for display text with robust system font fallbacks. Body text is at least 16 px; metadata is at least 13 px.
- Never use CNV Work logos, screenshots, page code, or brand assets. The influence is narrative structure and outcome-led data presentation only.
- Initial case-study cards must visibly say `Case study demo` and must not invent client details, testimonials, screenshots, customer logos, or unverified metrics.
- Support keyboard operation, visible focus, `prefers-reduced-motion`, descriptive labels, and 4.5:1 normal-text contrast.
- Check responsive behavior at 375, 768, 1024, and 1440 px. No horizontal overflow is acceptable.
- Preserve the user's unrelated untracked CV assets, generated outputs, and earlier 2026-09-04 planning documents.

---

## Planned File Structure

- `index.html` — semantic document, Vietnamese copy, landmark structure, navigation, static fallback case-study cards, and direct contact actions.
- `assets/css/styles.css` — Personal Growth OS tokens, responsive layout, component styles, focus states, and reduced-motion rules.
- `assets/js/case-studies.js` — typed-by-convention case-study data and rendering-safe copy for the three demo cards.
- `assets/js/main.js` — progressive enhancements: mobile menu, active anchors, reduced-motion-safe reveal states, accessible case-study dialog, and URL hash handling.
- `assets/images/portrait-placeholder.svg` — original abstract business-casual portrait placeholder with accessible decorative treatment; later replaced by a user-provided image at the same path or by updating one image source.
- `server.mjs` — zero-dependency local static server with content-type mapping and path traversal protection.
- `tests/portfolio.test.mjs` — Node built-in static tests for source-backed facts, semantic landmarks, accessible controls, configuration boundaries, and critical CSS rules.
- `tests/server.test.mjs` — Node integration tests for static serving, content types, unknown paths, and traversal protection.
- `README.md` — local preview and test instructions, GitHub Pages compatibility notes, and the replacement workflow for portrait and case-study evidence.

## Shared Content and Component Contracts

### Case study record

`assets/js/case-studies.js` exports `caseStudies`, an array of these records:

```js
{
  id: 'retention-recovery',
  label: 'Case study demo',
  category: 'Retention strategy',
  title: 'Phuc hoi retention bang early-warning workflow',
  summary: 'Demo cau truc case study; se bo sung bang chung duoc phe duyet.',
  context: 'Tai khoan SME va Enterprise can duoc phan nhom theo muc do rui ro.',
  challenge: 'Phat hien som nguy co churn truoc ky renewal.',
  role: 'Customer Growth Leader',
  intervention: ['Segmentation', 'Health score', 'Weekly review'],
  outcomes: ['Retention 30% -> 58% trong hon 8 thang', 'High-risk churn 70% -> 30%'],
  evidenceStatus: 'Cho bo sung tai lieu va artefact da phe duyet'
}
```

Production copy must use proper Vietnamese diacritics; the snippet uses ASCII only to make property names and test strings unambiguous. `main.js` consumes this record to render the dialog. `index.html` continues to include card buttons as readable fallback content, so the page does not require JavaScript to expose the portfolio narrative.

### Case-study dialog API

`main.js` exports `openCaseStudy(caseStudy)` and `closeCaseStudy()`. `openCaseStudy` must fill `#case-study-dialog-title` and `#case-study-dialog-body`, set `dialog.open`, focus the close button, and update `history.replaceState` to `#case-study=<id>`. `closeCaseStudy` must close the dialog, restore focus to the triggering card, and remove the case-study hash with `history.replaceState`.

### Source metric constants

The visible page must include exactly these proof points with their contexts: `400+ accounts`, `12B VNĐ portfolio`, `7-10 thành viên`, `30% → 58% retention`, `70% → 30% churn rủi ro cao`, and `+120% upsell revenue (MRR 100M)`. The test suite treats the strings as release guardrails.

## Task 1: Create the static project foundation and source guardrails

**Files:**
- Create: `index.html`
- Create: `assets/css/styles.css`
- Create: `assets/js/main.js`
- Create: `assets/js/case-studies.js`
- Create: `tests/portfolio.test.mjs`
- Create: `README.md`

**Interfaces:**
- Consumes: the approved design spec and CV facts listed under Source metric constants.
- Produces: a dependency-free static-file layout that subsequent tasks can style and enhance without adding build tooling.

- [ ] **Step 1: Create the directory layout and failing source guardrail test.**

Create `tests/portfolio.test.mjs` with this initial test:

```js
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
    '70% → 30% churn',
    '+120% upsell revenue',
  ]) {
    assert.match(page, new RegExp(fact.replace(/[+()]/g, '\\$&')));
  }
});
```

- [ ] **Step 2: Run the test to verify the expected initial failure.**

Run:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/portfolio.test.mjs
```

Expected: failure because `index.html` has not been created.

- [ ] **Step 3: Create the minimal static document and files.**

Create `index.html` as valid HTML5 with `lang="vi"`, a responsive viewport meta tag, stylesheet reference, module-script reference, and temporary plain text that includes every guarded metric. Create the CSS and JavaScript files with only comments identifying their future responsibility. Create a `README.md` containing the exact test command from Step 2.

- [ ] **Step 4: Re-run the source guardrail test.**

Run the command from Step 2.

Expected: PASS with one passing test.

- [ ] **Step 5: Commit the foundation.**

```bash
git add index.html assets/css/styles.css assets/js/main.js assets/js/case-studies.js tests/portfolio.test.mjs README.md
git commit -m "chore: scaffold personal growth portfolio"
```

## Task 2: Implement semantic content, navigation, and no-JavaScript reading path

**Files:**
- Modify: `index.html`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: source metric strings from Task 1 and static anchors used by `main.js`.
- Produces: semantic section IDs `impact`, `operating-system`, `experience`, `case-studies`, and `contact`; these are the only navigation targets used by scripts and CSS.

- [ ] **Step 1: Add failing semantic and contact tests.**

Append this test to `tests/portfolio.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/portfolio.test.mjs
```

Expected: second test fails because the landmarks and actions are absent.

- [ ] **Step 3: Replace the temporary document with the semantic portfolio.**

Implement this exact semantic outline in `index.html`:

```html
<a class="skip-link" href="#main-content">Bỏ qua điều hướng</a>
<header class="site-header">...</header>
<main id="main-content">
  <section class="hero" aria-labelledby="hero-title">...</section>
  <section id="impact" aria-labelledby="impact-title">...</section>
  <section id="operating-system" aria-labelledby="operating-system-title">...</section>
  <section id="experience" aria-labelledby="experience-title">...</section>
  <section id="case-studies" aria-labelledby="case-studies-title">...</section>
</main>
<footer id="contact" aria-labelledby="contact-title">...</footer>
```

Populate the hero, proof strip, lifecycle, career timeline, leadership/tool/recognition content, and contact close with CV-sourced Vietnamese copy. Present `Customer Growth Leader` first and the three adjacent targets in the approved order. Add direct call, email, and LinkedIn actions; do not add a CV download link. Add `data-section-link` to navigation anchors and `data-case-study-id` to three `<button type="button">` demo cards. Each demo card must visibly include `Case study demo` and a short statement that verified materials will be added later.

- [ ] **Step 4: Verify semantic behavior and validate the HTML structure.**

Run the test command above, then use the browser or a standards-aware HTML inspection to confirm there is one H1, each section has an H2, every button has visible text, and the tab order starts at the skip link.

Expected: automated tests PASS; keyboard inspection shows no unlabeled control.

- [ ] **Step 5: Commit semantic content.**

```bash
git add index.html tests/portfolio.test.mjs
git commit -m "feat: add Vietnamese portfolio narrative"
```

## Task 3: Build the bright Personal Growth OS visual system and responsive layout

**Files:**
- Modify: `assets/css/styles.css`
- Modify: `tests/portfolio.test.mjs`
- Create: `assets/images/portrait-placeholder.svg`

**Interfaces:**
- Consumes: semantic class names and section IDs from Task 2.
- Produces: CSS tokens and layouts with no JavaScript layout dependency; `portrait-placeholder.svg` is referenced by the hero image.

- [ ] **Step 1: Add failing design-token and accessibility CSS tests.**

Append this test:

```js
const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');

test('styles provide the approved visual tokens and critical accessibility rules', () => {
  for (const color of ['#F6F7F9', '#FFFFFF', '#0B1F3A', '#536176', '#F0647C', '#C93D5B', '#2BA6C8', '#1E9B6A', '#DCE2EA', '#145DD7']) {
    assert.match(css, new RegExp(color));
  }
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
  assert.match(css, /min-height:\s*44px/);
});
```

- [ ] **Step 2: Run tests to verify the CSS test fails.**

Run the Node test command.

Expected: CSS token test fails because the initial stylesheet has no required rules.

- [ ] **Step 3: Implement `styles.css` as a tokenized component system.**

Define the approved tokens in `:root`, import Inter and Manrope with system fallback families, and apply the following non-negotiable rules:

```css
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 768px) {
  .hero-grid, .metrics-grid, .operating-grid, .case-study-grid { grid-template-columns: 1fr; }
}
```

Style the bright off-white canvas, glass-light hero halo, original lifecycle orbit, proof cards, vertical timeline, demo case cards, dialog, and contact close. Use `#F0647C` only for decorative coral gradients and non-text emphasis. Use `#C93D5B` with white text for the primary CTA. Use cyan for process relationships and green for positively labelled outcomes, with `#0B1F3A` text when either color becomes a background. Keep all body copy at least 16 px, metadata at least 13 px, and interactive controls at least 44 px high.

Create `assets/images/portrait-placeholder.svg` as an original abstract, non-identifying light-gradient silhouette. In `index.html`, render it as `<img ... alt="" aria-hidden="true">` until the user supplies a real portrait.

- [ ] **Step 4: Run tests and visually inspect four viewports.**

Run the Node test command. Start a static server from the project root with:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 4173
```

Inspect 375, 768, 1024, and 1440 px widths for overflow, clipped timeline text, contrast, and CTAs that remain visible.

Expected: tests PASS; all four viewports have no horizontal scrolling.

- [ ] **Step 5: Commit the visual system.**

```bash
git add assets/css/styles.css assets/images/portrait-placeholder.svg index.html tests/portfolio.test.mjs
git commit -m "feat: add bright personal growth visual system"
```

## Task 4: Add reusable demo-case data and an accessible detail interaction

**Files:**
- Modify: `assets/js/case-studies.js`
- Modify: `assets/js/main.js`
- Modify: `index.html`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: `caseStudies` record shape and `data-case-study-id` buttons from the Shared Content and Component Contracts section.
- Produces: `openCaseStudy(caseStudy)` and `closeCaseStudy()` exports; a native `<dialog id="case-study-dialog">` that works by keyboard, click, ESC, and direct hash URL.

- [ ] **Step 1: Add failing tests for data provenance and dialog hooks.**

Append these tests:

```js
const caseData = await readFile(new URL('../assets/js/case-studies.js', import.meta.url), 'utf8');
const script = await readFile(new URL('../assets/js/main.js', import.meta.url), 'utf8');

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
```

- [ ] **Step 2: Run tests to verify the expected failure.**

Run the Node test command.

Expected: the two new tests fail because the data records and dialog behavior are absent.

- [ ] **Step 3: Implement demo records and the dialog.**

Define the three records in `case-studies.js` using only approved CV metrics:

- `retention-recovery` with retention and high-risk churn outcomes.
- `expansion-motion` with `+120% upsell revenue` and `MRR 100M` context.
- `operational-scaling` with `400+ accounts`, `12B VNĐ portfolio`, and `7-10 thành viên` scope.

Create a native dialog in `index.html` with a close button (`aria-label="Đóng chi tiết case study"`), title slot, body slot, and evidence-status slot. In `main.js`, map card buttons to case records, fill all dialog slots through `textContent`, retain the triggering button, support ESC and close-button return focus, and parse `#case-study=<id>` on initial page load. Use `history.replaceState` rather than `pushState` so card inspection does not pollute browser history.

- [ ] **Step 4: Run tests and perform interaction checks.**

Run the Node test command. In the browser, activate every card by mouse and keyboard, confirm focus moves into the dialog and returns to its source, press ESC, and load a URL containing `#case-study=retention-recovery`.

Expected: tests PASS; all interactions render only approved demo wording and the direct hash opens the relevant case.

- [ ] **Step 5: Commit demo case interaction.**

```bash
git add assets/js/case-studies.js assets/js/main.js index.html tests/portfolio.test.mjs
git commit -m "feat: add accessible demo case studies"
```

## Task 5: Add progressive navigation and motion without making content dependent on JavaScript

**Files:**
- Modify: `assets/js/main.js`
- Modify: `assets/css/styles.css`
- Modify: `index.html`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: `data-section-link` navigation anchors, section IDs from Task 2, and `.reveal` targets added to static HTML.
- Produces: an `.is-active` class on the current anchor and an `.is-visible` class used only for optional visual enhancement.

- [ ] **Step 1: Add failing progressive-enhancement tests.**

Append this test:

```js
test('progressive enhancement honors reduced motion and active-section navigation', () => {
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(script, /is-active/);
  assert.match(script, /is-visible/);
  assert.match(page, /data-section-link/);
});
```

- [ ] **Step 2: Run tests to verify the new test fails.**

Run the Node test command.

Expected: the progressive-enhancement test fails because observers and classes are absent.

- [ ] **Step 3: Implement only non-essential motion and navigation state.**

Add `data-section-link` to each anchor and `.reveal` to selected cards/sections. In `main.js`, check reduced-motion before creating `IntersectionObserver` instances. When reduced motion is enabled, add `.is-visible` to every reveal target immediately. Otherwise, reveal an element at a threshold of `0.15` and update a matching anchor's `.is-active` state. CSS must display all `.reveal` content by default, then add a small opacity/12 px transform transition only within a `@media (prefers-reduced-motion: no-preference)` block.

- [ ] **Step 4: Run tests and verify no-JavaScript resilience.**

Run the Node test command. In a browser, disable JavaScript and refresh: every section and the static case-study summaries must remain visible. Re-enable JavaScript and verify nav active state changes while scrolling.

Expected: tests PASS; the page is complete without JavaScript and lightly enhanced with it.

- [ ] **Step 5: Commit progressive enhancement.**

```bash
git add assets/js/main.js assets/css/styles.css index.html tests/portfolio.test.mjs
git commit -m "feat: enhance portfolio navigation and motion"
```

## Task 6: Verify the local preview server and document the publishing handoff

**Files:**
- Create: `server.mjs`
- Create: `tests/server.test.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: root-level static site files completed in Tasks 1-5.
- Produces: `server.mjs`, verified `node server.mjs` local preview behavior, and a precise GitHub Pages handoff that does not require a repository decision during the local build.

- [ ] **Step 1: Add failing integration tests for the preview server.**

Create `tests/server.test.mjs`:

```js
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
```

- [ ] **Step 2: Run tests to verify the expected failure.**

Run:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/server.test.mjs
```

Expected: failure because `server.mjs` does not exist.

- [ ] **Step 3: Complete the preview-server contract and publishing handoff documentation.**

Create `server.mjs` using Node `http`, `fs`, and `path` only. It must serve `/` as `/index.html`, return `404` for unknown paths, return `403` for a resolved file outside the repository root, map `.html`, `.css`, `.js`, `.svg`, and `.png` to correct content types, listen on `process.env.PORT || 4173`, and write one readiness line to stdout after binding the port.

Use this implementation shape:

```js
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const filePath = resolve(root, relativePath);

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(body);
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : error instanceof URIError ? 400 : 500;
    response.writeHead(status).end(status === 404 ? 'Not found' : 'Request failed');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}`);
});
```

Update `README.md` with:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/portfolio.test.mjs
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node server.mjs
```

Document how to replace `assets/images/portrait-placeholder.svg`, update the `caseStudies` records only with approved evidence, and update the phone/email/LinkedIn values. Add a `GitHub deployment deferred` section stating that the site is GitHub Pages compatible but no repository, workflow, remote, push, or deployment is configured until Nhan supplies the GitHub username and repository name. State explicitly that the CV PDF is not a public asset and must not be copied into the site.

- [ ] **Step 4: Verify local server, deployment syntax, and the full test suite.**

Run:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/portfolio.test.mjs tests/server.test.mjs
```

Then start `server.mjs`, open `http://localhost:4173`, and verify the home page, CSS, JavaScript module, and SVG all return status 200. Request an encoded traversal path and verify status 403 or 404.

Expected: both test files PASS; local preview works; path traversal is not served; no remote repository is created or modified.

- [ ] **Step 5: Commit preview and deployment configuration.**

```bash
git add server.mjs tests/server.test.mjs README.md
git commit -m "test: verify local portfolio preview"
```

## Task 7: Run release verification and prepare the user review

**Files:**
- Modify only if an issue is found: `index.html`, `assets/css/styles.css`, `assets/js/case-studies.js`, `assets/js/main.js`, `assets/images/portrait-placeholder.svg`, `README.md`, `server.mjs`, `tests/portfolio.test.mjs`, or `tests/server.test.mjs`

**Interfaces:**
- Consumes: the completed static site and all preceding checks.
- Produces: evidence that the result meets the approved spec before it is presented for user review.

- [ ] **Step 1: Run source, interaction, and layout checks.**

Run:

```bash
/Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/portfolio.test.mjs tests/server.test.mjs
git diff --check
git status --short
```

In the browser, inspect widths 375, 768, 1024, and 1440 px; tab through all interactive controls; test skip navigation, every contact link, every case-study dialog, ESC close, direct case-study hash, reduced-motion mode, and no-JavaScript reading.

Expected: all tests pass; no whitespace errors; no horizontal overflow; contact and case-study controls are keyboard operable.

- [ ] **Step 2: Check the copy against the CV source.**

Compare every company, title, date, award, portfolio size, metric, and contact endpoint against `/Users/cellphones/Downloads/Cv CSL Bảng chuẩn.pdf`. Remove or correct any claim without an explicit source. Confirm every temporary case-study statement stays visibly labelled `Case study demo`, the phone link resolves to `+84967347781`, and the site contains no downloadable CV.

- [ ] **Step 3: Inspect accessibility and performance with browser tooling.**

Run a Lighthouse accessibility check against the local server and resolve any error involving contrast, heading order, missing names, touch target size, or focus visibility. Confirm image dimensions are reserved and no image is fetched until necessary below the fold.

- [ ] **Step 4: Commit only verified release fixes, if any.**

If a correction was required:

```bash
git add index.html assets/css/styles.css assets/js/case-studies.js assets/js/main.js assets/images/portrait-placeholder.svg README.md server.mjs tests/portfolio.test.mjs tests/server.test.mjs
git commit -m "fix: complete portfolio release checks"
```

If no correction was required, do not create an empty commit.

- [ ] **Step 5: Present the completed local site for user review before deployment.**

Open the locally served home page in the Codex browser and summarize the verified viewport, accessibility, and interaction checks. Ask Nhan to provide the business-casual portrait and any approved case-study artefacts before replacing the labelled demo content.

## Plan Self-Review

### Spec coverage

- Vietnamese-first positioning, target roles, direct contact, LinkedIn, and case-study exploration are implemented in Tasks 2 and 4.
- Bright Apple-inspired Personal Growth OS tokens, typography, spacing, original visual motif, light motion, responsiveness, and accessibility are implemented in Task 3 and reinforced in Task 5.
- Verified metrics and their contextual boundaries are protected in Task 1, rendered in Task 2, and rechecked in Task 7.
- The three case-study demos, replacement-safe data model, keyboard dialog, and URL states are implemented in Task 4.
- Local preview verification, GitHub Pages compatibility notes, and the deferred publishing handoff are implemented in Task 6.
- Cross-browser/reduced-motion/no-JavaScript/manual quality checks happen in Task 7.

### Consistency and scope check

The plan remains one portable static site. It intentionally excludes a CMS, analytics, backend contact form, external data source, tracking, customer-data ingestion, CV download, and GitHub deployment until repository details are supplied. `caseStudies`, `openCaseStudy`, `closeCaseStudy`, all section IDs, and the local server name are defined before their consuming tasks.
