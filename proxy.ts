import { type NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "nwbailbonds.com";
const LEGACY_DEPLOYMENT_HOSTS = [".replit.app"] as const;

export function proxy(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();

  if (LEGACY_DEPLOYMENT_HOSTS.some((suffix) => host.endsWith(suffix))) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
