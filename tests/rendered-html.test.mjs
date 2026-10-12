import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { imageSize } from "image-size";

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

async function publicPages() {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert.ok(paths.length >= 30, "The checks must include the generated jail and city guides.");
  return paths;
}

function documentMarkup(html) {
  return html.replace(/<script[\s\S]*?<\/script>/g, "");
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

test("uses the configured public URL for canonical and Open Graph metadata", async () => {
  const html = await render("/");
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.test"\/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/example\.test"\/>/);
  assert.match(html, /https:\/\/example\.test\/northwest-logo-transparent\.png/);
  assert.doesNotMatch(html, /chatgpt\\.site/);
});

test("renders the approved homepage lead, concise help form, and a visible Home navigation link", async () => {
  const html = await render("/");
  assert.match(html, /Montana bail bonds: we can help you bail out your loved one/);
  assert.match(html, /Call Northwest and we confirm custody/);
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
    ["/resources", "Montana Bail Bond Resources"],
    ["/contact", "Contact Northwest Bail Bonds"],
    ["/jails", "Jail-specific bail bond guides"],
    ["/locations", "Bail bond help by city"],
    ["/how-to-bail-someone-out", "How to bail someone out of jail in Montana"],
    ["/digital-bail-bonds", "Digital bail bonds without unnecessary driving"],
    ["/faq", "Bail bond FAQ"],
  ]);
  for (const [pathname, heading] of expectations) {
    assert.match(await render(pathname), new RegExp(`<h1>${heading.replaceAll(".", "\\.")}</h1>`));
  }
});

