import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    "NEXT_PUBLIC_SITE_URL is not set. Canonical URLs will use http://localhost:3000; set the public HTTPS origin before deployment.",
  );
}

const nextConfig: NextConfig = {};

export default nextConfig;
