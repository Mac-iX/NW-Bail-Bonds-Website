import { createPageMetadata } from "@/app/lib/metadata";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { BASE_URL, EMAIL_ADDRESS, PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

export const metadata = createPageMetadata(
  "Montana Bail Bond Licensing & Producer Verification",
  "Montana surety bail bond producer licensing information, verification steps, and what to ask before you sign a bail bond agreement.",
  "/licensing",
);

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": BASE_URL + "/licensing",
  url: BASE_URL + "/licensing",
  name: "Montana Bail Bond Licensing & Producer Verification",
  description: "Know which credentials to request, where to verify them, and what to read before signing a bail bond agreement in Montana.",
  provider: { "@id": BASE_URL + "/#organization" },
};

export default function LicensingPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="Licensing · verification · disclosures"
        title="Know who you&apos;re dealing with before you sign"
        intro="Montana regulates surety bail bond producers through the state insurance authority. Ask for current credentials and understand the written agreement before signing."
        variant="coverage"
      />

      <MontanaSceneBand scene="courthouse" />

      <section className="content-section prose-page" aria-labelledby="licensing-intro-title">
        <h2 id="licensing-intro-title">Montana bail bond producer licensing</h2>
        <p>
          Montana regulates surety bail bond producers through the Commissioner
          of Securities and Insurance. You can ask for current license details,
          review every obligation, and verify a producer before signing.
        </p>
        <p>
          Northwest answers the direct line 24 hours a day at <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a> and
          can explain the agreement, fee, collateral if any, and signer responsibilities before anything is signed.
        </p>
      </section>

      <section className="content-section prose-page">
        <h2>Three things to verify before you sign</h2>
        <ol className="check-list">
          <li><strong>Request current producer and agency license information.</strong> Ask for the producer&apos;s name and license information, along with the agency or business entity information that applies to the bond.</li>
          <li><strong>Verify with Montana CSI.</strong> The Montana Commissioner of Securities and Insurance provides official producer licensing and lookup resources. <a href="https://csimt.gov/insurance/licensing/" target="_blank" rel="noreferrer">Open Montana CSI licensing ↗</a></li>
          <li><strong>Read the entire agreement.</strong> Confirm the fee, collateral, payment schedule, signer obligations, defendant responsibilities, and conditions affecting collateral return.</li>
        </ol>
      </section>

      <section className="content-section prose-page">
        <h2>Clear boundaries protect families</h2>
        <ul className="check-list">
          <li>A bail bond producer does not provide legal advice.</li>
          <li>Release timing depends on the court and detention facility.</li>
          <li>A bond does not determine the outcome of a criminal case.</li>
          <li>Case-specific coverage and terms require a direct conversation.</li>
        </ul>
      </section>

      <section className="help-section" id="contact">
        <div className="help-copy">
          <h2>Have a question about the agreement?</h2>
          <p>Call Northwest before you sign. We explain the fee, collateral if any, and signer responsibilities so you can make an informed decision.</p>
          <div className="direct-line">
            <span>Direct line</span>
            <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            <small>Answered 24 hours a day</small>
          </div>
        </div>
        <div className="contact-choice-card">
          <a href={`mailto:${EMAIL_ADDRESS}?subject=Montana%20Bail%20Bond%20licensing%20question`}><strong>Email Northwest</strong><span>Ask about a specific bond <span>→</span></span></a>
          <a href="/contact"><strong>Contact & reviews</strong><span>See every contact option →</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
