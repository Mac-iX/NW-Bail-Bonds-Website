import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { PHONE_DISPLAY } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Montana Bail Bonds FAQ",
  description: "Straight answers to common Montana bail bond questions about cost, collateral, release timing, jail lookup, remote paperwork, court dates, and statewide service.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    title: "Getting started",
    items: [
      ["What information should I have when I call?", "The person's full legal name and the county or detention facility are enough to start. A booking number, bond amount, court, and case number help when available."],
      ["What if I do not know which jail they are in?", "Start with the county where the arrest happened, but do not assume that is the housing facility. Use the statewide county directory or call Northwest to help confirm the current location."],
      ["Can I call in the middle of the night?", "Yes. Northwest's direct line is answered 24 hours a day, including weekends and holidays."],
    ],
  },
  {
    title: "Money and paperwork",
    items: [
      ["How much does a bail bond cost in Montana?", "The exact fee and any collateral requirements depend on the bond and circumstances. Ask for the complete written terms before signing."],
      ["Will I need collateral?", "It depends on the bond and underwriting. If collateral is required, ask what is being pledged, when it can be returned, and what events could put it at risk."],
      ["Can I sign bail bond paperwork electronically?", "Often, yes. Eligible paperwork can frequently be handled by phone and electronic signature. The bond itself still has to be coordinated with the court or detention facility."],
    ],
  },
  {
    title: "Release and court",
    items: [
      ["How long does release take after a bond is posted?", "There is no responsible universal promise. Timing depends on the court, facility, staffing, booking volume, and other holds. The detention facility controls the final release queue."],
      ["What if there is more than one case or hold?", "Get the bond information for every case or hold. One bond does not necessarily clear every reason a person is being held."],
      ["Does a bail bondsman give legal advice?", "No. A bondsman can explain the bond agreement and process. Legal strategy, defenses, and case-specific legal advice should come from a qualified attorney."],
    ],
  },
  {
    title: "Montana coverage",
    items: [
      ["Does Northwest only serve Billings?", "No. Northwest is based in Billings and serves all 56 Montana counties. Availability for a specific bond can depend on the court, facility, bond, and underwriting."],
      ["Can I start if I live outside Montana?", "Often, yes. A family member outside Montana can call and begin the intake process. The bond still has to meet the requirements of the Montana court, facility, and surety process."],
      ["Where can I look up the jail?", "Use Northwest's Montana jail directory for the highest-priority facilities or the statewide service-area directory for county sheriff, detention, roster, and housing resources."],
    ],
  },
] as const;

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Montana Bail Bond Questions"
        title="Bail bond FAQ"
        intro={"Short answers to the questions families ask first. If the answer depends on the specific bond, call " + PHONE_DISPLAY + "."}
        variant="coverage"
      />
      {groups.map((group) => (
        <section className="faq-section" key={group.title}>
          <div className="heading-block"><h2>{group.title}</h2></div>
          <div className="faq-list">
            {group.items.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
      <section className="content-section prose-page">
        <h2>Useful next pages</h2>
        <p><a className="text-link" href="/how-to-bail-someone-out">How to bail someone out in Montana <span>→</span></a></p>
        <p><a className="text-link" href="/digital-bail-bonds">Digital bail bond paperwork <span>→</span></a></p>
        <p><a className="text-link" href="/jails">Montana jail-specific guides <span>→</span></a></p>
      </section>
      <InquirySection
        title="Still need a case-specific answer?"
        intro={"Call " + PHONE_DISPLAY + " or send the basic custody information you have."}
        id="faq-help"
      />
      <SiteFooter />
    </main>
  );
}
