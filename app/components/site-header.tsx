/* Standard anchors intentionally avoid a Vinext RSC navigation failure in the portable build. */
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { PHONE_DISPLAY, PHONE_LINK, SITE_NAME } from "@/app/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/about", label: "About" },
];

const resourceLinks = [
  { href: "/resources#guides", label: "Guides" },
  { href: "/resources#licensing", label: "Licensing" },
  { href: "/resources#attorney", label: "Legal help" },
  { href: "/resources#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label={`${SITE_NAME} home`}>
        <img
          className="brand-logo"
          src="/northwest-logo-transparent.png"
          alt=""
          width="779"
          height="491"
        />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        <div className="nav-group">
          <a className="nav-group-link" href="/resources">Resources <span aria-hidden="true">⌄</span></a>
          <div className="nav-dropdown">
            {resourceLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </div>
        </div>
        <a href="/contact">Contact</a>
      </nav>
      <a className="header-call" href={`tel:${PHONE_LINK}`}>
        <span>24/7 direct line</span>
        <strong>{PHONE_DISPLAY}</strong>
      </a>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <details className="mobile-subnav">
            <summary>Resources</summary>
            {resourceLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </details>
          <a href="/contact">Contact</a>
        </nav>
      </details>
    </header>
  );
}
