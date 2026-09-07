# Nhan Nguyen Personal Growth OS Portfolio Design

## 1. Purpose and decision

Build a Vietnamese-first, single-page portfolio that presents Nguyen Van Nhan as a Customer Success Leader and Customer Growth Lead with credible adjacent fit for Account Management and Sales Operations roles.

The portfolio must make the viewer understand, in the first 30 seconds, that Nhan turns post-sale operations into measurable retention, expansion revenue, and scalable team execution. It will use the clarity, evidence hierarchy, and product-minded story flow of CNV Work, interpreted through a bright, spacious, Apple-inspired visual system. It must not reuse CNV Work brand assets or attempt to imitate its site.

## 2. Audience and desired actions

Primary audience:

- Hiring managers and recruiters at SaaS, Martech, Retail, and FMCG companies.
- Business leaders evaluating Customer Success, Customer Growth, Account Management, and Sales Operations leadership.

Primary actions:

1. Contact Nhan directly by email.
2. Open his LinkedIn profile.
3. Explore the case-study area, initially populated with clearly labelled demo cases that Nhan will replace or enrich with verified materials.

Success criteria:

- A recruiter can identify Nhan's target role, scale, and strongest proof points without scrolling.
- The site reads as a leadership portfolio rather than a visually reformatted CV.
- Metrics, case-study claims, and company information are only shown when supplied in the current CV or later approved by Nhan.
- The static site is clean on 375, 768, 1024, and 1440 px screens and remains usable with keyboard navigation, reduced motion, or JavaScript disabled.

## 3. Positioning and narrative

### Core proposition

**Toi xay Customer Success thanh he thong tang truong co the do luong.**

The public Vietnamese copy will use proper Vietnamese diacritics. This ASCII version is retained only as a search-friendly design reference.

### Supporting message

From onboarding and customer health to QBR, renewal forecasting, account planning, and team coaching, Nhan turns customer data into durable revenue outcomes.

### Evidence hierarchy

The story must lead with outcomes, then explain the operating methods that created them, then establish career depth. The most prominent verified figures are:

- 400+ SME and Enterprise accounts managed in the current CNV CDP leadership scope.
- Approximately 12B VND current portfolio.
- Team scope of 7-10 Customer Success members.
- Retention improvement from 30% to 58% in more than eight months.
- High-risk churn reduced from 70% to 30%.
- Upsell revenue growth of 120% with monthly recurring revenue of 100M.

The design must preserve surrounding conditions for every number. A metric cannot become a universal claim without its time frame, segment, or portfolio context.

## 4. Information architecture and content model

### 4.1 Sticky navigation

- Personal wordmark: `NHAN. / CUSTOMER GROWTH`.
- Anchor links: `Tác động`, `Hệ điều hành CS`, `Hành trình`, `Case study`, `Liên hệ`.
- Persistent primary CTA: `Kết nối LinkedIn`.
- At small widths, collapse navigation into an accessible menu or a compact horizontal anchor strip. Do not hide the contact CTA.

### 4.2 Hero: the first 30 seconds

- Eyebrow: `CUSTOMER GROWTH LEADER · HCMC, VIETNAM`.
- H1: `Biến Customer Success thành động cơ tăng trưởng.`
- Two-line supporting copy: leadership focus across SaaS, Martech, Retail, and FMCG; retention, expansion revenue, and scalable operations.
- Proof strip: `400+ accounts`, `12B VNĐ portfolio`, `7-10 team`, `30% → 58% retention`.
- CTAs: solid coral `Liên hệ trực tiếp`; outlined `Kết nối LinkedIn`; tertiary text link `Xem case study`.
- Portrait area: use a neutral, softly framed business-casual placeholder during the demo stage. Its component must accept a later supplied photo without layout changes.
- Background visual: a restrained `growth orbit` diagram linking customer lifecycle nodes. This replaces the dark CNV-style orb with a bright, original personal motif.

### 4.3 Impact dashboard

Present four verified metrics in an airy 2 by 2 desktop grid and one-column mobile sequence. Every card includes a metric, plain-language outcome, and bounded context:

- `30% → 58%` retention in more than eight months.
- `70% → 30%` churn for high-risk accounts.
- `+120%` upsell revenue, MRR 100M.
- `400+` accounts / `12B VNĐ` portfolio / `7-10` team scope.

Use numbers as the visual hero; never render them as a fake live dashboard or imply real-time data.

### 4.4 Customer Growth Operating System

A horizontally readable lifecycle on desktop, vertical sequence on mobile:

`Onboarding` -> `Activation` -> `Health score` -> `QBR` -> `Renewal forecast` -> `Expansion`.

Each stage has one sentence explaining the leader's intervention and a compact evidence chip. A following four-card detail grid covers:

- Early-warning and customer segmentation.
- Renewal forecasting and account planning.
- QBR as an expansion engine.
- KPI cadence, coaching, and cross-functional operating rhythm.

### 4.5 Career trajectory

Use a vertical timeline that rewards scanning rather than repeating the PDF CV. Each role includes company, sector, period, role, scope, and 2-3 selected outcomes.

- CNV CDP: Customer Growth Leader and prior Senior Customer Success & Renewal Specialist.
- 1Office: Account Management Specialist.
- Haravan: Solution Consultant Specialist.
- Shinhan Finance: Solution Consultant Specialist.

The timeline should make the progression visible: personal portfolio execution -> multi-industry consulting -> implementation and sales collaboration -> customer-growth leadership.

### 4.6 Case-study library: demo now, evidence later

Initial cards are deliberately labelled `CASE STUDY DEMO - awaiting source materials` and show the intended template rather than fabricated proprietary detail.

