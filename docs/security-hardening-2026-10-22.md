# Security patch handoff

Next.js and eslint-config-next updated to 16.4.1; sharp 0.35.5 retained. Typecheck, lint, production build, 29 rendered-page tests, and 5 headless Edge browser regressions pass. The audit still reports five high entries in one unpatched development lint chain (braces/micromatch/fast-glob/Next ESLint). No forced incompatible downgrade. This is the test/transfer repo; no live Replit publish.

Changes are on a review branch. Hermes/Mac owns merge, live deployment, and post-deploy checks. No source templates, stylesheets, images, text, or user-flow logic were changed. Browser coverage is regression coverage, not a pixel-by-pixel comparison. For Northwest, transfer the patch into the existing live Replit source and preserve its canonical production URL.
