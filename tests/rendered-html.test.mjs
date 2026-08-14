import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const testBaseUrl = process.env.TEST_BASE_URL;
if (!testBaseUrl) throw new Error("TEST_BASE_URL is required. Run this suite through npm test.");

async function request(pathname, options = {}) {
  return fetch(`${testBaseUrl}${pathname}`, {
    redirect: "manual",
    ...options,
  });
}

async function render(pathname) {
  const response = await request(pathname, { headers: { accept: "text/html" } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("uses the configured public URL for canonical and Open Graph metadata", async () => {
  const html = await render("/");
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.test"\/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/example\.test"\/>/);
  assert.match(html, /https:\/\/example\.test\/northwest-logo-transparent\.png/);
  assert.doesNotMatch(html, /chatgpt\.site|codex-preview/);
});

test("renders the approved homepage lead, concise help form, and a visible Home navigation link", async () => {
  const html = await render("/");
  assert.match(html, /A bail bond company built around customer service/);
  assert.match(html, /Northwest believes urgent service can still be personal\./);
  assert.match(html, /<a[^>]+href="\/"[^>]*>Home<\/a>/);
  assert.match(html, /We&#x27;re here to help/);
  assert.match(html, /Ask Northwest for help/);
  assert.doesNotMatch(html, /form opens an email/i);
  assert.doesNotMatch(html, /Here&#x27;s what happens when you call/);
  assert.doesNotMatch(html, /These are the questions that matter/);
  assert.doesNotMatch(html, /24\/7<\/strong><span>Available/);
});

test("gives supporting pages distinct, literal headings", async () => {
  const expectations = new Map([
    ["/about", "About Northwest Bail Bonds"],
    ["/service-areas", "Serving all 56 Montana counties"],
    ["/resources", "Montana bail bond resources"],
    ["/contact", "Contact Northwest Bail Bonds"],
  ]);
  for (const [pathname, heading] of expectations) {
    assert.match(await render(pathname), new RegExp(`<h1>${heading.replaceAll(".", "\\.")}</h1>`));
  }
});

test("serves every public route and metadata endpoint", async () => {
  for (const pathname of ["/", "/service-areas", "/about", "/resources", "/contact", "/privacy"]) {
    assert.equal((await request(pathname)).status, 200, pathname);
  }

  for (const pathname of ["/sitemap.xml", "/robots.txt"]) {
    const response = await request(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), /https:\/\/example\.test/);
  }
});

test("renders all 56 real Montana county selections", async () => {
  const html = await render("/service-areas");
  assert.equal((html.match(/aria-label="Select [^"]+ County"/g) ?? []).length, 56);
  assert.match(html, /aria-label="Select Yellowstone County"[^>]+aria-pressed="true"/);
});

test("defines a non-empty jail or sheriff resource for all 56 counties", async () => {
  const siteSource = await readFile(new URL("../app/lib/site.ts", import.meta.url), "utf8");
  const directorySource = await readFile(
    new URL("../app/data/montana-detention.ts", import.meta.url),
    "utf8",
  );
  const countyBlock = siteSource.match(/export const COUNTIES = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  const counties = [...countyBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]).sort();
  const resourceCounties = [...directorySource.matchAll(/^  (?:"([^"]+)"|([A-Za-z]+)): \[$/gm)]
    .map((match) => match[1] || match[2])
    .sort();

  assert.equal(counties.length, 56);
  assert.deepEqual(resourceCounties, counties);
  assert.match(directorySource, /satisfies Record<CountyName, NonEmptyFacilities>/);
});

test("renders the county jail directory and private email intake entry point", async () => {
  const html = await render("/service-areas");
  assert.match(html, /Jail and detention resources for Yellowstone County/);
  assert.match(html, /Yellowstone County Detention Facility/);
  assert.match(html, /Search Current Inmates/);
  assert.match(html, /Detention &amp; Sheriff Information/);
  assert.match(
    html,
    /href="https:\/\/www\.yellowstonecountymt\.gov\/Sheriff\/Detention\/dcsearch\.asp" target="_blank"/,
  );
  assert.match(html, /Get help with a [\s\S]{0,40}Yellowstone[\s\S]{0,40}County bail bond/);
  assert.match(html, /Contact Joel now/);
  assert.match(html, /Facility assignments and rosters can change/);
  assert.doesNotMatch(html, /Person(?:&apos;|')s full legal name/);
});

test("renders the urgent call and email prompt across the site", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/contact"]) {
    const html = await render(pathname);
    assert.match(html, /Need a bail bondsman right now\?/);
    assert.match(html, /href="tel:\+14066011225"/);
    assert.match(html, /href="mailto:northwestbailbond@gmail\.com/);
    assert.doesNotMatch(html, /href="sms:/);
  }
});

test("publishes Northwest's story on Home and Joel Graf's full story on About", async () => {
  const home = await render("/");
  const about = await render("/about");
  assert.match(home, /Our Story/);
  assert.match(home, /Built in Billings, grown across Montana/);
  assert.match(home, /We started Northwest Bail Bonds/);
  assert.doesNotMatch(home, /Joel Graf&#x27;s story began/);
  assert.match(home, /href="\/about#joel-story"/);
  assert.match(home, /Meet Joel and read the founder story/);
  assert.match(home, /northwest-bail-bonds-support-at-detention-facility\.jpeg/);
  assert.match(about, /id="joel-story"/);
  assert.match(about, /God has more for you/);
  assert.match(about, /joel-graf-praying-with-man\.jpeg/);
  assert.match(about, /But his mission\? Eternal\./);
});

test("replaces repetitive About copy with concrete work and community commitments", async () => {
  const html = await render("/about");
  assert.match(html, /A bond gets someone out—what happens next matters, too/);
  assert.match(html, /rides home from jail and transportation to court/);
  assert.match(html, /supports youth programs and puts resources back/);
  assert.match(html, /police K-9 units and orphanages in Kenya/);
  assert.doesNotMatch(html, /Customer service is how the work gets done/);
  assert.doesNotMatch(html, /Four promises we can stand behind/);
  assert.doesNotMatch(html, /Credentials and real people belong in the open/);
});

test("uses only the new layered transition artwork across visible pages", async () => {
  const routes = ["/", "/about", "/contact", "/resources", "/service-areas"];
  for (const route of routes) {
    const html = await render(route);
    assert.doesNotMatch(html, /scene-(?:billings|helena|missoula|prairie)\.svg/);
  }
  assert.match(await render("/"), /scene-detention-stencil\.png/);
  assert.match(await render("/about"), /scene-city-stencil\.png/);
  assert.match(await render("/service-areas"), /scene-river-stencil\.png/);
  assert.match(await render("/resources"), /scene-courthouse-stencil\.png/);
});

test("renders all six Montana regional assets and purposeful Home placements", async () => {
  const serviceAreas = await render("/service-areas");
  const regionalAssets = [
    "northwest-bail-bonds-billings-rimrocks.png",
    "northwest-bail-bonds-butte-mining-headframe.png",
    "northwest-bail-bonds-helena-montana-state-capitol.png",
    "northwest-bail-bonds-glacier-wild-goose-island.png",
    "northwest-bail-bonds-makoshika-badlands.png",
    "northwest-bail-bonds-fort-peck-dam.png",
  ];
  for (const asset of regionalAssets) assert.match(serviceAreas, new RegExp(asset.replaceAll(".", "\\.")));
  assert.equal((serviceAreas.match(/class="region-landmark"/g) ?? []).length, 6);
  assert.doesNotMatch(serviceAreas, /class="region-landmark-copy"><span>0[1-6]<\/span>/);
  assert.match(serviceAreas, /title="Billings &amp; South Central Montana Service Area"/);
  assert.match(serviceAreas, /alt="Fort Peck Dam and reservoir in northeastern Montana/);

  const home = await render("/");
  assert.match(home, /northwest-bail-bonds-glacier-wild-goose-island\.png/);
  assert.match(home, /northwest-bail-bonds-support-at-detention-facility\.jpeg/);
  assert.doesNotMatch(home, /northwest-bail-bonds-butte-mining-headframe\.png/);
});

test("places real Northwest photography by narrative purpose with descriptive metadata", async () => {
  const home = await render("/");
  const about = await render("/about");
  const resources = await render("/resources");
  const contact = await render("/contact");

  assert.match(home, /title="A human moment during Northwest Bail Bonds work"/);
  assert.match(home, /A quiet moment of support/);

  for (const asset of [
    "northwest-bail-bonds-field-agent-paperwork.jpeg",
    "yellowstone-county-fugitive-recovery-badge.jpeg",
    "joel-graf-community-healthcare-visit.jpeg",
    "northwest-bail-bonds-fugitive-recovery-team.jpeg",
    "joel-graf-praying-with-man.jpeg",
  ]) assert.match(about, new RegExp(asset.replaceAll(".", "\\.")));
  assert.match(about, /holding a man&#x27;s hands in prayer outdoors at night/);

  assert.match(resources, /city-of-billings-montana-courtroom\.jpeg/);
  assert.match(resources, /title="City of Billings courtroom"/);
  assert.match(contact, /joel-graf-my-1059-radio-studio\.jpeg/);
  assert.match(contact, /MY 105\.9 Classic Hits/);
});

test("removes the How Bail Works page and redirects its old address", async () => {
  const response = await request("/how-bail-works", { headers: { accept: "text/html" } });
  assert.equal(response.status, 308);
  assert.match(response.headers.get("location") ?? "", /\/resources#faq$/);
});

test("redirects the licensing shortcut to the verified disclosure section", async () => {
  const response = await request("/licensing", { headers: { accept: "text/html" } });
  assert.equal(response.status, 307);
  assert.match(response.headers.get("location") ?? "", /\/resources#licensing$/);
});

test("keeps the inquiry form on every primary page and removes stranded guide links", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/resources", "/contact"]) {
    const html = await render(pathname);
    assert.match(html, /Ask Northwest for help/);
    assert.doesNotMatch(html, /href="\/how-bail-works"/);
  }

  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.doesNotMatch(sitemap, /how-bail-works/);
});

test("renders source-backed Montana facts without unsourced crime claims", async () => {
  const home = await render("/");
  const resources = await render("/resources");
  assert.doesNotMatch(home, /Montana facts worth knowing/);
  assert.match(resources, /Montana facts worth knowing/);
  assert.match(resources, /MCA 33-26-109/);
  assert.match(resources, /courts\.mt\.gov\/cao\/pretrial/);
  assert.match(resources, /Decides release conditions/);
  assert.doesNotMatch(resources, /crime rate/i);
});

test("uses sentence case for generic bail bond terminology", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/resources", "/contact"]) {
    const html = await render(pathname);
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(visibleText, /\bBail Bond company\b|\bCommon Bail Bond questions\b|\bNeed a Bail Bondsman\b|\bMontana Bail Bonds ·/);
  }
});

test("removes terminal periods from short page and section headings", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/resources", "/contact", "/privacy"]) {
    const html = await render(pathname);
    const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((match) =>
      match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/&(?:#x27|apos);/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim(),
    );
    for (const heading of headings) assert.doesNotMatch(heading, /\.$/, `${pathname}: ${heading}`);
  }
});

test("surfaces one detention data source in the map and all regional listings", async () => {
  const html = await render("/service-areas");
  const source = await readFile(new URL("../app/service-areas/page.tsx", import.meta.url), "utf8");

  assert.equal((html.match(/class="region-resource-list"/g) ?? []).length, 6);
  assert.equal((html.match(/class="region-resource-county"/g) ?? []).length, 56);
  assert.match(html, /Wibaux County[\s\S]*?Call Northwest to confirm/);
  assert.match(source, /getCountyDetention\(county\)/);
  assert.doesNotMatch(source, /\.gov\b|mt\.gov/);
  assert.doesNotMatch(html, /Directory reviewed|reviewed August/i);
});

test("renders the focused About, Resources, and Contact conversion blocks", async () => {
  const about = await render("/about");
  const resources = await render("/resources");
  const contact = await render("/contact");

  assert.match(about, /class="joel-story-cta"/);
  assert.match(about, /Joel and his team answer 24\/7/);
  assert.doesNotMatch(about, /class="joel-story-path"/);

  assert.match(resources, /class="resource-contact-cta"/);
  assert.match(resources, /Need clarity\? Northwest Bail Bonds is one call away/);
  assert.match(resources, /Ask Northwest for help/);

  assert.match(contact, /class="contact-closing-section"/);
  assert.match(contact, /Choose the next useful step/);
  assert.match(contact, /County and jail resources/);
  assert.doesNotMatch(contact, /class="social-contact-section"/);
});
