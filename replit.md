# Northwest Bail Bonds Website

## Project purpose

This repository is the production source for the Northwest Bail Bonds marketing website in Billings, Montana. Preserve the established branding, visual design, photography, copy, responsive layout, and conversion-focused call and email actions unless the owner explicitly requests a change.

## Architecture

- Conventional Next.js 16 App Router application with React 19 and TypeScript
- npm with the committed `package-lock.json`
- Static assets in `public/`
- Shared business constants in `app/lib/site.ts`
- One Montana detention-resource data source in `app/data/montana-detention.ts`
- No database, authentication, Cloudflare Worker, Vite/Vinext adapter, or Vercel-specific runtime
- Contact form opens a `mailto:` draft; it does not submit or store data

Do not add a database, authentication, hosting adapter, or form backend unless the owner requests that as a separate feature.

## Commands

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm test
```

Production publishing uses:

```bash
npm ci && npm run build:production
npm run start
```

Use Node.js 22 LTS. Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin before a production build. No other environment variable or secret is required by the current application.

## Change rules

- Keep GitHub as the canonical source and commit only source files and required public assets.
- Do not commit `.env` files, `.next`, `node_modules`, caches, or generated platform output.
- Do not reintroduce Vinext, Vite, Cloudflare, Wrangler, Drizzle, D1, or OpenAI Sites scaffolding.
- Keep county map/search and regional detention links on the shared detention data source.
- Preserve the warning against sensitive information and never claim the email-draft form submitted a message.
- Do not replace or remove production images without checking all references and owner approval.
- Test desktop and mobile behavior after visible changes.
- Before handoff, run the full command set above and fix real errors rather than excluding application files.
