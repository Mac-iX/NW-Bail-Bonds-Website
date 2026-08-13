# Northwest Bail Bonds Website

A mobile-first marketing website for Northwest Bail Bonds in Billings, Montana. It is a conventional Next.js App Router application with no database, authentication layer, or hosting adapter.

## Application architecture

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS through PostCSS, plus the existing site stylesheet
- Static assets in `public/`
- Static Montana county data in `app/data/`
- Browser `mailto:` contact workflow; no form API or stored submissions
- Standard Node.js lifecycle that can run on Replit or another Node host

There is no required Vercel, Cloudflare, Vite, Vinext, Worker, D1, Drizzle, or OpenAI Sites runtime.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Primary 24/7 conversion landing page |
| `/service-areas` | Montana map, county search, detention links, and regional coverage |
| `/about` | Company and founder story |
| `/resources` | FAQs, disclosures, and official Montana sources |
| `/contact` | Direct call, email, Facebook, and email-draft workflow |
| `/privacy` | Website privacy notice |
| `/licensing` | Redirects to `/resources#licensing` |
| `/how-bail-works` | Permanent redirect to `/resources#faq` |
| `/sitemap.xml` | Generated XML sitemap |
| `/robots.txt` | Generated crawler rules and sitemap URL |

## Requirements and commands

- Node.js 22.13 or newer (Node 22 LTS is recommended and recorded in `.nvmrc`)
- npm 11

```bash
npm ci
npm run dev
```

The normal project lifecycle is:

| Task | Command |
| --- | --- |
| Development server | `npm run dev` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Portable production build | `npm run build` |
| Deployment build with URL validation | `npm run build:production` |
| Production server | `npm run start` |
| Build and integration tests | `npm test` |

`npm run start` listens on `0.0.0.0` and respects the `PORT` environment variable.

## Production URL configuration

Production deployments require one public environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

Use the exact HTTPS origin with no trailing slash or path. It controls canonical links, Open Graph URLs, JSON-LD, `sitemap.xml`, and `robots.txt`.

`npm run build` remains usable for local verification when the variable is missing; it warns and uses `http://localhost:3000`. `npm run build:production` fails unless a valid HTTPS origin is configured, so use that command for deployment builds. Copy `.env.example` to `.env.local` for local production-URL testing. Never commit `.env.local` or secrets.

## Contact workflow

The help-request form in `app/components/help-request-form.tsx` assembles a draft and opens the visitor's own email application with a `mailto:` link. The visitor must review and send the email; the website does not claim or record a successful submission. The form and privacy page warn visitors not to include sensitive financial or identity information. Call and email links remain available throughout the site.

## Common business settings

Phone, email, social links, company name, FAQs, county names, and coverage hubs live in `app/lib/site.ts`. Page-specific content remains in the corresponding file under `app/`.

## Replit handoff

Import this GitHub repository into the client's Replit account, add `NEXT_PUBLIC_SITE_URL`, and use the ordinary npm commands above. The included `.replit` command exposes the development server correctly for Replit Preview.

See [docs/replit-handoff.md](docs/replit-handoff.md) for import, preview, publishing, domain, and owner-verification instructions. See [docs/launch-content-checklist.md](docs/launch-content-checklist.md) for business facts and assets that still require owner approval before launch.

## SEO approach

The site provides consistent service-area information, answer-first FAQs, official Montana references, semantic page structure, canonical metadata, and structured data. See [docs/seo-content-plan.md](docs/seo-content-plan.md) for the page-to-intent map and future content roadmap.
