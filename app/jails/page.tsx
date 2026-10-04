import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { JAIL_GUIDES } from "@/app/data/seo-pages";
import { PHONE_DISPLAY } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Montana Jail Bail Bond Guides",
  description: "Montana jail and detention guides with official inmate-roster links, facility contacts, and 24/7 bail bond help from Northwest Bail Bonds.",
  alternates: { canonical: "/jails" },
};

export default function JailsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Montana Jail Directory"
        title="Jail-specific bail bond guides"
        intro={"Start with the facility. Each guide links to official custody information and explains the fastest useful next step. Call " + PHONE_DISPLAY + " if you are not sure where the person is being held."}
        variant="coverage"
      />
      <section className="content-section prose-page">
        <h2>Start with the jail you know</h2>
        <p>These pages are built for the moment when you know the facility name but not what to do next. Use the official roster when one is available, confirm the bond information, then call Northwest.</p>
        <div className="official-links">
          {JAIL_GUIDES.map((guide) => (
            <a href={"/jails/" + guide.slug} key={guide.slug}>
              <span>{guide.city} · {guide.county}</span>
              <strong>{guide.facility}</strong>
              <small>Facility details, inmate lookup, bail steps, and 24/7 contact path.</small>
            </a>
          ))}
        </div>
      </section>
      <section className="content-section prose-page">
        <h2>Do not see the facility?</h2>
        <p>Northwest serves all 56 Montana counties. The statewide service-area directory includes sheriff, detention, roster, and out-of-county housing resources for every county.</p>
        <p><a className="text-link" href="/service-areas">Open all Montana county resources <span>→</span></a></p>
      </section>
      <InquirySection
        title="Need help finding the right jail?"
        intro="Send the person's name and county if you know it, or call Northwest 24/7."
        id="jail-directory-help"
      />
      <SiteFooter />
    </main>
  );
}
