/* Standard anchors intentionally avoid a Vinext RSC navigation failure in the portable build. */
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { EMAIL_ADDRESS, FACEBOOK_URL, PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          className="footer-logo"
          src="/northwest-logo-transparent.png"
          alt="Northwest Bail Bonds"
          width="779"
          height="491"
          loading="lazy"
        />
        <small>Billings based · Montana statewide</small>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/service-areas">Service areas</a>
        <a href="/about">About</a>
        <a href="/resources">Resources</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook ↗</a>
      </nav>
      <div className="footer-contact">
        <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
        <a className="footer-email" href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>
        <span>Available 24 hours a day</span>
        <small>© {new Date().getFullYear()} Northwest Bail Bonds. All rights reserved.</small>
      </div>
    </footer>
  );
}
