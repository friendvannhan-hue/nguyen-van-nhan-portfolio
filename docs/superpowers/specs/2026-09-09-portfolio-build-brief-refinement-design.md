# Nguyễn Văn Nhân Portfolio — Build Brief Refinement Design

## 1. Purpose and authority

This design implements the user-approved portfolio build brief dated 2026-09-09 and replaces the prior portfolio direction wherever they conflict. The site remains a Vietnamese-first, static portfolio, but its primary positioning becomes **Customer Growth & Business Operations Leader**.

Nguyễn Văn Nhân confirmed on 2026-09-09 that the brief's updated public metrics are approved and supersede the older CV PDF values:

- `500+` SME and Enterprise accounts.
- `18 tỷ VNĐ+` portfolio managed.
- `8–15` people in team scope.
- Retention `28% → 58%` in more than 12 months.
- `110% mục tiêu upsell`, with MRR upsell of `100 triệu VNĐ`.
- Credit usage `20% → 60%`.

The existing two-page CV remains a secondary source for non-conflicting career dates, companies, tools, education, and recognition. No private customer data, invented client name, synthetic testimonial, unsupported result, or internal screenshot may appear.

## 2. Audience and conversion goal

The page serves three audiences in one reading path:

1. HR and recruiters need role fit, scale, outcomes, and contact paths within 30 seconds.
2. Hiring managers need evidence of direct decisions, operating mechanisms, and leadership capability.
3. CEO/COO/CCO/Revenue leaders need confidence that Nhan can connect strategy, revenue, people, process, data, and AI.

Primary conversion: start a direct conversation by email or phone. Secondary conversion: inspect case studies and connect on LinkedIn.

## 3. Chosen approach

Use an incremental static refactor of the dependency-free HTML, CSS, and vanilla JavaScript implementation.

- Keep core content in committed HTML so it remains readable with JavaScript disabled.
- Add three canonical static case-study pages for reliable deep links, SEO, and browser back behavior.
- Retain JavaScript only for progressive enhancement: active navigation, subtle reveal motion, mobile affordances when helpful, and optional homepage case-study disclosure.
- Extend the zero-dependency preview server so directory-style case-study URLs resolve to their local `index.html` files.
- Avoid a client router, CMS, framework migration, analytics, contact backend, and runtime data fetching.

## 4. Information architecture

The homepage follows this outcome-first sequence:

1. Hero / positioning.
2. Leadership manifesto.
3. Business Impact.
4. Solutions.
5. Business Growth Operating System.
6. Strategy Execution Loop.
7. Case Study Library.
8. AI Operations Lab.
9. Leadership & Adaptive Execution.
10. Career Journey.
11. 90-day value plan.
12. Contact close.

Desktop navigation exposes: `Tác động`, `Giải pháp`, `Operating System`, `Case Study`, `AI Lab`, `Hành trình`, `Liên hệ`, plus the persistent CTA `Trao đổi cùng tôi`.

Mobile uses a native, labelled disclosure menu so navigation remains available without JavaScript. The contact CTA remains directly visible. Anchors receive scroll offset so the sticky header never obscures headings.

Canonical case-study routes:

- `/case-studies/retention-recovery/`
- `/case-studies/expansion-revenue/`
- `/case-studies/operational-transformation/`

## 5. Homepage content and components

### 5.1 Hero

Use a bright executive composition rather than the current dark-first command center.

- Eyebrow: `CUSTOMER GROWTH · BUSINESS OPERATIONS · AI-ENABLED EXECUTION`.
- H1: the approved long-form statement about turning strategy into execution, stable operations, and growth from existing customers.
- Supporting copy names Nguyễn Văn Nhân and describes nearly six years across SaaS, Martech, ERP, E-commerce, and finance.
- CTAs: `Xem cách tôi tạo ra kết quả`, `Trao đổi về bài toán tăng trưởng`, and `Kết nối LinkedIn`.
- Proof strip uses the six confirmed metrics with surrounding context.
- The portrait is extracted from the supplied CV for local review and placed in a replaceable, dimensioned asset slot. It is not considered approved for public deployment until Nhan completes final asset review.
- A restrained, original operating-system node diagram may accompany the portrait. It must read as an explanatory model, not live telemetry.

### 5.2 Manifesto

Create an editorial transition between identity and proof. Use the approved headline about needing a system, not merely another customer-care person, followed by the brief's explanation connecting Customer Success to adoption, renewal, revenue, and operating efficiency.

### 5.3 Business Impact

