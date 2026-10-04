import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { PHONE_DISPLAY } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "How to Bail Someone Out of Jail in Montana",
  description: "A direct Montana bail bond walkthrough: confirm the jail, verify the bond, understand the agreement, complete paperwork, post the bond, and wait for release processing.",
  alternates: { canonical: "/how-to-bail-someone-out" },
};

export default function HowToBailSomeoneOutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Montana Bail Bond Guide"
        title="How to bail someone out of jail in Montana"
        intro={"You need six decisions, not a lecture. Confirm the jail, verify the bond, understand the agreement, complete the paperwork, coordinate the bond, and let the facility process release. Call " + PHONE_DISPLAY + " if you want help with the first step."}
        variant="coverage"
      />

      <section className="content-section prose-page">
        <h2>The six-step process</h2>
        <ol className="check-list">
          <li><strong>Find the person.</strong> Confirm the detention facility using an official roster, sheriff page, or facility phone.</li>
          <li><strong>Verify the bond.</strong> Get the bond amount, court, case number, and any separate holds or cases.</li>
          <li><strong>Review the bail bond agreement.</strong> Ask about the fee, collateral if any, payment dates, refund rules if any, and every signer obligation.</li>
          <li><strong>Complete the documents.</strong> Eligible paperwork can often be signed remotely.</li>
          <li><strong>The bond is posted or coordinated.</strong> The exact path depends on the court, facility, time of day, and case.</li>
          <li><strong>The jail processes release.</strong> The detention facility controls the release queue and timing after the bond is accepted.</li>
        </ol>
      </section>

      <MontanaSceneBand scene="courthouse" />

      <section className="content-section prose-page">
        <h2>If you only know the jail name</h2>
        <p>Use the jail directory. The highest-value facility guides include official inmate lookup links, facility contacts, and the specific custody notes that matter before you call.</p>
        <p><a className="text-link" href="/jails">Open Montana jail guides <span>→</span></a></p>
      </section>

      <section className="content-section prose-page">
        <h2>If you are not in the same city</h2>
        <p>Do not drive first. Call first. Northwest can tell you whether the bond can begin with phone intake and electronic paperwork.</p>
        <p><a className="text-link" href="/digital-bail-bonds">How remote bail bond paperwork works <span>→</span></a></p>
      </section>

      <section className="content-section prose-page">
        <h2>What not to assume</h2>
        <ul>
          <li>The arresting county is not always the housing facility.</li>
          <li>A roster result can change after transfer, court, or release.</li>
          <li>Multiple cases can create multiple bond requirements.</li>
          <li>A bondsman cannot guarantee the jail's release time.</li>
          <li>Website information is not a substitute for case-specific legal advice.</li>
        </ul>
      </section>

      <InquirySection
        title="Ready to start?"
        intro={"Call " + PHONE_DISPLAY + " with the person's name and custody location if known."}
        id="how-to-bail-help"
      />
      <SiteFooter />
    </main>
  );
}
