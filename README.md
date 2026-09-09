# Nguyễn Văn Nhân — Customer Growth Portfolio

Dependency-free static portfolio for a Customer Growth & Business Operations Leader. The homepage is the narrative hub and three directory-style pages provide canonical case-study deep links.

## Local preview

```bash
rtk node --test tests/*.test.mjs
rtk node server.mjs
```

Open `http://127.0.0.1:4173/`. Canonical case routes:

- `/case-studies/retention-recovery/`
- `/case-studies/expansion-revenue/`
- `/case-studies/operational-transformation/`

## Approved public facts

The user-approved brief dated 2026-09-09 overrides older CV values when they conflict:

- `500+` SME and Enterprise accounts
- `18 tỷ VNĐ+` portfolio managed
- `8–15` people in team scope
- Retention `28% → 58%` in more than 12 months
- `110% mục tiêu upsell`, with MRR upsell `100 triệu VNĐ`
- Credit usage `20% → 60%`

Never convert `110% mục tiêu upsell` into a growth-rate claim such as `+110%` or `tăng trưởng upsell 110%`.

The supplied CV remains a secondary source for non-conflicting company dates, tools, education, and recognition. The CV itself is private and must not be copied into the public site.

## Evidence states

- `Verified`: user-approved public metric or career fact.
- `Qualitative`: approved narrative without a numeric improvement claim.
- `Demo data`: reconstructed, non-sensitive artefact or template.
- `Concept`: proposed AI workflow without a deployment claim.

Remove a `Demo data` or `Concept` label only after Nguyễn Văn Nhân approves the underlying evidence and publication state.

## Case-study maintenance

Each page must retain the shared twelve-part narrative: executive summary, business context, problem and baseline, role and decision scope, diagnosis, strategy, implementation, functions, KPI/OKR controls, results, artefacts, and lessons/transferability.

Operational Transformation is qualitative-only until an approved measurement is supplied. Cross-functional Execution and AI Agent cases remain outside public navigation until a specific case is approved.

## Asset regeneration

The local portrait and Open Graph image are generated deterministically from the supplied CV:

```bash
rtk /Users/cellphones/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/build-portfolio-assets.py --pdf "/Users/cellphones/Downloads/Cv CSL Bảng chuẩn.pdf" --output-dir assets/images
```

The generated portrait must receive a final publication review before merge or deployment. The Open Graph image is 1200×630 and intentionally contains no performance metrics.

## Deployment

The site is compatible with static hosting. No repository remote, analytics, form backend, CV download, or deployment workflow is configured by this project.
