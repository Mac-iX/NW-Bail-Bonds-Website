import type { MetadataRoute } from "next";
import { CITY_GUIDES, JAIL_GUIDES } from "@/app/data/seo-pages";
import { BASE_URL } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = [
    "",
    "/jails",
    "/locations",
    "/service-areas",
    "/how-to-bail-someone-out",
    "/digital-bail-bonds",
    "/faq",
    "/about",
    "/resources",
    "/contact",
    "/privacy",
  ];

  const routes = [
    ...coreRoutes,
    ...JAIL_GUIDES.map((guide) => "/jails/" + guide.slug),
    ...CITY_GUIDES.map((guide) => "/locations/" + guide.slug),
  ];

  return routes.map((route) => ({
    url: BASE_URL + route,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/contact"
          ? 0.9
          : route.startsWith("/jails/") || route.startsWith("/locations/") || route === "/service-areas"
            ? 0.85
            : 0.75,
  }));
}
