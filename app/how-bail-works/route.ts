function redirectToResources(request: Request) {
  return Response.redirect(new URL("/resources#faq", request.url), 308);
}

export function GET(request: Request) {
  return redirectToResources(request);
}

export function HEAD(request: Request) {
  return redirectToResources(request);
}
