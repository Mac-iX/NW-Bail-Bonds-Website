# Replit Owner Handoff

## Import and first run

1. Sign in to the client's Replit account.
2. Import the GitHub repository into a new Replit app.
3. Confirm Replit uses Node.js 22 or later.
4. Run `npm install` if the import does not install packages automatically.
5. Run `npm run dev -- --host 0.0.0.0`.
6. Open the Replit web preview and test the home page, navigation, county search, call links, and text workflow.

The included `.replit` file sets the development command. No database or API key is required for the current build.

## Final domain setting

Add an environment variable in Replit:

```text
NEXT_PUBLIC_SITE_URL=https://www.final-domain.com
```

Use the exact public `https://` origin with no trailing slash. Rebuild after changing it. This value controls canonical URLs, structured-data URLs, the sitemap, and robots rules.

## Client-editable content

Common changes live in these files:

- `app/lib/site.ts`: phone, Facebook URL, base URL fallback, counties, coverage hubs, FAQs
- `app/page.tsx`: homepage copy and sections
- `app/globals.css`: colors, spacing, typography, and responsive layout
- `app/components/help-request-form.tsx`: prepared text message fields
- `app/licensing/page.tsx`: verified license and disclosure content
- `public/`: logo and hero assets

## Safe editing workflow

1. Make one focused change.
2. Preview it on desktop and a narrow mobile viewport.
3. Run `npm run build`.
4. Commit the change to GitHub with a plain description.
5. Publish only after the build passes.

Avoid pasting license numbers, legal claims, pricing, testimonials, or community affiliations from an AI tool without checking them against client records and official sources.

## Contact workflow options

The current form prepares a text on the visitor's own device. This avoids database maintenance and lets the visitor review the message before sending.

If the client later wants stored form submissions, add that as a separate scoped feature with:

- explicit consent language;
- spam protection;
- a documented retention policy;
- updated privacy notice;
- access limited to client-controlled accounts;
- secure handling rules for sensitive legal-emergency information.

## Training agenda

- Edit basic copy and FAQ content
- Replace team photos and verify image alt text
- Update phone, hours, and official links
- Preview and roll back a change
- Run the production build
- Review Search Console without chasing keyword stuffing
- Use AI tools to draft, then fact-check and approve content
- Recognize information that should never be pasted into a public AI prompt or ordinary text message
