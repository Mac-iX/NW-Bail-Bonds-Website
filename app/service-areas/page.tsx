/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { InquirySection } from "@/app/components/inquiry-section";
import { MontanaSceneBand } from "@/app/components/montana-scene-band";
import { MontanaCoverage } from "@/app/components/montana-coverage";
import { PageHero } from "@/app/components/page-hero";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { BASE_URL } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Montana Bail Bond Service Areas",
  description: "Northwest Bail Bonds serves Billings, Yellowstone County, and all 56 Montana counties. Search your county and call for 24-hour statewide Bail Bond help.",
  alternates: { canonical: "/service-areas" },
};

const regions = [
  {
    title: "Billings & South Central",
    imageTitle: "Billings & South Central Montana Service Area",
    landmark: "Billings Rimrocks and the Yellowstone River",
    image: "/images/regions/northwest-bail-bonds-billings-rimrocks.png",
    width: 1536,
    height: 1024,
    alt: "Billings Rimrocks above the Yellowstone River, representing Northwest Bail Bonds' Billings and South Central Montana service area.",
    caption: "Northwest Bail Bonds serves Yellowstone, Carbon, Stillwater, Big Horn, Musselshell, Golden Valley, Wheatland, Sweet Grass, and Treasure counties.",
  },
  {
    title: "Bozeman, Butte & Southwest",
    imageTitle: "Bozeman, Butte & Southwest Montana Service Area",
    landmark: "Historic Butte mining headframe",
    image: "/images/regions/northwest-bail-bonds-butte-mining-headframe.png",
    width: 1536,
    height: 1024,
    alt: "Historic Butte mine headframe set against southwest Montana mountains, representing Northwest Bail Bonds' Bozeman, Butte, and Southwest Montana service area.",
    caption: "Northwest Bail Bonds serves Gallatin, Park, Madison, Beaverhead, Silver Bow, Deer Lodge, Granite, Jefferson, and Broadwater counties.",
  },
  {
    title: "Helena & Central Montana",
    imageTitle: "Helena & Central Montana Service Area",
    landmark: "Montana State Capitol, Helena",
    image: "/images/regions/northwest-bail-bonds-helena-montana-state-capitol.png",
    width: 1254,
    height: 1254,
    alt: "Montana State Capitol in Helena, representing Northwest Bail Bonds' Helena and Central Montana service area.",
    caption: "Northwest Bail Bonds serves Lewis and Clark, Cascade, Meagher, Judith Basin, Fergus, Petroleum, Teton, and Chouteau counties.",
  },
  {
    title: "Missoula, Kalispell & West",
    imageTitle: "Missoula, Kalispell & Western Montana Service Area",
    landmark: "Wild Goose Island, Glacier National Park",
    image: "/images/regions/northwest-bail-bonds-glacier-wild-goose-island.png",
    width: 1254,
    height: 1254,
    alt: "Wild Goose Island on Saint Mary Lake in Glacier National Park, representing Northwest Bail Bonds' Missoula, Kalispell, and Western Montana service area.",
    caption: "Northwest Bail Bonds serves Missoula, Flathead, Ravalli, Lake, Lincoln, Sanders, Mineral, Powell, and Glacier counties.",
  },
  {
    title: "Miles City & Eastern Montana",
    imageTitle: "Miles City & Eastern Montana Service Area",
    landmark: "Makoshika State Park badlands near Glendive",
    image: "/images/regions/northwest-bail-bonds-makoshika-badlands.png",
    width: 1536,
    height: 1024,
    alt: "Layered badlands and hoodoos in Makoshika State Park, representing Northwest Bail Bonds' Miles City and Eastern Montana service area.",
    caption: "Northwest Bail Bonds serves Custer, Rosebud, Powder River, Carter, Fallon, Prairie, Dawson, Wibaux, and Richland counties.",
  },
  {
    title: "Hi-Line & Northeast",
    imageTitle: "Hi-Line & Northeast Montana Service Area",
    landmark: "Fort Peck Dam and reservoir",
    image: "/images/regions/northwest-bail-bonds-fort-peck-dam.png",
    width: 1254,
    height: 1254,
    alt: "Fort Peck Dam and reservoir in northeastern Montana, representing Northwest Bail Bonds' Hi-Line and Northeast Montana service area.",
    caption: "Northwest Bail Bonds serves Hill, Blaine, Liberty, Toole, Pondera, Phillips, Valley, Daniels, Sheridan, Roosevelt, McCone, and Garfield counties.",
  },
];

const serviceAreaSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Northwest Bail Bonds Montana Service Areas",
  url: `${BASE_URL}/service-areas`,
  description: "Six regional views of Northwest Bail Bonds' statewide service across all 56 Montana counties.",
  hasPart: regions.map((region) => ({
    "@type": "WebPageElement",
    name: region.title,
    description: region.caption,
    image: {
      "@type": "ImageObject",
      name: region.imageTitle,
      url: `${BASE_URL}${region.image}`,
      width: region.width,
      height: region.height,
      caption: region.caption,
    },
  })),
};

export default function ServiceAreasPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <SiteHeader />
      <PageHero
        eyebrow="All 56 Montana counties"
        title="Serving all 56 Montana counties."
        intro="Northwest Bail Bonds is based in Billings and works statewide. Search for the county below and select its actual boundary on the map."
        variant="coverage"
      />
      <MontanaCoverage />
      <MontanaSceneBand scene="river" />
      <section className="content-section region-section">
        <div className="content-heading">
          <h2>Montana service regions.</h2>
          <p>Each landmark marks a part of the state Northwest serves. Use the map above for the county, facility, and contact path you need.</p>
        </div>
        <div className="region-landmarks">
          {regions.map((region) => (
            <article className="region-landmark" key={region.title}>
              <figure className="region-landmark-art">
                <img
                  src={region.image}
                  alt={region.alt}
                  title={region.imageTitle}
                  width={region.width}
                  height={region.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{region.landmark}</figcaption>
              </figure>
              <div className="region-landmark-copy">
                <h3>{region.title}</h3>
                <p>{region.caption}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="legal-note">Coverage availability can depend on the bond, court, facility, underwriting, and circumstances. Call for a case-specific answer.</p>
      </section>
      <InquirySection
        title="Ask about a person or county."
        intro="Share the person’s name and the county or facility if you know it. Northwest can confirm the next step."
        id="service-area-request-help"
      />
      <SiteFooter />
    </main>
  );
}
