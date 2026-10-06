/* eslint-disable @next/next/no-html-link-for-pages, react/no-unescaped-entities */
import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { PHONE_DISPLAY } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "How to Bail Someone Out of Jail in Montana",
  description:
    "A plain-terms Montana bail walkthrough: bail vs. bond, what it costs, the six steps to get someone released, what not to assume, and the questions people actually ask.",
  alternates: { canonical: "/how-to-bail-someone-out" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to bail someone out of jail in Montana",
  description:
    "The six steps to post a bail bond in Montana, from confirming the facility to release processing.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Find the person", text: "Confirm which facility is holding them using the official jail roster or by calling the facility." },
    { "@type": "HowToStep", position: 2, name: "Verify the bond", text: "Get the bond amount, court, case number, and ask about any holds or additional cases." },
    { "@type": "HowToStep", position: 3, name: "Review the agreement", text: "Understand the fee, collateral if any, payment terms, and every signer's obligations." },
    { "@type": "HowToStep", position: 4, name: "Complete the paperwork", text: "Much of it can be handled by phone and electronic signature." },
    { "@type": "HowToStep", position: 5, name: "The bond is posted", text: "The exact path depends on the court, facility, and time of day." },
    { "@type": "HowToStep", position: 6, name: "The jail processes release", text: "The facility controls its own release queue and timing after the bond is accepted." },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: "How long does it take to get someone out?",
    a: "The paperwork with us can move in under an hour. The jail's release processing is out of our hands. Depending on the facility, staffing, and time of day, it can take a couple of hours to most of a day.",
  },
  {
    q: "Do I get the bond fee back?",
    a: "No. The fee pays for the bondsman's service and risk. It is earned when the bond is posted, regardless of how the case turns out.",
  },
  {
    q: "What happens if the person misses court?",
    a: "The court can forfeit the bond and issue a warrant, and the co-signer becomes responsible for the full bail amount. If someone is going to miss a date, call the bondsman before it happens. There are sometimes options that disappear afterward.",
  },
  {
    q: "Can I bail someone out if I live out of state?",
    a: "Yes. Phone intake and electronic paperwork handle most of it. You do not have to be in the same city, or even the same state.",
  },
  {
    q: "What do I need to have ready when I call?",
    a: "The person's full legal name and date of birth, where you think they are held, and the bond amount if you know it. If you do not know those things, call anyway. Finding them is part of the job.",
  },
  {
    q: "What is collateral and will I need it?",
    a: "Collateral is property that backs the bond on larger amounts, like a vehicle title. Many bonds do not require it. If yours does, you will know exactly what and why before you sign. It is returned when the case closes and the bond is exonerated.",
  },
  {
    q: "Do you offer payment plans on the fee?",
    a: "Ask when you call. Terms depend on the bond size and the situation, and everything is agreed in writing up front.",
  },
];

