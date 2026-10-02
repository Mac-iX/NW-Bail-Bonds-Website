import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { BASE_URL, PHONE_DISPLAY, PHONE_LINK, SITE_NAME } from "@/app/lib/site";

const PATH = "/jails/yellowstone-county-detention-facility";
const FACILITY = "Yellowstone County Detention Facility";

// Source: yellowstonecountymt.gov/sheriff/detention (verified Oct 2026)
const FACTS = {
  street: "3165 King Avenue East",
  city: "Billings, MT",
  bookingPhone: "(406) 256-6881",
  bookingTel: "+14062566881",
  adminPhone: "(406) 256-6900",
  inmateSearch: "https://www.yellowstonecountymt.gov/Sheriff/Detention/dcsearch.asp",
  faq: "https://www.yellowstonecountymt.gov/sheriff/detention/faq.asp",
  visitation: "https://www.yellowstonecountymt.gov/sheriff/detention/visit.asp",
  justiceCourt: "https://www.yellowstonecountymt.gov/justicecourt/JCPolicies.asp",
  courtDate: "https://www.yellowstonecountymt.gov/justicecourt/Find_Court_Date.asp",
};

const FAQS = [
  {
    question: "How do I find out if someone is at the Yellowstone County jail?",
    answer: `Use the county's online inmate search, or call detention booking at ${FACTS.bookingPhone}. Booking answers 24 hours a day and can give bond and charge information. You can also call Northwest and we will help you check.`,
  },
  {
    question: "What do I need to bail someone out of YCDF?",
    answer: "The person's full legal name is enough to start. A booking number, the bond amount, and which court set the bond help us move faster. The co-signer will need a government-issued photo ID.",
  },
  {
    question: "Does it matter which court the charge is in?",
    answer: "Yes. Yellowstone County Justice Court requires a separate bond for each case. If someone is held on two Justice Court cases, two bonds are written. We sort this out on the first call so nothing gets sent back.",
  },
  {
    question: "How long does release take after the bond is posted?",
    answer: "Release is handled by jail staff, not the bondsman. It depends on booking volume and shift changes, and it can take a few hours. We stay in touch with you until your person walks out.",
  },
  {
    question: "Can I do this if I don't live in Billings?",
    answer: "Yes. Most paperwork can be handled by phone and e-signature. Families call us from across Montana and out of state.",
  },
  {
    question: "Can I call at night or on a holiday?",
    answer: `Yes. ${PHONE_DISPLAY} is answered 24 hours a day, every day of the year.`,
  },
] as const;

export const metadata: Metadata = {
  title: "Yellowstone County Jail Bail Bonds | Billings, MT",
  description: `How to bail someone out of the Yellowstone County Detention Facility at ${FACTS.street}, Billings. Inmate search, booking phone, and 24/7 help from a Billings bail bondsman: ${PHONE_DISPLAY}.`,
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: `Bail Bonds at the ${FACILITY}` },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}${PATH}`,
      url: `${BASE_URL}${PATH}`,
      name: `Bail Bonds at the ${FACILITY}`,
      about: {
        "@type": "Place",
        name: FACILITY,
        address: {
          "@type": "PostalAddress",
          streetAddress: FACTS.street,
          addressLocality: "Billings",
          addressRegion: "MT",
          addressCountry: "US",
        },
        telephone: FACTS.bookingTel,
      },
      provider: { "@id": `${BASE_URL}/#organization` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Service areas", item: `${BASE_URL}/service-areas` },
          { "@type": "ListItem", position: 3, name: FACILITY, item: `${BASE_URL}${PATH}` },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

