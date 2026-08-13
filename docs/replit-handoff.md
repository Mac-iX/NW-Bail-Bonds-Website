# Replit Owner Handoff

## Runtime and repository

This is a conventional Next.js App Router website. GitHub is the canonical source and version history. Replit can import and run the repository without Cloudflare, Vercel, Vinext, Vite, a database, or a platform adapter.

Required runtime:

- Node.js 22.13 or newer; use Node 22 LTS
- npm 11, with the committed `package-lock.json`

## Import and first preview

1. Sign in to the client's Replit account and choose **Import from GitHub**.
2. Connect GitHub, select `Mac-iX/NW-Bail-Bonds-Website`, and import the intended branch.
3. Confirm the Replit workspace is using Node 22. The repository includes `.nvmrc`, and `package.json` declares the minimum version.
4. Run `npm ci` if Replit has not already installed dependencies from the lockfile.
5. Add `NEXT_PUBLIC_SITE_URL` in Replit Secrets as described below.
6. Select **Run**. The committed `.replit` file runs `npm run dev -- --hostname 0.0.0.0` for Preview.
7. Check the home page, navigation, county search, call links, email links, and email-draft form at desktop and mobile widths.

No database, API key, authentication secret, or third-party service credential is required by the current website.

## Commands

| Purpose | Command |
| --- | --- |
| Install exactly from lockfile | `npm ci` |
| Development server | `npm run dev` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Local/CI production build | `npm run build` |
| Deployment build | `npm run build:production` |
| Production server | `npm run start` |
| Build and integration tests | `npm test` |

The development command receives Replit's required `0.0.0.0` hostname through `.replit`. The production start script also listens on `0.0.0.0` and uses Replit's `PORT` value.

## Production URL and domain

Add this environment variable in the workspace Secrets tool and separately in the deployment's Publishing settings:

```text
NEXT_PUBLIC_SITE_URL=https://www.final-domain.com
```

Use the exact public HTTPS origin with no trailing slash, path, query, or hash. Do not use the development `replit.dev` preview URL. Choose the final `replit.app` or custom domain first, set this value, then rebuild and publish. The value controls:

- canonical tags;
- Open Graph URLs;
- organization and page JSON-LD;
- sitemap URLs; and
- the sitemap link in `robots.txt`.

The ordinary `npm run build` warns and uses `http://localhost:3000` when this variable is absent so a clean checkout can still be verified. `npm run build:production` deliberately fails when it is missing, invalid, or not HTTPS.

## Replit publishing settings

In **Publishing**, verify these commands before launch:

- Build command: `npm ci && npm run build:production`
- Run command: `npm run start`

Expose only the Next.js application port. The site uses port 3000 by default and the `PORT` environment variable when Replit supplies another value. Replit production secrets are configured separately from workspace secrets, so confirm `NEXT_PUBLIC_SITE_URL` appears in the Publishing settings before building.

## Business settings and editable content

- `app/lib/site.ts`: company name, phone, email, Facebook and official links, county names, coverage hubs, and FAQs
- `app/page.tsx`: home-page sections and organization structured data
- `app/components/help-request-form.tsx`: email-draft fields and sensitive-information warning
- `app/components/montana-coverage.tsx`: county inquiry email workflow
- `app/resources/page.tsx`: licensing/disclosure section and official resources
- `app/globals.css`: established colors, spacing, typography, and responsive layout
- `public/`: logos, hero art, regional landmarks, and company photography

## Contact form behavior

The form does not submit to a website server or database. It creates a `mailto:` draft in the visitor's configured email application. The visitor must review the message and choose **Send**. A browser or device without a configured email application may not open the draft; the visible phone and email links are the fallback.

Do not send a real message while testing. Confirm only that:

- the email application or handler opens;
- the recipient is `northwestbailbond@gmail.com`;
- the draft contains the entered fields;
- the page never states that a message was submitted; and
- the warning against Social Security numbers and financial account details remains visible.

## Safe change and release workflow

1. Create a focused branch from the current GitHub `main`.
2. Make and preview the change.
3. Run `npm ci`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `npm test`.
4. Review desktop and mobile output and the generated SEO endpoints.
5. Commit with a plain description and push to GitHub.
6. Merge only after review, then import or pull the approved GitHub revision into Replit.
7. Publish with the production URL configured and verify the live custom domain.

## Owner verification required before launch

The owner still needs to confirm:

- final domain and DNS ownership;
- legal business name, mailing/business address, and any required disclosures;
- current Montana producer license status and any license number that will be displayed;
- phone, email, hours, Facebook page, and county/facility links;
- pricing, fees, collateral, refund, payment-plan, and release-timing statements;
- permission to publish each photo, logo, testimonial, affiliation, and community claim; and
- the final privacy notice and intended email-retention practices.

Track these items in [launch-content-checklist.md](launch-content-checklist.md). Do not publish unverified legal, licensing, pricing, testimonial, or affiliation claims.