Render six metric cards in three columns by two rows on desktop and one column on mobile. Each card contains a metric, plain-language meaning, scope/timeframe, and evidence status where useful:

1. Retention `28% → 58%` in more than 12 months.
2. High-risk churn `70% → 30%`.
3. `110% mục tiêu upsell`, MRR `100 triệu VNĐ`.
4. Credit usage `20% → 60%`.
5. `500+ accounts · 18 tỷ VNĐ+` portfolio.
6. Team scope `8–15 nhân sự`.

The upsell card must never convert target attainment into a growth-rate claim.

### 5.4 Solutions

Create six consistent solution cards. Each card exposes four labelled fields: `Bài toán`, `Cách tiếp cận`, `Đầu ra`, `Bằng chứng`.

- Customer Retention System.
- Expansion Revenue Engine.
- Onboarding & Adoption.
- Business Operations & Governance.
- Cross-functional Execution.
- AI-enabled Operations.

The cards may use progressive disclosure on smaller screens, but all information stays accessible without hover or JavaScript. Business Operations & Governance remains qualitative until new measurements are approved. AI-enabled Operations carries an explicit status rather than implying production deployment.

### 5.5 Business Growth Operating System

Present the portfolio's central intellectual product as six connected layers:

1. Strategy.
2. Operating Model.
3. Execution System.
4. Intelligence.
5. Cross-functional Motions.
6. Business Outcomes.

Desktop uses a readable layered diagram with text labels and directional connectors. Mobile becomes a vertical sequence. Color supports hierarchy but never carries meaning without text.

### 5.6 Strategy Execution Loop

Show a six-step loop: Translate, Align, Execute, Review, Intervene, Learn. Each step includes one action sentence. The loop is visually circular on wide screens and a numbered vertical sequence on mobile. DOM order always follows the logical 1–6 sequence.

### 5.7 Case Study Library

Homepage cards link to canonical static pages and summarize three public cases:

- Retention Recovery.
- Expansion Revenue Engine.
- Operational Transformation.

Each card includes focus, permitted outcome, artefact preview, source/status label, and a descriptive link. Demo visuals are visibly labelled `DEMO DATA` or `DỮ LIỆU MINH HỌA`.

Each case-study page follows the same twelve-part template:

1. Executive summary.
2. Business context.
3. Problem and baseline.
4. Nhan's role and decision scope.
5. Root-cause diagnosis.
6. Chosen strategy.
7. Implementation steps.
8. Involved functions.
9. KPI/OKR and control cadence.
10. Quantitative and qualitative outcomes.
11. Created artefacts.
12. Lessons and transferability.

Operational Transformation contains qualitative outcomes only. Cross-functional Execution and AI Agent for Operations remain absent from public case-study navigation until a specific approved case exists.

The brief's Customer Success Operating System story is represented by the homepage Business Growth Operating System, Leadership, and 90-day sections in phase 1 rather than a fourth public case page. This keeps the phase-1 route set aligned with the brief's three suggested public slugs.

### 5.8 AI Operations Lab

Present five concept cards:

- Account Risk Radar.
- QBR Copilot.
- Voice of Customer Miner.
- Report & Decision Assistant.
- Conversation QA & Coaching.

Every card shows: input problem, non-sensitive data flow, AI responsibility, human checkpoint, output artefact, and status. Initial status is `Concept` unless Nhan later approves `Đã thử nghiệm` or `Đã vận hành`. No measured savings or productivity claim is shown without evidence.

### 5.9 Leadership, career, and 90-day value

Leadership & Adaptive Execution explains the ability to preserve business outcomes while changing scope, resources, KPI, or execution method. It includes the approved `8–15` scope, KPI/OKR cadence, workload allocation, coaching, incomplete-data judgment, and cross-functional coordination.

Career Journey is narrative, not a repeated CV. Use four concise phases: CNV CDP, 1Office, Haravan, and Shinhan Finance, with the brief's dates and capability progression.

The 90-day plan uses three equally weighted phases:

- `0–30 ngày · Diagnose`.
- `31–60 ngày · Build`.
- `61–90 ngày · Activate`.

It promises a disciplined diagnostic and pilot process, never a predetermined growth percentage.

### 5.10 Contact close

Use the approved contact headline and direct links:

- Phone: `+84 96 734 7781`.
- Email: `nhannv.working@gmail.com`.
- LinkedIn: `linkedin.com/in/nguyenvannhan`.

No contact form, CV download, analytics, or tracking is added.

## 6. Visual system

Direction: **B2B SaaS Executive · Bright · Trustworthy · Data-led · Human**.

