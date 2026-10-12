import type { Metadata } from "next";
import { SITE_NAME } from "@/app/lib/site";

const brandImage = {
  url: "/images/marketing/northwest-bail-bonds-brand-card.jpg",
  width: 1792,
  height: 1008,
  alt: "Northwest Bail Bonds: 24/7 Montana bail bonds. Call (406) 601-1225.",
};

/** Keep route identity and shared artwork consistent in search and social previews. */
export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [brandImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brandImage.url],
    },
  };
}
