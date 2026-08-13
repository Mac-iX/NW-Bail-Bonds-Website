# Northwest Bail Bonds Website

A fast, mobile-first website for Northwest Bail Bonds in Billings, Montana. The site is designed around three customer needs: immediate human response, plain-language terms, and trustworthy statewide coverage.

## Current experience

- Conversion-focused homepage with call and email actions
- Interactive Montana coverage overview and searchable list of all 56 counties
- About, resources, contact, licensing/disclosures, and privacy pages
- Organization and FAQ structured data
- Per-page metadata, canonical URLs, sitemap, and robots rules
- Email help-request form on every primary page; no site database required
- Responsive dark charcoal, silver, and Montana-sunset visual system

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Primary 24/7 conversion landing page |
| `/service-areas` | Montana map, county search, and regional coverage |
| `/about` | Customer-service positioning and trust principles |
| `/resources` | FAQs, internal guides, and official Montana sources |
| `/contact` | Direct call, email, Facebook, and inquiry workflow |
| `/licensing` | Verification guidance and service disclosures |
| `/privacy` | Website privacy notice |

## Local development

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Build verification:

```bash
npm run build
```

## Replit handoff

Import this repository into the client's Replit account, set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain, and run the included development command. The project intentionally has no database, authentication, or complex backend.

See [docs/replit-handoff.md](docs/replit-handoff.md) for the complete owner handoff and [docs/launch-content-checklist.md](docs/launch-content-checklist.md) for the verified business assets still required before public launch.

## Important configuration

- Primary phone and brand constants live in `app/lib/site.ts`.
- The canonical site URL uses `NEXT_PUBLIC_SITE_URL` and currently falls back to the private prototype URL.
- The email request form lives in `app/components/help-request-form.tsx` and is reused across the primary pages.
- Do not publish license numbers, legal affiliations, pricing claims, payment plans, testimonials, or team biographies until the client verifies them.

## SEO approach

The site uses natural, intent-led language for Montana bail bond searches instead of keyword stuffing. It provides clear entity facts, answer-first FAQs, official Montana references, semantic page structure, and consistent service-area information that can be understood by traditional search and AI answer systems.

See [docs/seo-content-plan.md](docs/seo-content-plan.md) for the page-to-intent map and future content roadmap.
