import type { Metadata } from "next";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Website Privacy Notice",
  description: "Read the Northwest Bail Bonds website privacy notice, including how click-to-call and email-request features work.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="Website privacy notice"
        title="Website privacy policy"
        intro="This notice explains how the current website handles contact actions and the practical limits of online privacy."
        variant="privacy"
        cta={false}
      />
      <section className="prose-page">
        <p className="updated-date">Last updated: August 7, 2026</p>
        <h2>Information you choose to provide</h2>
        <p>The website lets you enter basic details—such as your name, callback number, the name of the person in custody, location, and bond amount—to prepare an email. In the current version, that information is assembled in your device&apos;s email application so you can review it before sending. The website does not submit that form to a website database.</p>
        <h2>Calls and email</h2>
        <p>When you tap a phone or email link, your device, telephone carrier, and email application may process the action under their own terms and privacy practices. Standard calling or data charges may apply.</p>
        <h2>Hosting and technical information</h2>
        <p>Like most websites, the hosting provider may process ordinary technical information needed to deliver and secure the site, such as IP address, browser type, request time, and error or security logs. Future analytics or form integrations should be added to this notice before launch.</p>
        <h2>Do not send highly sensitive information</h2>
        <p>Do not send Social Security numbers, full financial account details, passwords, authentication codes, or other highly sensitive information through website fields, ordinary email, or social media.</p>
        <h2>External links</h2>
        <p>The website links to official Montana resources and social platforms. Those third parties control their own websites and privacy practices.</p>
        <h2>Contact</h2>
        <p>Questions about this notice can be directed to Northwest Bail Bonds at <a href="tel:+14066011225">(406) 601-1225</a> or <a href="mailto:northwestbailbond@gmail.com">northwestbailbond@gmail.com</a>.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
