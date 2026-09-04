# Nhan Nguyen Bilingual Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, accessible bilingual static portfolio that positions Nguyen Van Nhan for Customer Success Leader and Sales Operations roles.

**Architecture:** A self-contained static site uses semantic `index.html` for source-backed bilingual content, `styles.css` for the responsive executive design system, and `script.js` only for progressive enhancement (active navigation and motion). The page works completely without JavaScript; browser-based checks validate the final document at desktop and mobile widths.

**Tech Stack:** HTML5, CSS3 custom properties/media queries, vanilla JavaScript, Google Fonts with system fallbacks; no dependencies, build system, analytics, or backend.

**Spec:** `docs/superpowers/specs/2026-09-04-nhan-nguyen-portfolio-design.md`

## Global Constraints

- Use only factual content from `output/cv-nguyen-van-nhan-agari-key-account.json` and the approved LinkedIn-derived positioning in the spec; do not fabricate outcomes, projects, credentials, or assets.
- English is primary; Vietnamese immediately supports headings and key statements.
- Use the specified colors: navy `#1E3A5F`, blue `#2563EB`, green `#16A34A`, background `#F8FAFC`, foreground `#0F172A`, muted foreground `#475569`, and border `#CBD5E1`.
- Use Archivo for display type and Space Grotesk for text/interface with safe system fallbacks.
- Meet normal-text contrast of at least 4.5:1, expose visible keyboard focus, provide a skip link, and respect `prefers-reduced-motion`.
- Validate at 375 px, 768 px, 1024 px, and 1440 px with no horizontal scrolling.
- Contact links are `mailto:nhannv.working@gmail.com` and `https://www.linkedin.com/in/nguyenvannhan/`.

---

## File structure

- `index.html` — semantic page, bilingual source content, navigation, external contact links, and inline SVG icons.
- `styles.css` — design tokens, responsive layout, component styling, focus states, and reduced-motion behavior.
- `script.js` — optional active-section navigation state and viewport-reveal enhancement; it must not hide content before JavaScript runs.
- `tests/portfolio.test.mjs` — Node built-in-test static assertions that protect source content, accessibility primitives, required links, and responsive CSS guardrails.

### Task 1: Create the semantic bilingual document and source-backed content

**Files:**

- Create: `index.html`
- Create: `tests/portfolio.test.mjs`

**Interfaces:**

- Consumes: metrics and career data in `output/cv-nguyen-van-nhan-agari-key-account.json`.
- Produces: landmarks and anchor IDs `impact`, `operating-system`, `experience`, `recognition`, and `contact`; styles from Task 2 and behavior from Task 3 attach only through those stable selectors.

- [ ] **Step 1: Write failing static-content tests**

Create `tests/portfolio.test.mjs` using Node's built-in test runner:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('portfolio contains the required landmarks and recruiter proof points', () => {
  for (const id of ['impact', 'operating-system', 'experience', 'recognition', 'contact']) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  for (const fact of ['400+', '17B', '18% → 35%', '70% → 35%']) {
    assert.match(page, new RegExp(fact.replace(/[+%→]/g, '\\$&')));
  }
});

