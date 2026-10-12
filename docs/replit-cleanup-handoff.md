# Replit handoff: preserve the design, tighten the implementation

This change belongs in the NWBB test repository for review. It does not authorize or perform a live Replit deployment.

## Design contract

Keep the existing layout, section spacing, typography, backgrounds, photographs, phone graphics, reel placements, and visible copy. Tailwind remains configured. Distinct phone graphics can share a page; repeat use of the same editorial image on a page is prohibited. The intentional header/footer branding is exempt. Do not remove the homepage's four-step graphic or the digital page's two different phone graphics.

## Implementation

- Added `app/lib/metadata.ts` and applied route-specific canonical, Open Graph, and Twitter metadata to public pages. Shared social artwork remains available on generated jail/city routes, and Yellowstone retains its custom Open Graph image.
- Added correct intrinsic dimensions and missing image attributes, including all eleven gallery images and two community photos. Source files, crops, and placements are unchanged.
- Added `app/components/hero-reel.tsx` for shared reel playback. It honors reduced motion and exposes a keyboard-accessible play/pause control on interaction. Both reel containers now use valid figure/caption markup without changing their geometry.
- Changed the interactive county SVG's role to a labeled group. County buttons retain keyboard activation and pressed state. Facility radios now support arrow keys, Home/End, and a single tab entry point.
- Moved custody-dialog markup into a body portal, trapped focus, made the background inert, and restored focus on Escape, close-button, and backdrop closing. Backdrop mouse handling prevents native focus from overriding restoration.
- Removed the hand-maintained facility `pagePath` override. Internal links now derive from the jail registry.
- Made the existing “Facility details” and “inmate lookup” text in `/jails` cards link to the configured official resources, preserving the wording and layout.
- Removed unused CSS selector branches, the duplicated hero-reel base block, retired hub-map data, and unused type exports. Retained public assets, active phone artwork, Tailwind, and live dynamic selectors.
- Updated Next.js and its ESLint config to 16.3.8, ESLint to 9.39.5, and patched compatible transitive dependencies. The generated `next-env.d.ts` gains the root-params type import required by the newer framework.
- Added five rendered-page regression cases, five browser interaction cases, and browser checks in CI. Lint now fails on warnings.

Copy the complete change set, including new components/helper, tests, package manifest, lockfile, runner, and workflow. The framework packages currently remain in the repository's existing dev-dependency classification; production builds need those packages installed.

## Validation

Run with Node.js 22 and npm 11:

```bash
npm ci
npm run typecheck
npm run lint
NEXT_PUBLIC_SITE_URL=https://example.test NEXT_TELEMETRY_DISABLED=1 npm run build:production
npm test
npx playwright install chromium
npm run test:browser
```

If Chromium is already installed, use its path instead of downloading a browser:

```bash
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

Run build/test commands sequentially; each integration runner builds and starts its own temporary production server. Linux CI installs Chromium with its system dependencies.

Current-instance results: typecheck and lint passed; production build passed; all 29 rendered-page cases and all 5 browser interaction cases passed. Browser tests exercise all 56 county selections, dialog focus and all three closing paths, multi-facility radio navigation, reduced-motion playback controls, and desktop/mobile hero placement.

The stylesheet shrank from 100,265 to 80,868 bytes (about 19% less source CSS). Ten screenshot comparisons have zero detected changed pixels. The two jail-directory comparisons have only small underline differences where the existing sentence was split into actionable links: 108 of 5,232,960 desktop pixels and 216 of 2,333,370 mobile pixels at the comparison threshold. Page dimensions, headings, image placements, and section spacing match.

Full-page before/after screenshots cover `/`, `/about`, `/digital-bail-bonds`, `/service-areas`, `/jails`, and `/locations/billings-bail-bonds` at 1440px and 390px widths. Captures use loaded fonts/images, paused poster frames, disabled animations, and a dismissed timed contact prompt to compare stable layout. Evidence is saved outside the checkout in `/workspace/review-evidence/`. These comparisons do not establish identical video frames, hover controls, every possible viewport, or every route.

## Remaining items

- `npm audit` reports five high-severity package entries in the same unpatched development lint chain: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces@3.0.3`. The available braces release remains vulnerable according to the audit. No verification was disabled and no incompatible downgrade was applied. Recheck upstream patches before release; the audit is not clean.
- Regional `/service-areas` resource listings still choose an internal jail guide or a single official destination. Showing every configured official link alongside each regional item requires additional visible links. That change is deferred to preserve the current copy/layout. Official resources remain in the interactive county cards and jail guides; the `/jails` directory now exposes them too.
- Unreferenced public files are retained because this test repository is used to transfer work into a separate Replit implementation. Removing assets without checking that implementation could break its references.

For the live build, set `NEXT_PUBLIC_SITE_URL=https://nwbailbonds.com`, rebuild with `npm run build:production`, and repeat the route/contact checks before Replit republishes. Never publish a build using the test canonical origin.
