import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { JAIL_GUIDES, getJailGuide } from "@/app/data/seo-pages";
import { BASE_URL, PHONE_DISPLAY, PHONE_LINK, SITE_NAME } from "@/app/lib/site";

export function generateStaticParams() {
  return JAIL_GUIDES
    .filter((guide) => guide.slug !== "yellowstone-county-detention-facility")
    .map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getJailGuide(slug);
  if (!guide) return {};
  const path = "/jails/" + guide.slug;
  return {
    title: guide.facility + " Bail Bonds | " + guide.city + ", MT",
    description: "How to bail someone out of " + guide.facility + " in " + guide.city + ", Montana. Official custody links, facility contact information, and 24/7 help from Northwest Bail Bonds.",
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: guide.facility + " Bail Bonds",
      description: "Official custody links and a direct 24/7 bail bond contact path for " + guide.facility + ".",
    },
  };
}

export default async function JailGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getJailGuide(slug);
  if (!guide) notFound();

  const path = "/jails/" + guide.slug;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": BASE_URL + path,
        url: BASE_URL + path,
        name: guide.facility + " Bail Bonds",
        description: "Bail-out guide for " + guide.facility + " in " + guide.city + ", Montana.",
        about: {
          "@type": "Place",
          name: guide.facility,
          address: guide.address,
          telephone: guide.facilityTel,
        },
        provider: { "@id": BASE_URL + "/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Montana jail guides", item: BASE_URL + "/jails" },
          { "@type": "ListItem", position: 3, name: guide.facility, item: BASE_URL + path },
        ],
      },
    ],
  };

  const faqs = [
    {
      question: "How do I confirm someone is at " + guide.facility + "?",
      answer: guide.rosterUrl
        ? "Use the official inmate roster linked on this page. If the roster is unclear or delayed, contact the facility directly or call Northwest for help confirming the location."
        : "Contact the facility directly or call Northwest. Custody locations can change after an arrest, transfer, court appearance, or classification decision.",
    },
    {
      question: "What information should I have before I call?",
      answer: "Start with the person's full legal name and the facility. A booking number, bond amount, court, and case number are useful when available, but you do not need every detail before calling.",
    },
    {
      question: "Can the paperwork be handled remotely?",
      answer: "Often, yes. Intake and eligible paperwork can usually begin by phone and electronic signature. The actual bond still has to be coordinated with the court or detention facility.",
    },
    {
      question: "How long will release take?",
      answer: "Release timing is controlled by the court and detention facility. Northwest can move the bond process forward promptly, but an exact release time should not be guaranteed.",
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <PageHero
        eyebrow={guide.city + " · " + guide.county + " · 24/7"}
        title={"Bail bonds at " + guide.facility}
        intro={"If someone is being held at " + guide.facility + ", start here. Confirm custody, get the bond information, and call " + PHONE_DISPLAY + " for the next step."}
        variant="coverage"
      />

      <section className="facts-section" aria-labelledby="facility-facts-title">
        <div className="facts-heading">
          <h2 id="facility-facts-title">Facility information</h2>
          <p>Official facility details can change. Confirm custody and current instructions before you travel or send money.</p>
        </div>
        <div className="facts-grid">
          <article>
            <strong>Facility</strong>
            <h3>{guide.facility}</h3>
            <p>{guide.city}, Montana · {guide.county}</p>
          </article>
          <article>
            <strong>Address</strong>
            <h3>{guide.address ?? "Confirm with the facility"}</h3>
            <p>Use the official facility page for current public-entry instructions.</p>
          </article>
          <article>
            <strong>Facility contact</strong>
            <h3>
              {guide.facilityTel && guide.facilityPhone
                ? <a href={"tel:" + guide.facilityTel}>{guide.facilityPhone}</a>
                : "Official page"}
            </h3>
            <p><a href={guide.officialUrl} target="_blank" rel="noreferrer">Open official facility information ↗</a></p>
          </article>
          <article>
            <strong>Northwest Bail Bonds</strong>
            <h3><a href={"tel:" + PHONE_LINK}>{PHONE_DISPLAY}</a></h3>
            <p>Direct 24-hour bail bond line for Montana.</p>
          </article>
        </div>
      </section>

      <MontanaSceneBand scene="detention" />

      <section className="content-section prose-page">
        <h2>How to bail someone out of {guide.facility}</h2>
        <ol className="check-list">
          <li><strong>Confirm custody.</strong> {guide.rosterUrl ? "Check the official roster below or contact the facility." : "Contact the facility or Northwest to confirm where the person is being held."}</li>
          <li><strong>Get the bond information.</strong> Ask for the bond amount, court, case number, and whether there are multiple holds or cases.</li>
          <li><strong>Call Northwest at {PHONE_DISPLAY}.</strong> We explain the bond agreement, fee, collateral if any, and signer responsibilities before you decide.</li>
          <li><strong>Complete the paperwork.</strong> Eligible paperwork can often be handled remotely by phone and e-signature.</li>
          <li><strong>The bond is coordinated with the court or facility.</strong> The exact posting path depends on the court, facility, time of day, and case.</li>
          <li><strong>Wait for facility release processing.</strong> Jail staff control the release queue and timing after the bond is accepted.</li>
        </ol>
        <p className="legal-note">General information only. Facility procedures, bond status, and release timing can change.</p>
      </section>

      <section className="content-section prose-page">
        <h2>What is specific to this facility</h2>
        <p>{guide.facilityFact}</p>
        <p>{guide.custodyNote}</p>
        {guide.rosterUrl && (
          <p><a className="text-link" href={guide.rosterUrl} target="_blank" rel="noreferrer">Open the official inmate roster <span>↗</span></a></p>
        )}
      </section>

      <section className="content-section prose-page">
        <h2>Starting the bond remotely</h2>
        <p>You do not need to drive to a jail before you know whether your presence is required. Call first. Northwest can gather the basic information, explain the agreement, and use electronic paperwork when appropriate.</p>
        <p><a className="text-link" href="/digital-bail-bonds">See how digital bail bond paperwork works <span>→</span></a></p>
      </section>

      <section className="faq-section" id="faq">
        <div className="heading-block"><h2>{guide.city} jail bail bond questions</h2></div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="official-section" aria-labelledby="official-links-title">
        <div className="heading-block"><h2 id="official-links-title">Official facility links</h2></div>
        <div className="official-links">
          {guide.rosterUrl && (
            <a href={guide.rosterUrl} target="_blank" rel="noreferrer">
              <span>{guide.county}</span>
              <strong>Current inmate information</strong>
              <small>Use the official roster to confirm custody and current public information.</small>
            </a>
          )}
          <a href={guide.officialUrl} target="_blank" rel="noreferrer">
            <span>{guide.county}</span>
            <strong>{guide.facility}</strong>
            <small>Official facility information and contact details.</small>
          </a>
          <a href="/jails">
            <span>Northwest Bail Bonds</span>
            <strong>Montana jail directory</strong>
            <small>Open other jail-specific bail bond guides.</small>
          </a>
        </div>
      </section>

      <InquirySection
        title={"Need help at " + guide.facility + "?"}
        intro={"Send the name and what you know, or call " + PHONE_DISPLAY + ". " + SITE_NAME + " answers 24 hours a day."}
        id={"jail-help-" + guide.slug}
      />
      <SiteFooter />
    </main>
  );
}