test("serves every public route and metadata endpoint", async () => {
  for (const pathname of [
    "/",
    "/service-areas",
    "/jails",
    "/jails/yellowstone-county-detention-facility",
    "/jails/cascade-county-detention-center",
    "/locations",
    "/locations/billings-bail-bonds",
    "/how-to-bail-someone-out",
    "/digital-bail-bonds",
    "/faq",
    "/about",
    "/resources",
    "/contact",
    "/privacy",
  ]) {
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
  assert.match(await render("/"), /scene-detention-stencil\.webp/);
  assert.match(await render("/about"), /scene-city-stencil\.webp/);
  assert.match(await render("/service-areas"), /scene-river-stencil\.webp/);
  assert.match(await render("/resources"), /scene-courthouse-stencil\.webp/);
});

test("renders all six Montana regional assets and purposeful Home placements", async () => {
  const serviceAreas = await render("/service-areas");
  const regionalAssets = [
    "northwest-bail-bonds-billings-rimrocks.webp",
    "northwest-bail-bonds-butte-mining-headframe.webp",
    "northwest-bail-bonds-helena-montana-state-capitol.webp",
    "northwest-bail-bonds-glacier-wild-goose-island.webp",
    "northwest-bail-bonds-makoshika-badlands.webp",
    "northwest-bail-bonds-fort-peck-dam.webp",
  ];
  for (const asset of regionalAssets) assert.match(serviceAreas, new RegExp(asset.replaceAll(".", "\\.")));
  assert.equal((serviceAreas.match(/class="region-landmark"/g) ?? []).length, 6);
  assert.doesNotMatch(serviceAreas, /class="region-landmark-copy"><span>0[1-6]<\/span>/);
  assert.match(serviceAreas, /title="Billings &amp; South Central Montana Service Area"/);
  assert.match(serviceAreas, /alt="Fort Peck Dam and reservoir in northeastern Montana/);

  const home = await render("/");
  assert.match(home, /northwest-bail-bonds-glacier-wild-goose-island\.webp/);
  assert.match(home, /northwest-bail-bonds-support-at-detention-facility\.jpeg/);
  assert.doesNotMatch(home, /northwest-bail-bonds-butte-mining-headframe\.webp/);
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
  assert.match(about, /Northwest Bail Bonds fugitive recovery field team in Montana/);
  assert.match(about, /Joel Graf sharing a moment of prayer and support/);

  assert.match(resources, /city-of-billings-montana-courtroom\.jpeg/);
  assert.match(resources, /title="City of Billings courtroom"/);
  assert.match(contact, /joel-graf-my-1059-radio-studio\.jpeg/);
  assert.match(contact, /MY 105\.9 Classic Hits/);
});

test("redirects the legacy How Bail Works address to the current guide", async () => {
  const response = await request("/how-bail-works", { headers: { accept: "text/html" } });
  assert.equal(response.status, 308);
  assert.match(response.headers.get("location") ?? "", /\/how-to-bail-someone-out$/);
});

test("renders the licensing page with verification content", async () => {
  const response = await request("/licensing", { headers: { accept: "text/html" } });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Know who you&#x27;re dealing with before you sign/);
  assert.match(html, /Montana regulates surety bail bond producers/);
  assert.match(html, /csimt\.gov\/insurance\/licensing\//);
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

test("publishes the recommended attorney and current Billings office address", async () => {
  const home = await render("/");
  const resources = await render("/resources");

  assert.match(resources, /Lance Lundvall · LP Law PC/);
  assert.match(resources, /admitted to practice in Montana since 1997/);
  assert.match(resources, /href="https:\/\/lplawpc\.com" target="_blank"/);
  assert.match(resources, /Legal services are provided independently by LP Law PC/);
  assert.match(resources, /lance-lundvall-lp-law-pc\.webp/);
  assert.doesNotMatch(resources, /Independent verification|Check an attorney before hiring|State Bar attorney resources/);

  for (const html of [home, resources]) {
    assert.match(html, /711 Central Ave Ste\. 111/);
    assert.match(html, /Billings, MT 59102/);
  }
  assert.match(home, /"streetAddress":"711 Central Ave Ste\. 111"/);
  assert.match(home, /"postalCode":"59102"/);
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


test("publishes the new SEO pages without reviewer bylines or review schema", async () => {
  for (const pathname of [
    "/jails/yellowstone-county-detention-facility",
    "/jails/cascade-county-detention-center",
    "/locations/billings-bail-bonds",
    "/how-to-bail-someone-out",
    "/digital-bail-bonds",
    "/faq",
  ]) {
    const html = await render(pathname);
    assert.doesNotMatch(html, /Reviewed by/i);
    assert.doesNotMatch(html, /"@type":"FAQPage"/);
    assert.doesNotMatch(html, /AggregateRating|reviewCount/);
  }
});

test("includes jail, city, how-to, digital, and FAQ pages in the sitemap", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  for (const path of [
    "/jails",
    "/jails/yellowstone-county-detention-facility",
    "/jails/cascade-county-detention-center",
    "/locations",
    "/locations/billings-bail-bonds",
    "/how-to-bail-someone-out",
    "/digital-bail-bonds",
    "/faq",
  ]) assert.match(sitemap, new RegExp(path.replaceAll("/", "\\/")));
});

test("gives every public page its own canonical, Open Graph identity, and share artwork", async () => {
  for (const pathname of await publicPages()) {
    const markup = documentMarkup(await render(pathname));
    const tags = [...markup.matchAll(/<(?:link|meta)\b[^>]*>/g)].map((match) => attributes(match[0]));
    const expected = "https://example.test" + (pathname === "/" ? "" : pathname);
    assert.equal(tags.find((tag) => tag.rel === "canonical")?.href, expected, pathname);
    assert.equal(tags.find((tag) => tag.property === "og:url")?.content, expected, pathname);
    assert.ok(tags.find((tag) => tag.property === "og:title")?.content, pathname);
    assert.ok(tags.find((tag) => tag.property === "og:description")?.content, pathname);
    assert.ok(tags.find((tag) => tag.property === "og:image")?.content.startsWith("https://example.test/"), pathname);
    assert.ok(tags.find((tag) => tag.name === "twitter:image")?.content, pathname);
  }
});

test("keeps distinct editorial images and the approved digital assets on each page", async () => {
  for (const pathname of await publicPages()) {
    const markup = documentMarkup(await render(pathname));
    const images = [...markup.matchAll(/<img\b[^>]*>/g)]
      .map((match) => attributes(match[0]))
      .filter((image) => !["brand-logo", "footer-logo"].includes(image.class));
    const sources = images.map((image) => image.src);
    assert.equal(new Set(sources).size, sources.length, `Repeated editorial image on ${pathname}`);
  }
  const home = documentMarkup(await render("/"));
  const hero = home.match(/<section class="hero"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.equal((hero.match(/<video\b/g) ?? []).length, 1);
  assert.equal((home.match(/<video\b/g) ?? []).length, 1);
  assert.match(hero, /src="\/videos\/northwest-bail-bonds-2am-call\.mp4"/);
  assert.match(hero, /<h1>[^<]*bail bonds/i);
  const digital = documentMarkup(await render("/digital-bail-bonds"));
  assert.match(digital, /class="page-hero[^>]*>[\s\S]*?<video[^>]*src="\/videos\/northwest-bail-bonds-2am-call\.mp4"/);
  assert.match(digital, /class="phone-asset-wide"[\s\S]*?src="\/images\/marketing\/northwest-bail-bonds-answer-call\.jpg"/);
  assert.match(digital, /class="phone-asset-single"[\s\S]*?src="\/images\/marketing\/northwest-bail-bonds-esignature\.jpg"/);
  assert.doesNotMatch(digital, /northwest-bail-bonds-digital-process\.jpg/);
});

test("serves images with complete attributes and dimensions matching their actual files", async () => {
  const checked = new Map();
  for (const pathname of await publicPages()) {
    const markup = documentMarkup(await render(pathname));
    for (const match of markup.matchAll(/<img\b[^>]*>/g)) {
      const image = attributes(match[0]);
      for (const name of ["alt", "title", "width", "height", "loading", "decoding"]) {
        assert.ok(Object.hasOwn(image, name), `${pathname}: ${image.src} is missing ${name}`);
      }
      if (!checked.has(image.src)) {
        const response = await request(image.src);
        assert.equal(response.status, 200, image.src);
        checked.set(image.src, imageSize(new Uint8Array(await response.arrayBuffer())));
      }
      const dimensions = checked.get(image.src);
      assert.equal(Number(image.width), dimensions.width, `${pathname}: ${image.src} width`);
      assert.equal(Number(image.height), dimensions.height, `${pathname}: ${image.src} height`);
    }
  }
  assert.ok(checked.size > 20, "The test must exercise actual image assets.");
});

test("keeps all page headings free of terminal periods and excludes the banned release claim", async () => {
  for (const pathname of await publicPages()) {
    const html = await render(pathname);
    assert.doesNotMatch(html, /out by morning/i, pathname);
    for (const match of documentMarkup(html).matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)) {
      const heading = match[1].replace(/<[^>]+>/g, " ").trim();
      assert.doesNotMatch(heading, /\.$/, `${pathname}: ${heading}`);
    }
  }
});

test("keeps internal jail guides and official resources together in every jail directory card", async () => {
  const markup = documentMarkup(await render("/jails"));
  const cards = [...markup.matchAll(/<div class="official-resource-card">([\s\S]*?)<\/div>/g)];
  assert.equal(cards.length, 12);
  for (const [, card] of cards) {
    assert.match(card, /class="guide-link" href="\/jails\/[^"]+"/);
    assert.match(card, /href="https:\/\/[^\"]+" target="_blank" rel="noreferrer"[^>]*>Facility details<\/a>/);
    assert.doesNotMatch(card, /<a[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/, "Links must not be nested.");
  }
});
