import type { MetadataRoute } from "next";
import { BASE_URL } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/service-areas", "/about", "/resources", "/contact", "/privacy"];
  return routes.map((route, index) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/contact" ? .9 : route === "/resources" || route === "/service-areas" ? .85 : .75,
  }));
}
