/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  BASE_URL,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
} from "@/app/lib/site";

export const metadata: Metadata = {
  title: "About Northwest Bail Bonds",
  description: "Learn how Northwest Bail Bonds began in Billings, read Joel Graf’s founder story, and see how the company serves people across Montana.",
  alternates: { canonical: "/about" },
};

const aboutImageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Northwest Bail Bonds",
  url: `${BASE_URL}/about`,
  image: [
    {
      "@type": "ImageObject",
      name: "Northwest Bail Bonds field work in Montana",
      url: `${BASE_URL}/images/real/northwest-bail-bonds-field-agent-paperwork.jpeg`,
      width: 1155,
      height: 1536,
      caption: "Northwest Bail Bonds field work in Montana",
    },
    {
      "@type": "ImageObject",
      name: "Yellowstone County fugitive recovery badge",
      url: `${BASE_URL}/images/real/yellowstone-county-fugitive-recovery-badge.jpeg`,
      width: 710,
      height: 920,
      caption: "Yellowstone County fugitive recovery badge",
    },
    {
      "@type": "ImageObject",
      name: "Joel Graf with a Montana health care professional",
      url: `${BASE_URL}/images/real/joel-graf-community-healthcare-visit.jpeg`,
      width: 710,
      height: 1000,
      caption: "Health care and community have long been part of Joel Graf's path",
    },
    {
      "@type": "ImageObject",
      name: "Joel Graf praying with a man",
      url: `${BASE_URL}/images/real/joel-graf-praying-with-man.jpeg`,
      width: 710,
      height: 920,
      caption: "Joel Graf shares a moment of prayer and support",
    },
    {
      "@type": "ImageObject",
      name: "Northwest Bail Bonds fugitive recovery team",
      url: `${BASE_URL}/images/real/northwest-bail-bonds-fugitive-recovery-team.jpeg`,
      width: 1536,
      height: 864,
      caption: "Northwest Bail Bonds fugitive recovery field team in Montana",
    },
  ],
};

