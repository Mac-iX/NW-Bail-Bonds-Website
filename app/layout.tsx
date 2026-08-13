import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "./globals.css";
import { BASE_URL, EMAIL_ADDRESS, SITE_NAME } from "@/app/lib/site";
import { UrgentContactPrompt } from "@/app/components/urgent-contact-prompt";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Northwest Bail Bondsman | 24/7 Montana Bail Bonds",
    template: "%s | Northwest Bail Bonds",
  },
  description:
    "A customer-service-first Bail Bond company based in Billings and serving all 56 Montana counties, 24 hours a day.",
  applicationName: SITE_NAME,
  keywords: [
    "Montana Bail Bonds",
    "Montana Bail Bondsman",
    "Billings Bail Bonds",
    "24 hour Bail Bonds Montana",
    "Yellowstone County Bail Bonds",
    "Bail Bondsman near me",
    "Northwest Bail Bonds",
    "licensed Bail Bond producer Montana",
    "Montana Bail Bond resources",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "Northwest Bail Bondsman | 24/7 Montana Bail Bonds",
    description: "A Bail Bond company built around customer service, based in Billings and serving all 56 Montana counties.",
    images: [{ url: "/montana-city-hero.jpeg", width: 1536, height: 658, alt: "Montana mountain community at sunset, representing Northwest Bail Bonds statewide service area" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northwest Bail Bondsman | 24/7 Montana Bail Bonds",
    description: "Personal, professional Bail Bond service throughout Montana—day or night.",
    images: ["/montana-city-hero.jpeg"],
  },
  other: {
    "geo.region": "US-MT",
    "geo.placename": "Billings, Montana",
    "business:contact_data:phone_number": "+1-406-601-1225",
    "business:contact_data:email": EMAIL_ADDRESS,
    "business:contact_data:locality": "Billings",
    "business:contact_data:region": "Montana",
  },
  icons: {
    icon: [{ url: "/northwest-logo-icon.png", type: "image/png" }],
    shortcut: "/northwest-logo-icon.png",
    apple: "/northwest-logo-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<UrgentContactPrompt /></body></html>;
}
