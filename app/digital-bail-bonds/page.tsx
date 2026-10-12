/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element, react/no-unescaped-entities */
import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { PHONE_DISPLAY } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Digital Bail Bonds in Montana | Remote Paperwork 24/7",
  description: "Start a Montana bail bond remotely by phone and electronic paperwork when eligible. Learn what digital bail bonds can and cannot do, then call Northwest Bail Bonds 24/7.",
  alternates: { canonical: "/digital-bail-bonds" },
};

const faqs = [
  {
    question: "Can a Montana bail bond be done completely online?",
    answer: "The intake and eligible paperwork can often be handled remotely, but the bond itself still has to be coordinated with the court or detention facility. Digital paperwork does not make the jail release process instant.",
  },
  {
    question: "Do I need to drive to the jail to start?",
    answer: "Usually not. Call first. Northwest can tell you what information is needed and whether your physical presence is necessary for the specific bond.",
  },
  {
    question: "What do I need for electronic paperwork?",
    answer: "A phone or computer, reliable contact information, a government-issued photo ID when required, and the ability to review and sign the agreement. Do not send sensitive financial or identity information through unsecured messages.",
  },
  {
    question: "Can I start from another state?",
    answer: "Often, yes. Families outside Montana can call and begin the intake process remotely. The bond still has to meet the requirements of the Montana court, facility, and surety process.",
  },
];

export default function DigitalBailBondsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Remote Bail Bond Paperwork · Montana"
        title="Digital bail bonds without unnecessary driving"
        intro={"Start by phone. Review the terms. Sign eligible paperwork electronically. Northwest coordinates the bond with the court or detention facility. Call " + PHONE_DISPLAY + " any hour."}
        variant="coverage"
        visualSrc="/videos/northwest-bail-bonds-2am-call.mp4"
        visualType="reel"
        visualAlt="Northwest Bail Bonds 2 a.m. call: from arrest to release on your phone"
        visualCaption="The 2 a.m. call: how a bond gets posted from your phone"
      />

      <section className="content-section prose-page">
        <h2>What “digital bail bonds” actually means</h2>
        <p>Digital does not mean instant release and it does not mean the jail disappears from the process. It means the customer side can often move faster: phone intake, document review, electronic signatures, and status updates without making a family drive across Montana just to start.</p>
      </section>

      <section className="content-section prose-page" aria-labelledby="digital-phone-title">
        <h2 id="digital-phone-title">The whole process starts with the phone you already have</h2>
        <p>Answer the call, give the name and the county, review the agreement, and sign eligible paperwork electronically. Northwest coordinates the bond with the court or detention facility while you stay where you are.</p>
        <figure className="phone-asset-wide">
          <img
            src="/images/marketing/northwest-bail-bonds-answer-call.jpg"
            alt="A smartphone showing an incoming Northwest Bail Bonds call with the 24/7 number (406) 601-1225 and an Answer Call button."
            title="Answer the call: Northwest Bail Bonds 24/7"
            width={1792}
            height={1008}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Answer the call · Northwest Bail Bonds, any hour</figcaption>
        </figure>
        <div className="phone-asset-pair">
          <figure>
            <img
              src="/images/marketing/northwest-bail-bonds-digital-process.jpg"
              alt="A phone screen showing the four digital bail bond steps: the jail alert, calling Northwest 24/7, posting bond from your phone with an e-signature, and a confirmed release time."
              title="Digital bail bond steps handled from your phone"
              width={1008}
              height={1792}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Four steps · handled from your phone</figcaption>
          </figure>
          <figure>
            <img
              src="/images/marketing/northwest-bail-bonds-esignature.jpg"
              alt="A phone screen showing a secure bail bond application with full name, phone number, and case or booking ID fields above an e-sign and submit button."
              title="e-Signature bail bond paperwork from your phone"
              width={1008}
              height={1792}
              loading="lazy"
              decoding="async"
            />
            <figcaption>e-Sign the eligible paperwork</figcaption>
          </figure>
        </div>
        <p>Start with one piece of information. Northwest confirms the rest.</p>
      </section>

      <MontanaSceneBand scene="city" />

      <section className="content-section prose-page">
        <h2>How to start a bail bond remotely</h2>
        <ol className="check-list">
          <li><strong>Call Northwest.</strong> Give the person's full name, county or jail, and bond amount if you know it.</li>
          <li><strong>Confirm custody and bond status.</strong> Use the official roster or facility contact when available.</li>
          <li><strong>Review the agreement.</strong> Ask about the fee, collateral if any, payment timing, and signer responsibilities.</li>
          <li><strong>Complete eligible documents electronically.</strong> Read before signing and keep a copy of the agreement.</li>
          <li><strong>Northwest coordinates the bond.</strong> The actual posting path depends on the court, facility, and time of day.</li>
          <li><strong>Wait for release processing.</strong> The detention facility controls the release queue after the bond is accepted.</li>
        </ol>
      </section>

      <section className="content-section prose-page">
        <h2>What to have ready</h2>
        <ul>
          <li>Person's full legal name</li>
          <li>County or detention facility</li>
          <li>Booking number if known</li>
          <li>Bond amount and court if known</li>
          <li>Your callback number</li>
          <li>Government-issued photo ID when required</li>
        </ul>
        <p>You can still call if you are missing information. The point is to start the verification process, not to make you solve the whole case before anyone helps.</p>
      </section>

      <section className="content-section prose-page">
        <h2>Find the jail before you start</h2>
        <p><a className="text-link" href="/jails">Open Montana jail-specific guides <span>→</span></a></p>
        <p><a className="text-link" href="/service-areas">Search all 56 Montana counties <span>→</span></a></p>
      </section>

      <section className="faq-section" id="faq">
        <div className="heading-block"><h2>Digital bail bond questions</h2></div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <InquirySection
        title="Start the bond from where you are"
        intro={"Call " + PHONE_DISPLAY + " or send the basic custody information you have."}
        id="digital-bail-help"
      />
      <SiteFooter />
    </main>
  );
}
