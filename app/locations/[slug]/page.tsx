/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { CITY_GUIDES, getCityGuide } from "@/app/data/seo-pages";
import { BASE_URL, PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

export function generateStaticParams() {
  return CITY_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getCityGuide(slug);
  if (!guide) return {};
  const path = "/locations/" + guide.slug;
  return {
    title: guide.city + " Bail Bonds | 24/7 Montana Bail Bondsman",
    description: "24/7 bail bonds in " + guide.city + ", Montana and " + guide.county + ". Jail-specific guidance, remote paperwork options, and direct help from Northwest Bail Bonds.",
    alternates: { canonical: path },
    openGraph: { url: path, title: guide.city + " Bail Bonds | Northwest Bail Bonds" },
  };
}

export default async function CityBailBondsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getCityGuide(slug);
  if (!guide) notFound();

  const path = "/locations/" + guide.slug;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": BASE_URL + path,
        url: BASE_URL + path,
        name: guide.city + " Bail Bonds",
        about: { "@type": "Place", name: guide.city + ", Montana" },
        provider: { "@id": BASE_URL + "/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Montana locations", item: BASE_URL + "/locations" },
          { "@type": "ListItem", position: 3, name: guide.city + " bail bonds", item: BASE_URL + path },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <PageHero
        eyebrow={guide.county + " · 24/7"}
        title={guide.city + " bail bonds"}
        intro={guide.lead + " Call " + PHONE_DISPLAY + " to start."}
        variant="coverage"
      />
      <section className="facts-section">
        <div className="facts-heading">
          <h2>Fastest path from arrest to a clear next step</h2>
          <p>You do not need to know every detail before you call. Start with the person's name and where you believe they are being held.</p>
        </div>
        <div className="facts-grid">
          <article>
            <strong>Area</strong>
            <h3>{guide.city}, Montana</h3>
            <p>{guide.county}</p>
          </article>
          <article>
            <strong>Primary detention guide</strong>
            <h3>{guide.facility}</h3>
            <p><a href={"/jails/" + guide.facilitySlug}>Open the jail-specific guide →</a></p>
          </article>
          <article>
            <strong>Northwest</strong>
            <h3><a href={"tel:" + PHONE_LINK}>{PHONE_DISPLAY}</a></h3>
            <p>Direct line answered 24 hours a day.</p>
          </article>
          <article>
            <strong>Remote start</strong>
            <h3>Phone + e-sign when eligible</h3>
            <p><a href="/digital-bail-bonds">Digital bail bond process →</a></p>
          </article>
        </div>
      </section>

      <MontanaSceneBand scene="city" />

      <section className="content-section prose-page">
        <h2>How to start a bail bond in {guide.city}</h2>
        <ol className="check-list">
          <li><strong>Confirm the custody location.</strong> The arresting agency and housing facility are not always the same.</li>
          <li><strong>Check the bond information.</strong> Get the amount, court, and case number if available.</li>
          <li><strong>Call Northwest.</strong> We explain the written agreement, fee, collateral if any, and signer responsibilities before you decide.</li>
          <li><strong>Complete eligible paperwork remotely.</strong> Electronic signatures can reduce unnecessary driving.</li>
          <li><strong>Northwest coordinates the bond.</strong> The posting path depends on the court, facility, and time of day.</li>
        </ol>
        <p>{guide.localNote}</p>
      </section>

      <section className="content-section prose-page">
        <h2>If you do not know the jail</h2>
        <p>Use the statewide county directory. It covers all 56 Montana counties, including counties that use sheriff holding, temporary facilities, or out-of-county housing instead of a conventional county jail.</p>
        <p><a className="text-link" href="/service-areas">Find the county and detention resource <span>→</span></a></p>
      </section>

      <InquirySection
        title={"Need a bail bond in " + guide.city + "?"}
        intro={"Call " + PHONE_DISPLAY + " or send the person's name and custody location if known."}
        id={"city-help-" + guide.slug}
      />
      <SiteFooter />
    </main>
  );
}
