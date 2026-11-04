# Northwest Command Center — QCC

A standalone, local-first operations dashboard for managing the **Northwest Bail Bonds** digital presence. Built for Quality Creative Consulting. No external services are connected and no production website files were changed.

## Start
Open [index.html](./index.html) from a browser by downloading it from GitHub. On desktop, the most dependable option is to save the file locally and use Chrome or Edge. For persistent origin-based local storage, an optional local web server can serve the folder (`python -m http.server 8765`, then http://localhost:8765).

**Do not deploy this dashboard to nwbailbonds.com or publish it on a publicly accessible URL.** The code can be public, but it has no authentication. In particular, never put private client, defendant, payment, case, collateral, or credential information into the tool.

## Included v1
- Overview: work backlog and operational priorities.
- Website: Replit, GitHub, public site, GSC, GA4 and web diagnostics shortcuts; reviewable verification checklist.
- Google Business Profile: profile-review checklist; monthly metrics and trends logged manually.
- Social: Facebook/Instagram links, review-first content calendar, approval states.
- Intelligence: source URL, evidence quality, impact/urgency, next action and decision.
- Queue: tasks, owners, due dates, statuses and notes.
- Gemini: a client-safe, source-aware Markdown working brief for operations, SEO, social and market analysis; download or copy.
- Local JSON backups, restore and a CSV metrics export.

**Data is manually entered.** The dashboard does *not* monitor live Google or social activity, access accounts, deploy Replit, modify GitHub or publish content. No metrics are prefilled.

## Free Gmail / Gemini workflow

1. Use the client's existing Google account that owns/manages Northwest's verified Google Business Profile, with the owner's permission.
2. If the account manages **exactly one verified GBP**, open https://gemini.google.com/ and ask `@Google Business Profile show my performance metrics for the past month`. Follow Google’s connection instructions. Google requires a personal Google Account and Keep Activity on for this direct feature. This may not work for an agency account that manages multiple verified profiles.
3. If eligible, create a business notebook and confirm Northwest's website URL. Gemini can analyze performance/keywords and review GBP feedback, subject to Google's limits.
4. Record only aggregate results (not private cases) in Command Center.
5. Choose a Gemini mission, generate a Markdown brief, and upload/paste it into Gemini. Review its findings.
6. Bring approved tasks and editorial decisions back to Command Center; download a secure JSON backup.

Google instructions: https://support.google.com/gemini/answer/17142585?hl=en

## Responsible controls

The client should retain primary ownership of its Google account and GBP. Use delegated permissions where available; avoid sharing credentials. Avoid creating multiple Google listings for unstaffed cities. Verify licensing, bond disclosures, personnel, case-related claims and all public reviews/posts before publishing. Consult legal counsel as appropriate. Never use AI-generated fictitious results, ratings or testimonials.

**Privacy:** The dashboard uses browser localStorage, which is not encrypted or synchronized. A local browser reset, different device, or a different file origin may not show the same records. Back up after use to an access-controlled folder.

## v2: only after access is verified
- Read-only Search Console / GA4 ingestion via scoped OAuth.
- GBP direct Gemini for eligible account; otherwise the GBP API requires separate authorization and access.
- Optional Meta read-only analytics, scheduled review tasks, event log and permissions.
- Private, authenticated backend with role separation, source timestamps and auditable approvals.
