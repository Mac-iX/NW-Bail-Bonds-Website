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
  FACEBOOK_REVIEW_URL,
  FACEBOOK_URL,
  GOOGLE_BUSINESS_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Contact Northwest Bail Bonds",
  description: `Call or email Northwest Bail Bonds at ${PHONE_DISPLAY} or ${EMAIL_ADDRESS} for 24-hour Bail Bond help in Billings and throughout Montana.`,
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
        title="Contact Northwest Bail Bonds."
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
      <section className="social-contact-section" id="facebook">
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
        <article>
          <h2>Prefer Facebook?</h2>
          <p>Follow Northwest, send a message, or check recent community updates on the official Facebook page.</p>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Reach us on Facebook <span>↗</span></a>
        </article>
        <article id="reviews">
          <h2>Had a good experience? Leave a review.</h2>
          <p>A short, honest review helps Montana families know who they are calling during a stressful moment.</p>
          <div className="review-links">
            <a href={FACEBOOK_REVIEW_URL} target="_blank" rel="noreferrer">Review on Facebook <span>↗</span></a>
            <a href={GOOGLE_BUSINESS_URL} target="_blank" rel="noreferrer">Find Northwest on Google <span>↗</span></a>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
