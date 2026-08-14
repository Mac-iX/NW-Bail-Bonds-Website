/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { HelpRequestForm } from "@/app/components/help-request-form";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  BASE_URL,
  EMAIL_ADDRESS,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Contact Northwest Bail Bonds",
  description: `Call or email Northwest Bail Bonds at ${PHONE_DISPLAY} or ${EMAIL_ADDRESS} for 24-hour bail bond help in Billings and throughout Montana.`,
  alternates: { canonical: "/contact" },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Northwest Bail Bonds",
  url: `${BASE_URL}/contact`,
  image: {
    "@type": "ImageObject",
    name: "Joel Graf at MY 105.9 Classic Hits",
    url: `${BASE_URL}/images/real/joel-graf-my-1059-radio-studio.jpeg`,
    width: 710,
    height: 590,
    caption: "Joel Graf visits the MY 105.9 Classic Hits radio studio.",
  },
};

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="Phone · email · Facebook"
        title="Contact Northwest Bail Bonds"
        intro="Call (406) 601-1225, email northwestbailbond@gmail.com, or message Northwest on Facebook. The person’s name and county or detention facility are enough to begin."
        variant="contact"
        cta={false}
      />
      <section className="contact-layout">
        <div className="contact-options">
          <a className="contact-number" href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
          <p>Call for the quickest case-specific conversation. If speaking is not convenient, send an email or reach out through Facebook Messenger.</p>
          <div className="contact-buttons"><a href={`tel:${PHONE_LINK}`}>Call now</a><a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}>Send an email</a></div>
          <a className="contact-email" href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>
          <div className="contact-note"><strong>Privacy reminder</strong><span>Do not email Social Security numbers, banking information, account credentials, or other highly sensitive personal data.</span></div>
        </div>
        <HelpRequestForm />
      </section>
      <MontanaSceneBand scene="city" />
      <section className="contact-prep">
        <h2>Helpful if available</h2>
        <div><strong>Person&apos;s full name</strong><strong>County or facility</strong><strong>Bond amount</strong><strong>Your callback number</strong></div>
      </section>
      <section className="contact-closing-section" id="facebook">
        <figure className="contact-community-photo">
          <img
            src="/images/real/joel-graf-my-1059-radio-studio.jpeg"
            alt="Joel Graf and a radio host seated in the MY 105.9 Classic Hits studio."
            title="Joel Graf at MY 105.9 Classic Hits"
            width="710"
            height="590"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Northwest in the Billings community · MY 105.9 Classic Hits</figcaption>
        </figure>
        <article className="contact-closing-copy">
          <span className="section-label">Ready when you are</span>
          <h2>Choose the next useful step</h2>
          <p>Call for the quickest response, send the basic details by email, or look up the county and jail resource before you contact Northwest.</p>
          <div className="contact-closing-actions">
            <a className="contact-closing-primary" href={`tel:${PHONE_LINK}`}>
              <strong>Call Northwest</strong>
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20help`}>
              <strong>Email Northwest</strong>
              <span>{EMAIL_ADDRESS}</span>
            </a>
            <a href="/service-areas">
              <strong>County and jail resources</strong>
              <span>Search all 56 counties →</span>
            </a>
          </div>
          <a className="contact-facebook-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook community updates ↗</a>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
