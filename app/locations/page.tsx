import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { CITY_GUIDES } from "@/app/data/seo-pages";

export const metadata: Metadata = {
  title: "Montana Bail Bonds by City",
  description: "24/7 Montana bail bond guides for Billings, Great Falls, Bozeman, Missoula, Kalispell, Helena, and Butte, with direct links to local detention guides.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Montana Bail Bonds"
        title="Bail bond help by city"
        intro="City pages answer the commercial question. Jail pages answer the custody question. Use the city you know, then jump directly to the detention guide when you have the facility."
        variant="coverage"
      />
      <section className="content-section prose-page">
        <div className="official-links">
          {CITY_GUIDES.map((guide) => (
            <a href={"/locations/" + guide.slug} key={guide.slug}>
              <span>{guide.county}</span>
              <strong>{guide.city} bail bonds</strong>
              <small>24/7 help plus the local detention-facility path.</small>
            </a>
          ))}
        </div>
      </section>
      <InquirySection
        title="Need help somewhere else in Montana?"
        intro="Northwest serves all 56 Montana counties. Call or send the county and person's name."
        id="locations-help"
      />
      <SiteFooter />
    </main>
  );
}
