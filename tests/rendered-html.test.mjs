import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  return response.text();
}

test("renders the approved homepage lead, concise help form, and a visible Home navigation link", async () => {
  const html = await render("/");
  assert.match(html, /A Bail Bond company built around customer service\./);
  assert.match(html, /Northwest believes urgent service can still be personal\./);
  assert.match(html, /<a[^>]+href="\/"[^>]*>Home<\/a>/);
  assert.match(html, /We&#x27;re here to help\./);
  assert.match(html, /Ask Northwest for help/);
  assert.doesNotMatch(html, /form opens an email/i);
  assert.doesNotMatch(html, /Here&#x27;s what happens when you call/);
  assert.doesNotMatch(html, /These are the questions that matter/);
  assert.doesNotMatch(html, /24\/7<\/strong><span>Available/);
});

test("gives supporting pages distinct, literal headings", async () => {
  const expectations = new Map([
    ["/about", "About Northwest Bail Bonds."],
    ["/service-areas", "Serving all 56 Montana counties."],
    ["/resources", "Montana Bail Bond resources."],
    ["/contact", "Contact Northwest Bail Bonds."],
  ]);
  for (const [pathname, heading] of expectations) {
    assert.match(await render(pathname), new RegExp(`<h1>${heading.replaceAll(".", "\\.")}</h1>`));
  }
});

test("renders all 56 real Montana county selections", async () => {
  const html = await render("/service-areas");
  assert.equal((html.match(/aria-label="Select [^"]+ County"/g) ?? []).length, 56);
  assert.match(html, /aria-label="Select Yellowstone County"[^>]+aria-pressed="true"/);
});

test("renders the county detention directory and private email intake entry point", async () => {
  const html = await render("/service-areas");
  assert.match(html, /Detention facilities in Yellowstone County/);
  assert.match(html, /Yellowstone County Detention Facility/);
  assert.match(html, /Official custody search/);
  assert.match(html, /Ask Northwest about someone in/);
  assert.match(html, /Facility assignments and rosters can change/);
  assert.doesNotMatch(html, /Person(?:&apos;|')s full legal name/);
});

test("renders the urgent call and email prompt across the site", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/contact"]) {
    const html = await render(pathname);
    assert.match(html, /Need a Bail Bondsman right now\?/);
    assert.match(html, /href="tel:\+14066011225"/);
    assert.match(html, /href="mailto:northwestbailbond@gmail\.com/);
    assert.doesNotMatch(html, /href="sms:/);
  }
});

test("publishes Northwest's story on Home and Joel Graf's full story on About", async () => {
  const home = await render("/");
  const about = await render("/about");
  assert.match(home, /Our Story/);
  assert.match(home, /Built in Billings\. Grown across Montana\./);
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
  assert.match(html, /A Bond gets someone out\. What happens next matters, too\./);
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
  assert.match(home, /A quiet moment of support\./);

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
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-retired-route`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/how-bail-works", { headers: { accept: "text/html" }, redirect: "manual" }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 308);
  assert.match(response.headers.get("location") ?? "", /\/resources#faq$/);
});

test("keeps the inquiry form on every primary page and removes stranded guide links", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/resources", "/contact"]) {
    const html = await render(pathname);
    assert.match(html, /Ask Northwest for help/);
    assert.doesNotMatch(html, /href="\/how-bail-works"/);
  }

  const sitemap = await render("/sitemap.xml");
  assert.doesNotMatch(sitemap, /how-bail-works/);
});

test("renders source-backed Montana facts without unsourced crime claims", async () => {
  const home = await render("/");
  const resources = await render("/resources");
  assert.doesNotMatch(home, /Montana facts worth knowing\./);
  assert.match(resources, /Montana facts worth knowing\./);
  assert.match(resources, /MCA 33-26-109/);
  assert.match(resources, /courts\.mt\.gov\/cao\/pretrial/);
  assert.match(resources, /Retains the decision/);
  assert.doesNotMatch(resources, /crime rate/i);
});

test("capitalizes Bail Bond terminology in page copy", async () => {
  for (const pathname of ["/", "/about", "/service-areas", "/resources", "/contact"]) {
    const html = await render(pathname);
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(visibleText, /\bbail bondsman\b|\bbail bonds\b|\bbail bond\b|\bbondsman\b/);
  }
});