1. **Retention recovery**: segmentation and early-warning workflow.
2. **Expansion motion**: QBR, account planning, and Product partnership.
3. **Operational scaling**: team KPI dashboard, weekly review, coaching.

Clicking a card opens a detail panel with: context, challenge, Nhan's role, intervention, metrics, artefacts, and learning. Until evidence is supplied, the panel must only use existing CV metrics and generic labels; it must not invent company names, customer identities, screenshots, or quotes.

### 4.7 Leadership, tools, and recognition

- Leadership proof: team scope, playbook development, coaching, KPI management, and cross-functional work.
- Tool ecosystem: CRM and CS platforms, collaboration tools, reporting tools, AI-assisted workflows, and design/documentation tools from the CV.
- Recognition: Best CS Team 2025, Top Contributor 2024, Top Performer Q3/2023, Top Revenue Q2/2022, Employee of the Year 2021, and Top Revenue Jan-Mar 2021.
- Education: HCMUNRE, Information Technology.

### 4.8 Contact close

Heading: `Cung xay mot he thong tang truong ben vung.`

Use a concise invitation to discuss customer retention, expansion, customer operations, or leadership opportunities. Provide direct email, LinkedIn, and a CV download link only after the final PDF path is approved. Repeat the three primary outcomes in a compact footer proof strip.

## 5. Visual direction: bright Personal Growth OS

### Design principle

Apple contributes calm hierarchy, white space, material restraint, and a premium sense of precision. CNV Work contributes outcome-first storytelling, data modules, and product language. The combined result is bright, light, and personal - not a dark SaaS clone.

### Semantic tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Page background | `--surface-canvas` | `#F6F7F9` | Full page, slightly cool off-white |
| Raised surface | `--surface-card` | `#FFFFFF` | Cards and case-study panels |
| Ink | `--text-primary` | `#0B1F3A` | Headings and core text |
| Muted ink | `--text-secondary` | `#536176` | Body/supporting labels |
| Primary signal | `--accent-coral` | `#F0647C` | CTA, key metrics, active state |
| Secondary signal | `--accent-cyan` | `#2BA6C8` | Process diagram and secondary data only |
| Success signal | `--accent-growth` | `#1E9B6A` | Positive growth and verified outcomes |
| Border | `--border-subtle` | `#DCE2EA` | Separation, never strong decoration |
| Focus ring | `--focus-ring` | `#145DD7` | Visible keyboard focus |

Coral, cyan, and green are never the only signal for a status; text labels and directional numbers carry the meaning too.

### Type, grid, and surfaces

- Use `Inter` for UI/body and `Manrope` for headings, with system fallbacks. Both retain a clean Vietnamese reading texture and SaaS credibility.
- Base body size: 16 px with at least 1.5 line-height. Small metadata must remain at least 13 px.
- Desktop content width: 1200 px maximum. Use 12 columns with 24 px gaps; collapse intentionally rather than squeezing at tablet widths.
- Use generous space scale: 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Cards use 18-24 px radius, thin borders, and soft shadow only when necessary to establish hierarchy.
- Decorative grid lines and gradient halos must remain low-contrast, never competing with text.

### Motion

- Reveal content with opacity plus 12 px vertical movement over 300-400 ms.
- Use 150-200 ms hover and focus feedback for controls.
- Do not use autoplay video, parallax, fake counters, or motion that changes layout.
- With `prefers-reduced-motion: reduce`, render every component fully visible and static.

## 6. Interaction, accessibility, and responsive behavior

- All navigation, case-study controls, and contact actions must be keyboard reachable with visible `:focus-visible` treatment.
- Use semantic landmarks, one H1, sequential headings, labelled buttons, descriptive external-link text, and meaningful image alt text. The demo portrait is marked decorative until a real image is supplied with its intended alt text.
- Normal text contrast must meet 4.5:1. The pale page and light cards are deliberate; low-contrast gray text is prohibited.
- Touch targets must be at least 44 by 44 px with at least 8 px separation.
- Case-study detail is a progressively enhanced accessible dialog or inline disclosure: ESC closes the dialog, focus returns to the trigger, and all content is available without hover.
- The default no-JavaScript state displays all content. JavaScript only enhances active navigation, reveal timing, and case-study disclosure.
- At 375 px, navigation, hero, proof cards, lifecycle, timeline, and CTAs become one-column. No section may require horizontal scrolling.

## 7. Data governance and demo content

- The current CV is the factual source of truth. Copy will use the supplied direct email and LinkedIn URL, subject to final confirmation during implementation.
- Public company names and listed metrics are permitted by Nhan.
- Demo artefacts must be visibly marked as demo/placeholder and have an isolated data model so later screenshots, documents, or client-safe materials can replace them without altering section structure.
- Do not include stock customer logos, synthetic testimonials, fabricated workflow screenshots, anonymous customer quotes, or inferred revenue claims.

## 8. Technical scope and quality gates

### Scope

- Static, GitHub-deployable website.
- Vietnamese-first content.
- One scrolling home page plus deep-linkable case-study states; no authentication, CMS, analytics, contact form backend, or data collection.
- Asset slots for future portrait and case-study evidence.

### Quality gates

- Check content against the source CV before release.
- Test links, anchors, focus states, dialog behavior, reduced motion, and no-JavaScript readability.
- Inspect desktop and mobile rendering at 375, 768, 1024, and 1440 px. No clipped text, horizontal overflow, or unlabelled interactive icon.
- Verify the page has no console errors and reaches a strong Lighthouse accessibility baseline before deployment.

## 9. Deferred decisions

- Final business-casual portrait.
- Actual case-study assets and approved narrative details.
- GitHub repository name and deployment URL.
- Final CV download file.

These are intentionally modular additions, not blockers for an impressive first demo.
