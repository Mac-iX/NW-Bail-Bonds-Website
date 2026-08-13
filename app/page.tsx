/* eslint-disable @next/next/no-img-element */
import { HelpRequestForm } from "@/app/components/help-request-form";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { MontanaCoverage } from "@/app/components/montana-coverage";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  BASE_URL,
  EMAIL_ADDRESS,
  FAQS,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  SITE_NAME,
} from "@/app/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["Northwest Bail Bondsman", "NW Bail Bonds"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/northwest-logo-transparent.png`,
    width: 779,
    height: 491,
    caption: "Northwest Bail Bonds logo",
  },
  image: [
    {
      "@type": "ImageObject",
      name: "Northwest Bail Bonds statewide Montana service",
      url: `${BASE_URL}/montana-city-hero.jpeg`,
      width: 1536,
      height: 658,
      caption: "Montana mountain community at sunset",
    },
    {
      "@type": "ImageObject",
      name: "A human moment during Northwest Bail Bonds work",
      url: `${BASE_URL}/images/real/northwest-bail-bonds-support-at-detention-facility.jpeg`,
      width: 1152,
      height: 1536,
      caption: "A quiet moment of support at a Montana detention facility.",
    },
  ],
  telephone: PHONE_LINK,
  email: EMAIL_ADDRESS,
  description:
    "A Billings-based Montana Bail Bond company serving all 56 counties.",
  areaServed: {
    "@type": "State",
    name: "Montana",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Billings",
    addressRegion: "MT",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_LINK,
    email: EMAIL_ADDRESS,
    contactType: "customer service",
    areaServed: "US-MT",
    availableLanguage: "English",
  },
  sameAs: [FACEBOOK_URL],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.slice(0, 6).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> Montana Bail Bonds · phones answered 24/7
          </p>
          <h1>
            A Bail Bond company built around customer service.
          </h1>
          <p className="hero-lede">
            Northwest believes urgent service can still be personal. Every call
            should leave a family better informed, more grounded, and clear about
            the next decision.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={`tel:${PHONE_LINK}`}>
              Call now <span>{PHONE_DISPLAY}</span>
            </a>
            <a className="button button-secondary" href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}>
              Email Northwest
            </a>
          </div>
          <p className="hero-note">Based in Billings · Serving all 56 Montana counties</p>
        </div>
      </section>

      <section className="help-section home-intake" aria-labelledby="home-intake-title">
        <div className="help-copy">
          <h2 id="home-intake-title">We&apos;re here to help.</h2>
          <p>Tell us who is in custody and where. If that is all you know, that is enough to start.</p>
          <div className="direct-line">
            <span>For the quickest response</span>
            <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            <small>Phones answered 24 hours a day</small>
          </div>
        </div>
        <HelpRequestForm />
      </section>

      <MontanaSceneBand scene="detention" />

      <section className="people-section" id="about">
        <figure className="people-visual home-story-visual">
          <img
            src="/images/real/northwest-bail-bonds-support-at-detention-facility.jpeg"
            alt="Two people sharing an embrace across a table with paperwork at a Montana detention facility."
            title="A human moment during Northwest Bail Bonds work"
            width="1152"
            height="1536"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>A quiet moment of support.</strong>
            <span>Real people · Real moments · Montana</span>
          </figcaption>
        </figure>
        <div className="people-copy">
          <span className="section-label">Our Story</span>
          <h2>Built in Billings. Grown across Montana.</h2>
          <div className="company-story-copy">
            <p>We started Northwest Bail Bonds because we saw how cold the process could feel from the other side. A late-night arrest does not come with a handbook. It lands on a family all at once.</p>
            <p>Our work grew beyond Billings through the relationships we built across Montana. The job is still simple: answer the phone, be straight about the Bond in front of us, and help people handle what comes next. When we can, that has also meant a ride home, a trip to court, or a hand finding the next opportunity.</p>
            <p>We are still writing our story. It is built from the people who call us, the communities we serve, and the belief that one bad night does not have to become the whole story.</p>
          </div>
          <p className="founder-story-callout">Northwest began with Joel Graf&apos;s own experience of second chances, faith, and service.</p>
          <div className="people-links">
            <a className="text-link" href="/about#joel-story">Meet Joel and read the founder story <span>→</span></a>
            <a className="text-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">Follow on Facebook <span>↗</span></a>
          </div>
        </div>
      </section>

      <MontanaSceneBand scene="city" />

      <MontanaCoverage compact />

      <section className="credibility-section">
        <div className="credential-heading">
          <h2>Know who you&apos;re dealing with before you sign.</h2>
          <figure className="credential-landmark">
            <img
              className="credential-scene-art"
              src="/scene-courthouse-stencil.png"
              alt="Layered courthouse and Montana landscape illustration representing producer licensing and Bond agreements."
              title="Montana Bail Bond licensing and written agreements"
              width="2172"
              height="724"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Montana licensing · Independent verification</figcaption>
          </figure>
        </div>
        <div className="credential-copy">
          <p>
            Montana regulates surety Bail Bond producers through the Commissioner
            of Securities and Insurance. You can ask for current license details,
            review every obligation, and verify a producer before signing.
          </p>
          <ul className="check-list">
            <li>Request current producer and agency license information.</li>
            <li>Ask for fees, collateral terms, and signer obligations in writing.</li>
            <li>Confirm court-date and release-condition responsibilities.</li>
          </ul>
          <div className="credential-links">
            <a href="https://csimt.gov/insurance/licensing/" target="_blank" rel="noreferrer">Montana CSI licensing <span>↗</span></a>
            <a href="/resources#licensing">Read our licensing & disclosure guide <span>→</span></a>
          </div>
          <p className="legal-note">General information only. This website does not provide legal advice or guarantee release timing.</p>
        </div>
      </section>

      <section className="help-section" id="contact">
        <div className="help-copy">
          <h2>Choose the way you want to reach us.</h2>
          <p>Call for the quickest response, send an email, or use Facebook Messenger. The Contact page keeps every verified option in one place.</p>
          <div className="direct-line">
            <span>Direct line</span>
            <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            <small>Answered 24 hours a day</small>
          </div>
        </div>
        <div className="contact-choice-card">
          <a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}><strong>Email Northwest</strong><span>{EMAIL_ADDRESS} →</span></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><strong>Facebook Messenger</strong><span>Open the official page ↗</span></a>
          <a href="/contact"><strong>Contact & reviews</strong><span>See every option →</span></a>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="heading-block">
          <h2>Montana Bail Bond answers.</h2>
        </div>
        <div className="faq-list">
          {FAQS.slice(0, 6).map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <a className="text-link" href="/resources">Explore all guides and official resources <span>→</span></a>
      </section>

      <section className="closing-cta">
        <div>
          <h2>Speak with Northwest when you&apos;re ready.</h2>
        </div>
        <div className="closing-actions">
          <a href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}>Email Northwest</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
