/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { BASE_URL, PHONE_DISPLAY, PHONE_LINK, SITE_NAME } from "@/app/lib/site";

const PATH = "/jails/yellowstone-county-detention-facility";
const FACILITY = "Yellowstone County Detention Facility";

const FACTS = {
  street: "3165 King Avenue East",
  city: "Billings, MT 59101",
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
    answer: "Use the county's online inmate search, or call detention booking at " + FACTS.bookingPhone + ". Yellowstone County lists booking as a 24-hour contact for bond and charge information.",
  },
  {
    question: "What do I need to bail someone out of YCDF?",
    answer: "The person's full legal name is enough to start. A booking number, bond amount, and the court help move the process faster. A signer may also need government-issued identification.",
  },
  {
    question: "Does it matter which court the charge is in?",
    answer: "Yes. The posting path can depend on the court, case, and time of day. Yellowstone County's Justice Court materials also distinguish bonds by case, so confirm every case before assuming one bond clears the full hold.",
  },
  {
    question: "How long does release take after the bond is posted?",
    answer: "Release is handled by detention staff. Timing depends on facility processing, staffing, and other holds, so an exact release time should not be guaranteed.",
  },
  {
    question: "Can I do this if I do not live in Billings?",
    answer: "Often, yes. Intake and eligible paperwork can usually begin by phone and electronic signature. The actual bond still has to be coordinated with the court or detention facility.",
  },
  {
    question: "Can I call at night or on a holiday?",
    answer: "Yes. " + PHONE_DISPLAY + " is answered 24 hours a day, every day of the year.",
  },
] as const;

export const metadata: Metadata = {
  title: "Yellowstone County Jail Bail Bonds | Billings, MT",
  description: "How to bail someone out of the Yellowstone County Detention Facility at " + FACTS.street + ", Billings. Inmate search, booking phone, and 24/7 help from Northwest Bail Bonds: " + PHONE_DISPLAY + ".",
  alternates: { canonical: PATH },
  openGraph: { url: PATH, title: "Bail Bonds at the " + FACILITY },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": BASE_URL + PATH,
      url: BASE_URL + PATH,
      name: "Bail Bonds at the " + FACILITY,
      about: {
        "@type": "Place",
        name: FACILITY,
        address: {
          "@type": "PostalAddress",
          streetAddress: FACTS.street,
          addressLocality: "Billings",
          addressRegion: "MT",
          postalCode: "59101",
          addressCountry: "US",
        },
        telephone: FACTS.bookingTel,
      },
      provider: { "@id": BASE_URL + "/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Montana jail guides", item: BASE_URL + "/jails" },
        { "@type": "ListItem", position: 3, name: FACILITY, item: BASE_URL + PATH },
      ],
    },
  ],
};

