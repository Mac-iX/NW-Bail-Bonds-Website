# Northwest Bail Bonds Website

Production website for Northwest Bail Bonds in Billings, Montana.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Static Montana county, detention, jail-guide, and city-guide data
- No database or authentication layer
- Browser email-draft workflow for non-urgent inquiries

## Primary routes

| Route | Purpose |
| --- | --- |
| `/` | Primary conversion landing page |
| `/jails` | Montana jail-specific bail bond guide hub |
| `/jails/[slug]` | Curated detention-facility guides |
| `/locations` | Priority Montana city landing-page hub |
| `/locations/[slug]` | City commercial-intent pages |
| `/service-areas` | All 56 Montana counties and detention resources |
| `/how-to-bail-someone-out` | Bail process guide |
| `/digital-bail-bonds` | Remote intake and e-sign workflow |
| `/faq` | Bail bond FAQ |
| `/about` | Company story |
| `/resources` | Licensing, legal resources, and official Montana sources |
| `/contact` | Direct contact paths |
| `/privacy` | Privacy notice |

## Development

Requirements:

- Node.js 22 LTS
- npm 11

Commands:

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm test
```

Production deployments must set:

```text
NEXT_PUBLIC_SITE_URL=https://nwbailbonds.com
```

The value controls canonical URLs, Open Graph URLs, structured data, `sitemap.xml`, and `robots.txt`.

## Content architecture

The SEO system is intentionally selective rather than mass-generated.

- `app/data/montana-detention.ts` is the statewide custody-resource directory.
- `app/data/seo-pages.ts` contains the curated jail and city pages that deserve standalone URLs.
- Jail pages target facility-specific custody intent.
- City pages target commercial city intent.
- `/service-areas` remains the statewide hub for counties that do not yet justify a dedicated page.
- External custody links should point to official government, sheriff, court, or facility sources.
- Do not add fabricated offices, fabricated reviews, unsupported release-time claims, or self-serving review markup.

## Contact workflow

The website's inquiry forms prepare a draft in the visitor's own email application. They do not store or submit sensitive information to a website database. The direct phone line remains the primary urgent contact path.

## Release checks

Before merging:

1. Run type checking and linting.
2. Run a production build with a valid `NEXT_PUBLIC_SITE_URL`.
3. Run integration tests.
4. Verify new pages are linked internally and included in the sitemap.
5. Verify every facility fact against the official source before publishing.
