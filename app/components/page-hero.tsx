/* eslint-disable @next/next/no-img-element */
"use client";

import { PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";
import { HeroReel } from "@/app/components/hero-reel";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  variant: "about" | "process" | "coverage" | "resources" | "contact" | "privacy";
  cta?: boolean;
  visualSrc?: string;
  visualType?: "reel" | "image";
  visualPoster?: string;
  visualAlt?: string;
  visualCaption?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  variant,
  cta = true,
  visualSrc,
  visualType = "image",
  visualPoster,
  visualAlt = "",
  visualCaption = "",
}: PageHeroProps) {
  const hasVisual = Boolean(visualSrc);
  return (
    <section className={`page-hero page-hero-${variant}${hasVisual ? " page-hero-with-visual" : ""}`}>
      <div className="page-hero-copy">
        <span className="section-label light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        {cta && (
          <div className="hero-actions">
            <a className="button button-primary" href={`tel:${PHONE_LINK}`}>Call now <span>{PHONE_DISPLAY}</span></a>
            <a className="button button-secondary" href="/contact">Contact Northwest</a>
          </div>
        )}
      </div>
      {hasVisual && (
        <figure className="page-hero-visual">
          {visualType === "reel" ? (
            <HeroReel
              src={visualSrc!}
              poster={visualPoster ?? "/images/marketing/northwest-bail-bonds-2am-call-poster.jpg"}
              label={visualAlt || "Northwest Bail Bonds 2 a.m. call: from arrest to release on your phone"}
            />
          ) : (
            <img
              src={visualSrc}
              alt={visualAlt}
              title={visualCaption}
              width="1008"
              height="1792"
              loading="lazy"
              decoding="async"
            />
          )}
          {visualCaption && <figcaption>{visualCaption}</figcaption>}
        </figure>
      )}
    </section>
  );
}
