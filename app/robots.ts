import type { MetadataRoute } from "next";
import { BASE_URL } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"], allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