export default function YellowstoneJailPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="Billings · Yellowstone County · 24/7"
        title={"Bail bonds at the " + FACILITY}
        intro={"If someone is at the jail on King Avenue East, confirm the bond with booking and call " + PHONE_DISPLAY + ". Northwest is based in Billings and answers 24 hours a day."}
        variant="coverage"
      />

      <section className="facts-section" aria-labelledby="ycdf-facts-title">
        <div className="facts-heading">
          <h2 id="ycdf-facts-title">The facility at a glance</h2>
          <p>Verified against Yellowstone County's official detention pages. Facility details can change, so confirm with booking before you drive out.</p>
        </div>
        <div className="facts-grid">
          <article>
            <strong>Address</strong>
            <h3>{FACTS.street}</h3>
            <p>{FACTS.city}</p>
          </article>
          <article>
            <strong>Booking · 24 hrs</strong>
            <h3><a href={"tel:" + FACTS.bookingTel}>{FACTS.bookingPhone}</a></h3>
            <p>Call booking for bond amount and charge information. Admin line {FACTS.adminPhone}, weekdays 8 to 5.</p>
          </article>
          <article>
            <strong>Inmate search</strong>
            <h3>Find who is in custody</h3>
            <p>The county posts current inmate information online.</p>
            <a href={FACTS.inmateSearch} target="_blank" rel="noreferrer">Search inmates ↗</a>
          </article>
          <article>
            <strong>Northwest</strong>
            <h3><a href={"tel:" + PHONE_LINK}>{PHONE_DISPLAY}</a></h3>
            <p>Billings-based bail bond line answered 24 hours a day.</p>
          </article>
        </div>
      </section>

      <MontanaSceneBand scene="detention" />

      <section className="content-section prose-page" aria-labelledby="ycdf-steps-title">
        <h2 id="ycdf-steps-title">How to bail someone out of the Yellowstone County jail</h2>
        <ol className="check-list">
          <li><strong>Confirm they are there.</strong> Check the inmate search or call booking at {FACTS.bookingPhone}. Ask for the bond amount and which court set it.</li>
          <li><strong>Call Northwest at {PHONE_DISPLAY}.</strong> Give us the full name. If you have the booking number and bond amount, give us those too.</li>
          <li><strong>Review the agreement.</strong> We explain the fee, collateral if any, payment terms, and signer responsibilities before anything is signed.</li>
          <li><strong>Complete eligible paperwork.</strong> Phone intake and electronic signatures can reduce unnecessary driving.</li>
          <li><strong>The bond is coordinated with the court or facility.</strong> Yellowstone County says bonds are handled through the appropriate court during regular business hours and can be handled at detention after hours.</li>
          <li><strong>Detention staff process release.</strong> The facility controls the release queue and timing.</li>
        </ol>
        <div className="process-phone-row">
          <figure>
            <img
              src="/images/marketing/northwest-bail-bonds-digital-process.jpg"
              alt="A phone screen walking through the four steps to bail someone out of the Yellowstone County jail: jail alert, call 24/7, post bond from your phone, and out by morning."
              title="Digital bail process from your phone"
              width="1008"
              height="1792"
              loading="lazy"
              decoding="async"
            />
            <figcaption>The four steps, done from a phone</figcaption>
          </figure>
          <figure>
            <img
              src="/images/marketing/northwest-bail-bonds-esignature.jpg"
              alt="A phone screen showing a bail bond being signed by e-signature."
              title="Sign bail bond paperwork by e-signature"
              width="1008"
              height="1792"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Sign by e-signature, from anywhere</figcaption>
          </figure>
        </div>
        <p className="legal-note">General information only. Bond status and release timing can change and cannot be guaranteed.</p>
      </section>

      <section className="content-section prose-page" aria-labelledby="ycdf-arrive-title">
        <h2 id="ycdf-arrive-title">Before you drive to the facility</h2>
        <p>Call first. Have the person's full name and booking number if you have it. Northwest can tell you whether the customer side of the bond can begin remotely and whether your physical presence is actually needed.</p>
        <p>Visiting rules are separate from bail. See the county's <a href={FACTS.visitation} target="_blank" rel="noreferrer">visitation page</a> and <a href={FACTS.faq} target="_blank" rel="noreferrer">detention FAQ</a>.</p>
        <p><a className="text-link" href="/digital-bail-bonds">How digital bail bond paperwork works <span>→</span></a></p>
      </section>

      <section className="content-section prose-page" aria-labelledby="ycdf-local-title">
        <h2 id="ycdf-local-title">Billings-based help for YCDF</h2>
        <p>Northwest is based in Billings. For a Yellowstone County detention call, the first job is simple: verify the person, verify every bond or hold, explain the agreement, and coordinate the correct posting path without making the family guess.</p>
        <figure className="process-desk-visual">
          <img
            src="/images/marketing/northwest-bail-bonds-contract-desk.jpg"
            alt="A desk with bail bond paperwork and a contract, the work Northwest handles after the call."
            title="Bail bond paperwork at the Northwest office"
            width="1792"
            height="1008"
            loading="lazy"
            decoding="async"
          />
          <figcaption>The paperwork, handled from the office</figcaption>
        </figure>
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
          <a href={FACTS.inmateSearch} target="_blank" rel="noreferrer"><span>Detention</span><strong>Inmate search</strong><small>Current custody information at the Yellowstone County Detention Facility.</small></a>
          <a href={FACTS.courtDate} target="_blank" rel="noreferrer"><span>Justice Court</span><strong>Find a court date</strong><small>Look up the next appearance after release.</small></a>
          <a href={FACTS.justiceCourt} target="_blank" rel="noreferrer"><span>Justice Court</span><strong>Bond posting policy</strong><small>Official Yellowstone County Justice Court policy.</small></a>
        </div>
      </section>

      <InquirySection
        title="Need someone out of YCDF?"
        intro={"Send the name and what you know, or call " + PHONE_DISPLAY + ". " + SITE_NAME + " answers 24 hours a day."}
        id="ycdf-request-help"
      />
      <SiteFooter />
    </main>
  );
}