export default function HowToBailSomeoneOutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SiteHeader />
      <PageHero
        eyebrow="Montana Bail Bond Guide"
        title="How to bail someone out of jail in Montana"
        intro={
          "Someone you care about is sitting in a jail cell and you need answers fast. Here is the whole process in plain terms: what bail actually is, what it costs, the six steps to get it done, and the mistakes that slow people down. If you would rather have a person walk you through it, call " +
          PHONE_DISPLAY +
          " any time."
        }
        variant="coverage"
      />

      <section className="content-section prose-page">
        <h2>First, the two words everyone mixes up</h2>
        <p>
          Bail is the money a court sets to let someone out of jail while their case moves forward.
          It is a promise, backed by dollars, that the person will come back to court.
        </p>
        <p>
          A bail bond is what a bondsman provides when you cannot pay that full amount yourself. You
          pay the bondsman a fee, and the bondsman guarantees the full amount to the court.
        </p>
        <p>
          Montana has recognized the right to bail since before it was a state. Article II, Section
          21 of the Montana Constitution says all persons are bailable by sufficient sureties,
          except in capital cases where the proof is evident. In plain English: with rare
          exceptions, there is a legal way out while someone waits for their day in court.
        </p>
      </section>

      <section className="content-section prose-page">
        <h2>What it costs</h2>
        <p>
          In Montana, the standard bail bond fee is a percentage of the total bail amount, typically
          ten percent. On a $10,000 bail, that is a $1,000 fee. That fee is the bondsman's charge
          for taking on the risk, and it is not refundable, no matter how the case ends.
        </p>
        <p>
          Sometimes collateral comes up. That might be a vehicle title, property, or something of
          value that backs the bond on larger amounts. Not every bond needs it. Ask before you sign
          anything, and get a straight answer. Any collateral is returned when the case closes and
          the bond is exonerated, as long as the person appeared in court as required.
        </p>
      </section>

      <section className="content-section prose-page">
        <h2>The six-step process</h2>
        <ol className="check-list">
          <li>
            <strong>Find the person.</strong> Confirm which facility is actually holding them. The
            arresting county is not always where they are housed. Use the official jail roster or
            call the facility. Our{" "}
            <a className="text-link" href="/jails">
              Montana jail guides
            </a>{" "}
            list rosters and contacts for the major facilities.
          </li>
          <li>
            <strong>Verify the bond.</strong> Get the bond amount, the court, the case number, and
            ask about holds. More than one case can mean more than one bond.
          </li>
          <li>
            <strong>Review the agreement.</strong> Know the fee, whether collateral is involved,
            payment terms, and what every signer is responsible for. A co-signer is guaranteeing
            the person shows up to court. Take that seriously before signing.
          </li>
          <li>
            <strong>Complete the paperwork.</strong> Much of it can be handled by phone and
            electronic signature. You do not always have to be in the same city, or even the same
            state. Here is{" "}
            <a className="text-link" href="/digital-bail-bonds">
              how remote bail paperwork works
            </a>
            .
          </li>
          <li>
            <strong>The bond is posted.</strong> How that happens depends on the court, the
            facility, and the time of day. Nights, weekends, and holidays do not stop the process,
            but they can slow the paperwork on the jail's side.
          </li>
          <li>
            <strong>The jail processes the release.</strong> This is the part nobody can rush. The
            facility controls its own release queue. A bondsman gets the bond accepted. The jail
            decides when the door opens.
          </li>
        </ol>
      </section>

      <MontanaSceneBand scene="courthouse" />

      <section className="content-section prose-page">
        <h2>A quick word on Montana bail history</h2>
        <p>
          Bail in Montana runs older than the state itself. The right to bail was written into the
          1889 constitution at statehood, and for more than a century the industry worked on
          handshakes and sureties with very little oversight.
        </p>
        <p>
          That changed recently. Montana's own Commissioner of Securities and Insurance called the
          state the Wild West of bail bonds, and not as a compliment. Starting in 2022, bipartisan
          reforms put real rules in place: bondsmen must now be licensed surety insurance producers,
          operate under state oversight, and follow standardized procedures meant to protect the
          people signing the agreements.
        </p>
        <p>
          What that means for you: the person you call should be licensed, the paperwork should be
          clear, and you should never feel pressured into terms you do not understand. If a
          bondsman cannot tell you exactly what you are signing and why, hang up.
        </p>
      </section>

      <section className="content-section prose-page">
        <h2>What not to assume</h2>
        <ul>
          <li>The arresting county is not always the housing facility.</li>
          <li>A roster result can change after a transfer, court appearance, or release.</li>
          <li>Multiple cases can create multiple bond requirements.</li>
          <li>A bondsman cannot guarantee the jail's release time.</li>
          <li>Posting bail is not the end of the case. It is the beginning of showing up.</li>
          <li>Website information is not a substitute for legal advice about a specific case.</li>
        </ul>
      </section>

      <section className="content-section prose-page">
        <h2>Questions people actually ask</h2>
        {faqItems.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <p>
          More answers live on the{" "}
          <a className="text-link" href="/faq">
            Montana bail bonds FAQ
          </a>
          .
        </p>
      </section>

      <InquirySection
        title="Ready to start?"
        intro={
          "Call " +
          PHONE_DISPLAY +
          " with the person's name and where they are held, if you know it. If you do not, we will help you find out."
        }
        id="how-to-bail-help"
      />
      <SiteFooter />
    </main>
  );
}