test('portfolio exposes primary contact paths and keyboard skip navigation', () => {
  assert.match(page, /href="#main-content"/);
  assert.match(page, /mailto:nhannv\.working@gmail\.com/);
  assert.match(page, /https:\/\/www\.linkedin\.com\/in\/nguyenvannhan\//);
});
```

- [ ] **Step 2: Run the static test to verify it fails**

Run: `node --test tests/portfolio.test.mjs`

Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Implement `index.html`**

Create a valid HTML5 document with `lang="en"`, viewport metadata, stylesheet and font links, then implement this semantic outline:

```html
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">…anchor navigation…</header>
<main id="main-content">
  <section class="hero" aria-labelledby="hero-title">…</section>
  <section id="impact" aria-labelledby="impact-title">…four metrics…</section>
  <section id="operating-system" aria-labelledby="operating-title">…four operating cards…</section>
  <section id="experience" aria-labelledby="experience-title">…career timeline…</section>
  <section id="recognition" aria-labelledby="recognition-title">…leadership, skills, awards, education…</section>
  <section id="contact" aria-labelledby="contact-title">…mailto and LinkedIn CTAs…</section>
</main>
<script src="script.js" defer></script>
```

Use `lang="en"` and `lang="vi"` on the respective text spans. Include only CV facts: the current CNV CDP role, 7–10 team members, 400+ accounts, approximately 17B VND portfolio, retention/churn improvements, 12% upsell / 150M MRR, named employers, awards, education, and listed tools.

- [ ] **Step 4: Run static test to verify the document passes**

Run: `node --test tests/portfolio.test.mjs`

Expected: PASS with two passing tests.

- [ ] **Step 5: Commit the semantic content**

```bash
git add index.html tests/portfolio.test.mjs
git commit -m "feat: add bilingual portfolio content"
```

### Task 2: Implement the executive visual system and responsive behavior

**Files:**

- Create: `styles.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**

- Consumes: semantic class names and section IDs from Task 1.
- Produces: CSS custom-property design tokens and responsive layouts consumed directly by `index.html`; no JavaScript layout dependency.

- [ ] **Step 1: Add failing CSS guardrail tests**

Append this test to `tests/portfolio.test.mjs`:

```js
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('styles include specified tokens, responsive layout, focus, and reduced-motion support', () => {
  for (const value of ['#1E3A5F', '#2563EB', '#16A34A', '#F8FAFC', '#0F172A']) {
    assert.match(css, new RegExp(value));
  }
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:/);
});
```

- [ ] **Step 2: Run the CSS guardrail test to verify it fails**

Run: `node --test tests/portfolio.test.mjs`

Expected: FAIL because `styles.css` does not exist.

- [ ] **Step 3: Implement `styles.css`**

Define the specified palette and spacing/radius/shadow/typography tokens in `:root`. Style the header, hero, proof cards, operating cards, timeline, recognition panels, and CTA with a restrained navy-and-green visual hierarchy. Implement:

```css
:focus-visible { outline: 3px solid var(--color-secondary); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
@media (max-width: 768px) { /* collapse grids and keep 44px link/button targets */ }
```

Keep body font size at least 16 px, enforce legible line height, provide an obvious skip-link reveal on focus, and ensure long bilingual labels wrap rather than overflow.

- [ ] **Step 4: Run static tests to verify visual guardrails pass**

Run: `node --test tests/portfolio.test.mjs`

Expected: PASS with three passing tests.

- [ ] **Step 5: Commit the visual system**

```bash
git add styles.css tests/portfolio.test.mjs
git commit -m "feat: style executive portfolio layout"
```

### Task 3: Add progressive enhancement and validate the complete experience

**Files:**

- Create: `script.js`
- Modify: `tests/portfolio.test.mjs`
- Modify: `index.html`

**Interfaces:**

- Consumes: `[data-section-link]` navigation links and `.reveal` section/card classes created in `index.html`.
- Produces: non-essential `.is-active` navigation and `.is-visible` reveal classes. The default CSS must keep all content visible.

- [ ] **Step 1: Add a failing progressive-enhancement test**

Append this test:

```js
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('enhancement supports active navigation and avoids motion for reduced-motion users', () => {
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
  assert.match(script, /is-active/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/portfolio.test.mjs`

Expected: FAIL because `script.js` does not exist.

- [ ] **Step 3: Implement `script.js` and mark enhancement hooks**

Add `data-section-link` attributes to the nav anchors and `.reveal` to the intended cards/sections. Use `IntersectionObserver` to add `.is-active` to the matching nav link and `.is-visible` to reveal targets. First check reduced motion and, when enabled, immediately add `.is-visible` to all reveal targets without creating reveal animation behavior.

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  // Observe sections and reveal targets; content remains visible in the no-JS CSS baseline.
}
```

- [ ] **Step 4: Run the full static test suite**

Run: `node --test tests/portfolio.test.mjs`

Expected: PASS with four passing tests.

- [ ] **Step 5: Perform browser verification**

Open `index.html` in a browser. At 375, 768, 1024, and 1440 px, verify no horizontal overflow; inspect the hero, impact metrics, cards, timeline, and contact CTA; tab from the skip link through both CTAs to confirm visible focus; activate each anchor; enable reduced motion and verify content stays visible; verify LinkedIn and mailto URLs exactly match the global constraints.

- [ ] **Step 6: Commit enhancement and verification-ready page**

```bash
git add index.html script.js tests/portfolio.test.mjs
git commit -m "feat: add accessible portfolio interactions"
```

## Plan self-review

- Spec coverage: Tasks 1–3 collectively cover bilingual content, every requested section, exact source metrics, selected UI/UX Pro Max palette/type/layout/motion requirements, links, semantic accessibility, mobile breakpoints, and browser verification.
- No placeholders: the plan has been reviewed for incomplete markers and generic implementation directives; none remain.
- Interface consistency: Task 1 defines all stable section IDs; Task 2 consumes their markup classes; Task 3 consumes only explicit `data-section-link` and `.reveal` hooks, and produces non-essential `.is-active` / `.is-visible` classes.
