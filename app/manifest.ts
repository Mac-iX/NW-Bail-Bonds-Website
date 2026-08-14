import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Northwest Bail Bonds",
    short_name: "Northwest Bail",
    description: "Customer-service-first bail bonds from Billings across all 56 Montana counties.",
    start_url: "/",
    display: "standalone",
    background_color: "#04080b",
    theme_color: "#04080b",
    icons: [
      { src: "/northwest-logo-icon.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
