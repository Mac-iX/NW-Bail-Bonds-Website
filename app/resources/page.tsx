/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { HelpRequestForm } from "@/app/components/help-request-form";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  BASE_URL,
  FAQS,
  MONTANA_LAWYER_REFERRAL_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Montana Bail Bond Resources, Licensing & FAQ",
  description: "Montana bail bond guides, producer licensing information, attorney resources, official court links, and plain-language answers from Northwest Bail Bonds.",
  alternates: { canonical: "/resources" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

const resourceSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Montana Bail Bond Resources",
  url: `${BASE_URL}/resources`,
  description: "Guides, Montana licensing information, attorney resources, official public sources, and bail bond answers.",
  about: ["Montana bail bonds", "surety bail bond producer licensing", "Montana court information"],
  image: {
    "@type": "ImageObject",
    name: "City of Billings courtroom",
    url: `${BASE_URL}/images/real/city-of-billings-montana-courtroom.jpeg`,
    width: 1152,
    height: 1536,
    caption: "The City of Billings courtroom viewed from the public seating area.",
  },
};

export default function ResourcesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceSchema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="Guides · licensing · legal resources"
        title="Montana bail bond resources"
        intro="Practical guides, license-verification links, attorney resources, official Montana sources, and answers to common bail bond questions."
        variant="resources"
      />
      <section className="content-section resource-section" id="guides">
        <div className="content-heading"><h2>Get oriented before the paperwork begins</h2></div>
        <div className="resource-grid">
          <a href="#faq"><span>Guide 01</span><h3>Common bail bond questions</h3><p>Read short answers about cost, timing, collateral, court dates, and statewide service.</p><strong>Read the answers ↓</strong></a>
          <a href="/service-areas"><span>Guide 02</span><h3>Find your Montana service area</h3><p>Search all 56 counties and see primary statewide coverage hubs.</p><strong>Search coverage →</strong></a>
          <a href="#licensing"><span>Guide 03</span><h3>Licensing, verification & disclosures</h3><p>Know which credentials to request and where to verify them.</p><strong>Review licensing ↓</strong></a>
        </div>
      </section>

      <MontanaSceneBand scene="courthouse" />

      <section className="content-section licensing-resource" id="licensing">
        <div className="content-heading"><h2>Trust starts with information you can verify</h2></div>
        <p className="section-lede">Montana regulates surety bail bond producers through the state insurance authority. Ask for current credentials and understand the written agreement before signing.</p>
        <figure className="resource-court-photo">
          <img
            src="/images/real/city-of-billings-montana-courtroom.jpeg"
            alt="Interior of the City of Billings courtroom viewed from the public seating area."
            title="City of Billings courtroom"
            width="1152"
            height="1536"
            loading="lazy"
            decoding="async"
          />
          <figcaption>City of Billings courtroom · Billings, Montana</figcaption>
        </figure>
        <div className="license-grid">
          <div className="license-card"><span>01</span><h3>Request current license details</h3><p>Ask for the producer&apos;s name and license information, along with the agency or business entity information that applies to the bond.</p></div>
          <div className="license-card"><span>02</span><h3>Verify with Montana CSI</h3><p>The Montana Commissioner of Securities and Insurance provides official producer licensing and lookup resources.</p><a href="https://csimt.gov/insurance/licensing/" target="_blank" rel="noreferrer">Open Montana CSI licensing ↗</a></div>
          <div className="license-card"><span>03</span><h3>Read the entire agreement</h3><p>Confirm the fee, collateral, payment schedule, signer obligations, defendant responsibilities, and conditions affecting collateral return.</p></div>
        </div>
        <div className="resource-contact-cta" aria-labelledby="resource-contact-title">
          <div className="resource-contact-copy">
            <span className="section-label">Contact Joel now</span>
            <h3 id="resource-contact-title">Need clarity? Northwest Bail Bonds is one call away</h3>
            <p>Joel and his team are ready to help with the bond process, paperwork, county resources, and the next practical step.</p>
            <a href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
          </div>
          <HelpRequestForm />
        </div>
        <div className="licensing-boundaries">
          <h3>Clear boundaries protect families</h3>
          <ul>
            <li>A bail bond producer does not provide legal advice.</li>
            <li>Release timing depends on the court and detention facility.</li>
            <li>A bond does not determine the outcome of a criminal case.</li>
            <li>Case-specific coverage and terms require a direct conversation.</li>
          </ul>
        </div>
      </section>

      <section className="attorney-section" id="attorney">
        <div>
          <h2>Legal questions belong with an attorney</h2>
          <p>A bondsman can explain the bond agreement. Questions about charges, defenses, plea decisions, or court strategy should go to a qualified Montana lawyer.</p>
        </div>
        <div className="attorney-options">
          <article>
            <h3>What Northwest can explain</h3>
            <p>Northwest can explain the bond agreement, payment terms, collateral, signer responsibilities, and the release process. Criminal case strategy belongs with an attorney.</p>
          </article>
          <article>
            <h3>Need an independent place to start?</h3>
            <p>The State Bar of Montana provides public information about hiring an attorney and its lawyer referral resources.</p>
            <a href={MONTANA_LAWYER_REFERRAL_URL} target="_blank" rel="noreferrer">State Bar attorney resources ↗</a>
          </article>
        </div>
      </section>

      <section className="official-section" id="official">
        <div className="content-heading"><h2>Go straight to the public authority</h2></div>
        <div className="official-links">
          <a href="https://csimt.gov/insurance/licensing/" target="_blank" rel="noreferrer"><span>Insurance licensing</span><strong>Montana Commissioner of Securities and Insurance</strong><small>Producer licensing, lookup, and insurance resources ↗</small></a>
          <a href="https://courts.mt.gov/" target="_blank" rel="noreferrer"><span>Court information</span><strong>Montana Judicial Branch</strong><small>Court locator, public access, self-help, and official court resources ↗</small></a>
          <a href="https://msl.mt.gov/geoinfo/msdi/administrative_boundaries/" target="_blank" rel="noreferrer"><span>County reference</span><strong>Montana State Library</strong><small>Official administrative boundaries and 56-county data ↗</small></a>
        </div>
      </section>
      <section className="facts-section" aria-labelledby="montana-facts-title">
        <div className="facts-heading">
          <h2 id="montana-facts-title">Montana facts worth knowing</h2>
          <p>Public information from Montana law, the Montana Judicial Branch, and state geographic records.</p>
        </div>
        <div className="facts-grid">
          <article>
            <strong>56</strong>
            <h3>Montana counties</h3>
            <p>Northwest serves statewide from its Billings home base. Availability depends on the Bond, court, facility, and circumstances.</p>
            <a href="https://msl.mt.gov/geoinfo/msdi/administrative_boundaries/" target="_blank" rel="noreferrer">Montana State Library source ↗</a>
          </article>
          <article>
            <strong>Judge</strong>
            <h3>Decides release conditions</h3>
            <p>A pretrial assessment may inform the court, but it does not replace a judge&apos;s discretion.</p>
            <a href="https://courts.mt.gov/cao/pretrial/" target="_blank" rel="noreferrer">Montana Judicial Branch source ↗</a>
          </article>
          <article>
            <strong>Written</strong>
            <h3>Fee disclosure</h3>
            <p>Montana law requires certain fees or interest beyond the minimum premium to be disclosed in the surety bail bond contract.</p>
            <a href="https://mca.legmt.gov/bills/mca/title_0330/chapter_0260/part_0010/section_0090/0330-0260-0010-0090.html" target="_blank" rel="noreferrer">MCA 33-26-109 ↗</a>
          </article>
          <article>
            <strong>Before trial</strong>
            <h3>Release has legal standards</h3>
            <p>Montana law recognizes a presumptive right to release on bail before conviction, subject to stated exceptions and reasonable safety conditions.</p>
            <a href="https://courts.mt.gov/external/SOR/extraordinary/a3a" target="_blank" rel="noreferrer">Montana Judicial Branch source ↗</a>
          </article>
        </div>
        <p className="legal-note">General information only. A court decides release conditions; Northwest does not provide legal advice or promise a particular result.</p>
      </section>
      <section className="faq-section resource-faq" id="faq">
        <div className="heading-block"><h2>Straight answers</h2></div>
        <div className="faq-list">{FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>
      <InquirySection
        title="Have a case-specific question?"
        intro="Send the basic details you have. Northwest will follow up by phone or email."
        id="resources-request-help"
      />
      <SiteFooter />
    </main>
  );
}
