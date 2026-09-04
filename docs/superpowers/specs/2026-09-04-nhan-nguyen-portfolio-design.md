# Nhan Nguyen Bilingual Portfolio — Design Specification

## Purpose

Create a single-page, bilingual (English-first / Vietnamese support) HTML portfolio for Nguyen Van Nhan. It must position him for **Customer Success Leader** and **Sales Operations** roles by making measurable customer-growth outcomes and operating-system leadership immediately clear to a recruiter.

## Audience and success criteria

- Primary audience: hiring managers and recruiters for Customer Success leadership, Revenue Operations, and Sales Operations positions in SaaS, Martech, ERP, and e-commerce.
- A recruiter should be able to identify Nhan's title, scope, proof points, and contact paths in the first screen and in under 30 seconds.
- The page should communicate operational leadership, not merely account ownership: early-warning systems, renewal forecasting, QBR/account planning, dashboards, coaching, and Sales collaboration.
- Every factual claim must be traceable to the supplied CV or LinkedIn profile. No invented projects, employers, credentials, imagery, or metrics.

## Narrative

The central message is: **Nhan turns customer data, repeatable processes, and team execution into retention and expansion revenue.**

English is the primary reading path. Vietnamese appears immediately below or beside headings and key statements, serving as an accessible, respectful complement rather than duplicating full paragraphs. The writing is decisive and evidence-led: customer-growth outcomes first, methodology second, career chronology third.

## Information architecture

1. **Sticky navigation** — name/role at left; anchor links to Impact, Operating System, Experience, Recognition, and Contact.
2. **Hero** — “Customer Growth Leader” / “Lãnh đạo Tăng trưởng Khách hàng”; bilingual value proposition; quick identity line for SaaS, Martech, retention, renewal, and Ho Chi Minh City; buttons for LinkedIn and email.
3. **Impact strip** — four high-salience, sourced proof points: 400+ accounts, approximately 17B VND portfolio, retention 18% to 35%, and high-risk churn 70% to 35%.
4. **Operating system** — four concise cards: health scoring & early warning, renewal forecasting, QBR & account planning, KPI dashboards & team coaching. Each maps an operating practice to its customer/revenue outcome.
5. **Career impact** — reverse-chronological timeline covering CNV CDP, 1Office, Haravan, and Shinhan Finance. Each entry exposes role, dates, context, and two to three highest-value outcomes; the current CNV CDP leadership role receives emphasis.
6. **Leadership proof** — a focused section explaining team scope (7–10 people), playbooks, review cadence, cross-functional Sales execution, and Best CS Team 2025 recognition.
7. **Capabilities and recognition** — grouped skill areas, tools, awards, education.
8. **Contact CTA** — bilingual invitation to discuss retention, renewals, and customer-growth operations; email and LinkedIn; concise footer.

## Visual system (UI/UX Pro Max)

- Pattern: Hero + proof / feature sections + repeated contact CTA.
- Style: spacious professional minimalism, designed for an executive audience rather than a generic template.
- Palette: primary navy `#1E3A5F`, blue `#2563EB`, growth accent `#16A34A`, off-white background `#F8FAFC`, dark text `#0F172A`, muted text `#475569`, light border `#CBD5E1`. Accent is reserved for growth outcomes and primary actions.
- Type: Archivo for headlines and Space Grotesk for body/interface content. Use system fallbacks if web fonts fail.
- Layout: centered max-width grid; generous spacing; metric cards and capability cards; editorial two-column hero that collapses to one column. The page must work cleanly at 375, 768, 1024, and 1440 px widths.
- Imagery: no stock headshots or decorative illustrations are required. A monogram / typographic identity keeps focus on outcomes and avoids unauthorised assets.
- Motion: small opacity-and-vertical-offset reveals (300–400 ms) and 150–300 ms hover feedback only. Respect `prefers-reduced-motion` by showing final states without animation.

## Interaction, accessibility, and resilience

- Semantic HTML headings, landmarks, and lists; visible keyboard focus; skip link; descriptive labels for external links.
- Minimum normal-text contrast of 4.5:1; buttons stay legible in all states.
- Touch targets at least 44 px; navigation is keyboard reachable; no essential detail relies on hover.
- Anchor navigation scrolls to content without JavaScript dependence. Contact actions use standard `mailto:` and LinkedIn links.
- The document remains fully readable if external fonts or JavaScript are unavailable.

## Data and factual content

- Source of truth: `output/cv-nguyen-van-nhan-agari-key-account.json`, supplemented by the user-provided LinkedIn profile for title and professional summary wording.
- Use `nhannv.working@gmail.com` as the portfolio contact address because it is the CV contact value. Do not use the separate LinkedIn About address unless the user specifically asks to switch it.
- Use only these key metrics in the hero / proof strip: 400+ accounts; approximately 17B VND portfolio; retention from 18% to 35% in over six months; high-risk churn from 70% to 35%.

## Delivery and verification

- Deliver a self-contained `index.html` with a separate `styles.css` and optional lightweight `script.js`, unless the existing project dictates another pattern.
- Verify direct rendering in a browser at desktop and mobile widths, all anchors and contact URLs, keyboard focus visibility, reduced motion behavior, and the absence of horizontal scrolling.
- Review copy and metrics against the source JSON before delivery.

## Deliberate exclusions

- No CMS, analytics, contact form, backend, tracking pixels, dependency framework, or fabricated case studies.
- No job applications, external messages, or LinkedIn profile edits.
