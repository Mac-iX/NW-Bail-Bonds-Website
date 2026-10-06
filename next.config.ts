import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    "NEXT_PUBLIC_SITE_URL is not set. Canonical URLs will use http://localhost:3000; set the public HTTPS origin before deployment.",
  );
}

const PRODUCTION_HOST = "nwbailbonds.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy route consolidation
      {
        source: "/how-bail-works",
        destination: "/how-to-bail-someone-out",
        permanent: true,
      },
      // The Replit deployment URL must not serve as a second public copy.
      {
        source: "/:path*",
        has: [{ type: "host", value: "bail-bonds-production.replit.app" }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<subdomain>.+)\\.replit\\.app" }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