// Image slots: real photos still needed. Each slot carries the brief for the
// photographer or image model so nothing ships as a fake or stock shot.
function PhotoSlot({ title, brief, caption }: { title: string; brief: string; caption: string }) {
  return (
    <figure className="photo-slot" data-photo-needed={title}>
      <div className="photo-slot-frame" role="img" aria-label={caption}>
        <span>Photo needed</span>
        <strong>{title}</strong>
        <small>{brief}</small>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function YellowstoneJailPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="Billings · Yellowstone County · 24/7"
        title={`Bail bonds at the ${FACILITY}`}
        intro={`Someone you care about is at the jail on King Avenue East. Here is exactly how to get them out, from a bail bond company based in Billings. Call ${PHONE_DISPLAY} any hour.`}
        variant="coverage"
      />

      <section className="facts-section" aria-labelledby="ycdf-facts-title">
        <div className="facts-heading">
          <h2 id="ycdf-facts-title">The facility at a glance</h2>
          <p>Verified against Yellowstone County&apos;s official detention pages. Facility details can change, so confirm with booking before you drive out.</p>
        </div>
        <div className="facts-grid">
          <article>
            <strong>Address</strong>
            <h3>{FACTS.street}</h3>
            <p>{FACTS.city}. East of downtown on King Avenue East, near the I-90 interchange.</p>
          </article>
          <article>
            <strong>Booking · 24 hrs</strong>
            <h3><a href={`tel:${FACTS.bookingTel}`}>{FACTS.bookingPhone}</a></h3>
            <p>Call booking for bond amount and charge information. Admin line {FACTS.adminPhone}, weekdays 8 to 5.</p>
          </article>
          <article>
            <strong>Inmate search</strong>
            <h3>Find who is in custody</h3>
            <p>The county posts a current roster online.</p>
            <a href={FACTS.inmateSearch} target="_blank" rel="noreferrer">Search inmates ↗</a>
          </article>
          <article>
            <strong>Northwest</strong>
            <h3><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a></h3>
            <p>Our office is downtown on Central Avenue. We post bonds at this jail more than anywhere else in Montana.</p>
          </article>
        </div>
      </section>

      <MontanaSceneBand scene="detention" />

      <section className="content-section prose-page" aria-labelledby="ycdf-steps-title">
        <h2 id="ycdf-steps-title">How to bail someone out of the Yellowstone County jail</h2>
        <ol className="check-list">
          <li><strong>Confirm they are there.</strong> Check the inmate search or call booking at {FACTS.bookingPhone}. Ask for the bond amount and which court set it.</li>
          <li><strong>Call Northwest at {PHONE_DISPLAY}.</strong> Give us the full name. If you have the booking number and bond amount, give us those too. We explain the fee, any collateral, and what the co-signer is agreeing to before anything is signed.</li>
          <li><strong>Sign the paperwork.</strong> At our office, at the jail, or by e-signature from wherever you are.</li>
          <li><strong>We post the bond at the facility.</strong> If there are Justice Court charges, each case gets its own bond. That is county policy, and we handle it.</li>
          <li><strong>Jail staff process the release.</strong> We stay on the phone with you until it is done, then walk through court dates so the bond stays in good standing.</li>
        </ol>
        <p className="legal-note">General information only. Release timing is controlled by the detention facility and cannot be guaranteed.</p>
      </section>

      <section className="content-section prose-page" aria-labelledby="ycdf-arrive-title">
        <h2 id="ycdf-arrive-title">If you are going to the facility</h2>
        <PhotoSlot
          title="YCDF public entrance"
          brief="Daylight, landscape, 1600px+. Public entrance and visitor parking at 3165 King Ave E, building signage readable, no people or vehicle plates identifiable. Shot by Northwest or a hired photographer, never AI-generated."
          caption="Public entrance of the Yellowstone County Detention Facility, 3165 King Avenue East, Billings."
        />
        <p>Bring a government-issued photo ID. Have the person&apos;s full name and booking number written down. Call us before you leave so we can tell you whether you need to be there at all. Most families don&apos;t.</p>
        <p>Visiting rules are separate from bail. See the county&apos;s <a href={FACTS.visitation} target="_blank" rel="noreferrer">visitation page</a> and <a href={FACTS.faq} target="_blank" rel="noreferrer">detention FAQ</a>.</p>
      </section>

      <section className="content-section prose-page" aria-labelledby="ycdf-why-title">
        <h2 id="ycdf-why-title">Why a Billings bondsman matters here</h2>
        <PhotoSlot
          title="Joel at the Central Avenue office"
          brief="Joel Graf (and agents on staff) at the Northwest office, 711 Central Ave, Billings. Natural light, real work setting, signage visible. Landscape, 1600px+."
          caption="Joel Graf at the Northwest Bail Bonds office in downtown Billings."
        />
        <p>When a bond needs to be posted at 2 a.m., the agent has to drive to King Avenue East. Our office is about ten minutes away. Out-of-state agencies with a Billings mailing address route your call to whoever is closest, and that can be hours.</p>
        <p>Ask any bondsman where their agent is right now and how long it takes them to reach the jail. You deserve a straight answer.</p>
      </section>

      <section className="faq-section" id="faq">
        <div className="heading-block"><h2>Yellowstone County jail questions</h2></div>
        <div className="faq-list">
          {FAQS.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="official-section" aria-labelledby="ycdf-links-title">
        <div className="heading-block"><h2 id="ycdf-links-title">Official Yellowstone County links</h2></div>
        <div className="official-links">
          <a href={FACTS.inmateSearch} target="_blank" rel="noreferrer"><span>Detention</span><strong>Inmate search</strong><small>Current roster at the Yellowstone County Detention Facility.</small></a>
          <a href={FACTS.courtDate} target="_blank" rel="noreferrer"><span>Justice Court</span><strong>Find a court date</strong><small>Look up the next appearance after release.</small></a>
          <a href={FACTS.justiceCourt} target="_blank" rel="noreferrer"><span>Justice Court</span><strong>Bond posting policy</strong><small>Why each Justice Court case needs its own bond.</small></a>
        </div>
      </section>

      <InquirySection
        title="Need someone out of YCDF?"
        intro={`Send the name and what you know, or call ${PHONE_DISPLAY}. ${SITE_NAME} answers 24 hours a day.`}
        id="ycdf-request-help"
      />
      <SiteFooter />
    </main>
  );
}