export default function AboutPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutImageSchema) }} />
      <SiteHeader />
      <PageHero
        eyebrow="About Northwest Bail Bonds"
        title="About Northwest Bail Bonds"
        intro="Northwest began with a second chance. Joel’s path through health care, work in Crow, and law enforcement in Hardin shaped the company we are building today."
        variant="about"
      />
      <section className="content-section joel-story-section" id="joel-story">
        <aside className="joel-story-mark">
          <figure className="joel-field-photo">
            <img
              src="/images/real/northwest-bail-bonds-field-agent-paperwork.jpeg"
              alt="A fugitive recovery agent in a black vest reviewing paperwork beside an official vehicle outside a Montana facility."
              title="Northwest Bail Bonds field work in Montana"
              width="1155"
              height="1536"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Northwest Bail Bonds field work in Montana</figcaption>
          </figure>
          <div className="joel-story-cta">
            <span>Statewide support</span>
            <strong>Joel and his team answer 24/7</strong>
            <p>Call Northwest for direct help with a Montana bail bond or find the county and jail resource you need.</p>
            <div className="joel-story-cta-actions">
              <a href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a>
              <a href="/service-areas">View service areas</a>
            </div>
          </div>
          <figure className="joel-badge-detail">
            <img
              src="/images/real/yellowstone-county-fugitive-recovery-badge.jpeg"
              alt="Close-up of a Yellowstone County fugitive recovery badge."
              title="Yellowstone County fugitive recovery badge"
              width="710"
              height="920"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Yellowstone County fugitive recovery badge</figcaption>
          </figure>
        </aside>
        <article className="prose joel-story-copy">
          <h2>Joel Graf — A Bond Beyond Bail</h2>
          <p>Joel Graf&apos;s story began in a small town with simple streets and complex struggles. The youngest of eight in a household scarred by trauma, Joel grew up in the shadows of domestic violence. Amid the shouting, fear, and brokenness, one image seared itself into his young mind: the flashing red and blue lights of law enforcement. To most, they meant trouble. To Joel, they meant someone had come to help.</p>
          <p>As a kid, Joel was a firebrand—wrestling hard, living wild, and pushing every limit, including waterskiing behind a horse. But the thrill-seeking caught up with him the day a drug task force agent tracked him down and asked, “Are you Joel Graf?” In that moment, he thought his life was over.</p>
          <p className="story-pullquote">But God had other plans.</p>
          <p>Another officer who knew his family offered him something rare: a second chance. A ride-along. During that drive, the officer said something Joel never forgot: “God has more for you.” That one sentence lit a fire that would change everything. Joel didn&apos;t just want to run from his past—he wanted to redeem it by serving others.</p>
          <p>Wrestling carried him to the state championships, but life had more in store. He pursued a career in healthcare, where he learned to listen, serve, and love people through their pain. One day, a client who had been hardened by life looked Joel in the eyes and said, “I want to give my life to the Lord. Will you help me?” In that moment, Joel knew: when you plant a seed in love, it grows.</p>
          <figure className="story-photo story-photo-portrait story-photo-healthcare">
            <img
              src="/images/real/joel-graf-community-healthcare-visit.jpeg"
              alt="Joel Graf shaking hands with a Montana health care professional."
              title="Joel Graf with a Montana health care professional"
              width="710"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Joel Graf with a Montana health care professional</figcaption>
          </figure>
          <p>His path wound from roofing houses in Crow, to wearing a badge as a cop in Hardin. Yet the justice system still felt sterile and transactional—especially in bail bonds. People were hurting. No one was helping. Joel couldn&apos;t ignore it. That&apos;s when his calling became clear.</p>
          <figure className="story-photo story-photo-field-team">
            <img
              src="/images/real/northwest-bail-bonds-fugitive-recovery-team.jpeg"
              alt="Two fugitive recovery agents wearing field vests during work in Montana."
              title="Northwest Bail Bonds fugitive recovery field team"
              width="1536"
              height="864"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Northwest Bail Bonds fugitive recovery field team in Montana</figcaption>
          </figure>
          <p className="story-pullquote">He launched his own bail bond company—not to post bail, but to post hope.</p>
          <p>Joel doesn&apos;t just drop money and disappear. He gives people rides to court. He takes them home from jail. He helps them find jobs, invites them to Bible studies, and reminds them of a truth many have forgotten: they matter.</p>
          <p className="story-pullquote">To Joel, this is not business—it&apos;s ministry.</p>
          <figure className="story-photo story-photo-portrait story-photo-prayer">
            <img
              src="/images/real/joel-graf-praying-with-man.jpeg"
              alt="Joel Graf holding a man's hands in prayer outdoors at night."
              title="Joel Graf praying with a man"
              width="710"
              height="920"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Joel Graf sharing a moment of prayer and support</figcaption>
          </figure>
          <p>In 2024, his mission deepened. The mother of his child died from a fentanyl overdose. Just days later, while bounty hunting, Joel found a young couple—trapped in the same addiction that had just torn his world apart. He could&apos;ve walked away. But he didn&apos;t. Instead, he leaned in with love. Because now, it wasn&apos;t just about helping others. It was personal.</p>
          <p>Today, Joel gives all glory to God. “It&apos;s not my money, it&apos;s God&apos;s,” he says—and he means it. He invests in youth programs in Crow, supports police K-9 units, and helps fund orphanages in Kenya. From Montana to East Africa, Joel is building bridges, planting seeds, and rewriting stories.</p>
          <p className="story-ending">He may come from a small town.<br /><strong>But his mission? Eternal.</strong></p>
        </article>
      </section>
      <MontanaSceneBand scene="city" />
      <section className="about-impact-section" id="beyond-the-bond">
        <header>
          <h2>A bond gets someone out—what happens next matters, too</h2>
          <p>When circumstances allow, Northwest helps people get home, make court, find work, and take the next step forward.</p>
        </header>
        <div className="about-impact-grid">
          <article>
            <h3>Practical help after release</h3>
            <p>Northwest has provided rides home from jail and transportation to court. Sometimes the most useful help is getting someone where they need to be.</p>
          </article>
          <article>
            <h3>Giving back to Crow</h3>
            <p>Joel&apos;s years working in Crow formed a lasting connection to the community. Northwest supports youth programs and puts resources back into a place that helped shape the company.</p>
          </article>
          <article>
            <h3>Supporting work beyond bail</h3>
            <p>Part of what the business earns supports police K-9 units and orphanages in Kenya. These are community commitments, separate from Northwest&apos;s bail bond services.</p>
          </article>
        </div>
        <div className="about-impact-links">
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">See Northwest in the community <span>↗</span></a>
          <a href="/resources#licensing">Licensing, legal resources, and disclosures <span>→</span></a>
        </div>
      </section>
      <InquirySection
        title="Need help with a bond?"
        intro="Tell us who is in custody and where. If that is all you know, start there."
        id="about-request-help"
      />
      <SiteFooter />
    </main>
  );
}
