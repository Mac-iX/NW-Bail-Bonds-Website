const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!value) {
  console.error("NEXT_PUBLIC_SITE_URL is required for a production deployment.");
  process.exit(1);
}

let url;
try {
  url = new URL(value);
} catch {
  console.error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  process.exit(1);
}

if (url.protocol !== "https:") {
  console.error("NEXT_PUBLIC_SITE_URL must use https:// for a production deployment.");
  process.exit(1);
}

if (url.origin !== value.replace(/\/$/, "") || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
  console.error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin only, without a path, credentials, query, hash, or trailing slash.");
  process.exit(1);
}

console.log(`Production site URL: ${url.origin}`);