- Canvas: `#F6F7F9`.
- Card: `#FFFFFF`.
- Heading/navy: `#0B1F3A`.
- Body: `#475569`.
- Trust blue: `#2563EB`.
- Growth green: `#1E9B6A` with a darker text variant where normal-size contrast requires it.
- CTA coral: `#C93D5B`.
- Border: `#DCE2EA`.
- Focus ring: `#145DD7`.

Manrope remains the heading face and Inter the body/UI face. Body text stays at least 16 px with 1.5 line height; metadata stays at least 13 px. The maximum content width is approximately 1200 px.

Large dark areas are removed as the default visual treatment. Navy may appear in compact framework or CTA bands, but most reading surfaces remain bright. Avoid heavy glassmorphism, fake counters, skill progress bars, parallax, autoplay, and generic AI-purple gradients.

## 7. Responsive and interaction behavior

- 1440/1024 px: wide hero, six-card impact grid, layered framework, circular strategy loop, and multi-column solutions/cases.
- 768 px: reduce to two-column cards where readable; framework connectors simplify; navigation switches before crowding occurs.
- 375 px: one-column content, vertical framework and loop, no horizontally scrolling navigation, no clipped proof labels, and persistent contact access.
- Interactive controls are at least 44×44 px with visible hover and focus feedback.
- Case cards do not depend on hover.
- Reduced-motion users see final states without transition.
- With JavaScript disabled, navigation, all homepage copy, all static case pages, and contact links remain usable.

## 8. SEO and assets

Homepage metadata:

- Title: `Nguyễn Văn Nhân | Customer Growth & Business Operations Leader`.
- Meta description: the approved description from the brief.
- Canonical path: `/`.
- Open Graph title, description, image, type, locale, and URL-ready fields.

Add an original `NVN` or `NHAN.` SVG favicon. Produce a 1200×630 Open Graph image using the approved positioning and portrait slot, without unverified metrics. Portrait, award images, company logos, testimonials, and internal artefacts remain subject to final publication approval.

All below-fold raster images are dimensioned and lazy-loaded. Demo artefacts prefer lightweight semantic HTML/CSS or original SVG rather than screenshots that imply internal source data.

## 9. Data boundaries and states

Content carries one of these states:

- `Verified`: approved public metric or career fact.
- `Qualitative`: approved narrative without unsupported measurement.
- `Demo data`: reconstructed visual or template using non-sensitive sample data.
- `Concept`: proposed AI workflow without deployment claim.

The status is rendered in text and is not conveyed by color alone. No component may convert a missing asset or metric into invented evidence.

## 10. Technical file boundaries

Expected implementation areas:

- `index.html`: new homepage architecture and metadata.
- `assets/css/styles.css`: bright visual system, layouts, mobile menu, diagrams, and accessible motion.
- `assets/js/main.js`: progressive enhancement and navigation state only.
- `assets/js/case-studies.js`: approved summary data if the homepage dialog remains.
- `case-studies/*/index.html`: three canonical static case pages.
- `assets/images/`: portrait slot, favicon, Open Graph image, and original demo visuals.
- `server.mjs`: safe directory-index support for local canonical routes.
- `tests/portfolio.test.mjs`, `tests/server.test.mjs`: brief contracts and routing regressions.

## 11. Verification and acceptance

Before completion:

- Verify every public metric against the confirmed brief and ensure older conflicting values are absent.
- Confirm the six Solutions, six OS layers, six Strategy Loop steps, five AI Lab concepts, three case-study routes, four career phases, and three 90-day phases.
- Verify `110% mục tiêu upsell` is never rewritten as growth.
- Confirm Operational Transformation contains no invented numeric improvement.
- Run automated portfolio and server tests.
- Test contact links, canonical routes, browser back behavior, mobile menu, keyboard order, focus return, reduced motion, and no-JavaScript reading.
- Inspect 375, 768, 1024, and 1440 px for overflow, overlap, clipped text, and hidden controls.
- Check one H1 per page, sequential headings, contrast, minimum type sizes, touch targets, image dimensions, alt text, metadata, and console output.

## 12. Explicitly deferred publication inputs

These do not block the local layout but remain non-public until final approval:

- Replacement high-resolution portrait if the CV extraction is insufficient.
- Company logos.
- Award images.
- Real anonymized internal artefacts.
- Named testimonials.
- Measured Operational Transformation improvements.
- Public CV download.
- A concrete public Cross-functional Execution case.
- A tested or production AI Agent workflow with measured results.
