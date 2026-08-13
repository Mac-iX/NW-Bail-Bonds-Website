import { PHONE_DISPLAY, PHONE_LINK } from "@/app/lib/site";

export function PageHero({
  eyebrow,
  title,
  intro,
  variant,
  cta = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  variant: "about" | "process" | "coverage" | "resources" | "contact" | "privacy";
  cta?: boolean;
}) {
  return (
    <section className={`page-hero page-hero-${variant}`}>
      <div>
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
    </section>
  );
}
