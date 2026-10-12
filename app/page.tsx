/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import { HelpRequestForm } from "@/app/components/help-request-form";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { MontanaCoverage } from "@/app/components/montana-coverage";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  BASE_URL,
  BUSINESS_POSTAL_CODE,
  BUSINESS_STREET_ADDRESS,
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
      name: "Northwest Bail Bonds 24/7 digital bail service",
      url: `${BASE_URL}/images/marketing/northwest-bail-bonds-phone-hero.jpg`,
      width: 1792,
      height: 1008,
      caption: "Northwest Bail Bonds 24/7 phone answered around the clock",
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
    "A Billings-based Montana bail bond company serving all 56 counties.",
  areaServed: {
    "@type": "State",
    name: "Montana",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_STREET_ADDRESS,
    addressLocality: "Billings",
    addressRegion: "MT",
    postalCode: BUSINESS_POSTAL_CODE,
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
            <span className="live-dot" /> Live phone answered 24/7 · Billings, Montana
          </p>
          <h1>
            Montana bail bonds: we can help you bail out your loved one
          </h1>
          <p className="hero-lede">
            Call Northwest and we confirm custody, explain the bond, and post it — nights, weekends, and holidays.
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
        <div className="hero-reel">
          <video
            src="/videos/northwest-bail-bonds-2am-call.mp4"
            poster="/images/marketing/northwest-bail-bonds-2am-call-poster.jpg"
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            aria-label="Northwest Bail Bonds 2 a.m. call: from arrest to release on your phone"
          />
          <figcaption>The 2 a.m. call: how a bond gets posted from your phone</figcaption>
        </div>
      </section>

      <ul className="trust-strip" aria-label="Northwest Bail Bonds credentials">
        <li>Licensed</li>
        <li>Bonded</li>
        <li>Insured</li>
        <li>24/7</li>
        <li className="trust-rating">4.9★ Google reviews</li>
        <li className="trust-rating">ThreeBestRated · Top 3</li>
      </ul>

      <section className="digital-bail-section" aria-labelledby="digital-bail-title">
        <figure className="digital-bail-visual">
          <img
            src="/images/marketing/northwest-bail-bonds-digital-process.jpg"
            alt="Digital bail bond process from a phone: the jail alert, calling Northwest 24/7, posting bond from your phone with an e-signature, and a confirmed release time."
            title="Digital bail bonds: the four steps, handled from your phone"
            width="1008"
            height="1792"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Digital bail bonds · four steps from your phone</figcaption>
        </figure>
        <div className="digital-bail-copy">
                  <span className="promo-tag">24/7 phone service</span>
                  <span className="section-label">Digital bail bonds</span>
                  <h2 id="digital-bail-title">Most of the work happens from your phone</h2>
          <p>You don&apos;t have to drive anywhere. Call, sign by e-signature, and we post the bond at the jail. Most families never set foot in the facility.</p>
          <ol className="digital-bail-steps">
            <li><strong>1</strong> Tell us who is in custody and where.</li>
            <li><strong>2</strong> We confirm the bond and explain the terms.</li>
            <li><strong>3</strong> You sign by e-signature from anywhere.</li>
            <li><strong>4</strong> We post bond and stay with you until release.</li>
          </ol>
        </div>
      </section>

      <section className="help-section home-intake" aria-labelledby="home-intake-title">
        <div className="help-copy">
          <h2 id="home-intake-title">We&apos;re here to help</h2>
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

      <MontanaCoverage compact />

      <MontanaSceneBand scene="city" />

      <section className="mobile-hero-band" aria-labelledby="mobile-hero-title">
        <div className="mobile-hero-copy">
          <span className="section-label">Montana bail bonds, answered 24/7</span>
          <h2 id="mobile-hero-title">The call goes to a phone, not a call center</h2>
          <p>Call from wherever you are. Northwest gathers the basic information, explains the agreement, and starts the electronic paperwork while the bond is coordinated with the court or detention facility.</p>
          <a className="text-link" href="/digital-bail-bonds">See the full digital bail bond process <span>→</span></a>
        </div>
        <figure className="mobile-hero-visual">
          <img
            src="/images/marketing/northwest-bail-bonds-phone-hero.jpg"
            alt="Northwest Bail Bonds 24/7 call screen on a smartphone showing the direct line (406) 601-1225 and an Answer Call button."
            title="Call Northwest Bail Bonds from your phone, 24/7"
            width="1792"
            height="1008"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Montana bail bonds · one call, answered any hour</figcaption>
        </figure>
      </section>

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
            <strong>A quiet moment of support</strong>
            <span>Real people · Real moments · Montana</span>
          </figcaption>
        </figure>
        <div className="people-copy">
          <span className="section-label">Our Story</span>
          <h2>Built in Billings, grown across Montana</h2>
          <div className="company-story-copy">
            <p>We started Northwest Bail Bonds because we saw how cold the process could feel from the other side. A late-night arrest does not come with a handbook. It lands on a family all at once.</p>
            <p>Our work grew beyond Billings through the relationships we built across Montana. The job is still simple: answer the phone, be straight about the bond in front of us, and help people handle what comes next. When we can, that has also meant a ride home, a trip to court, or a hand finding the next opportunity.</p>
            <p>We are still writing our story. It is built from the people who call us, the communities we serve, and the belief that one bad night does not have to become the whole story.</p>
          </div>
          <p className="founder-story-callout">Northwest began with Joel Graf&apos;s own experience of second chances, faith, and service.</p>
          <div className="people-links">
                      <a className="text-link" href="/about#joel-story">Meet Joel and read the founder story <span>→</span></a>
                      <a className="text-link" href="/jails">Montana jail and detention guides <span>→</span></a>
                    </div>
        </div>
      </section>

      <section className="help-section" id="contact">
        <div className="help-copy">
          <h2>Choose the way you want to reach us</h2>
          <p>Call for the quickest response, send an email, or jump straight to the jail, city, and county pages that answer the most common questions.</p>
                    <div className="direct-line">
                      <span>Direct line</span>
                      <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
                      <small>Answered 24 hours a day</small>
                    </div>
                  </div>
                  <div className="contact-choice-card">
                    <a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}><strong>Email Northwest</strong><span>{EMAIL_ADDRESS} →</span></a>
                    <a href="/jails"><strong>Jail guides</strong><span>Every Montana facility →</span></a>
                    <a href="/locations/billings-bail-bonds"><strong>City bail bonds</strong><span>Billings and beyond →</span></a>
                    <a href="/service-areas"><strong>Service areas</strong><span>All 56 counties →</span></a>
                    <a href="/contact"><strong>Contact &amp; reviews</strong><span>See every option →</span></a>
                  </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="heading-block">
          <h2>Montana bail bond answers</h2>
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
          <h2>Speak with Northwest when you&apos;re ready</h2>
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
