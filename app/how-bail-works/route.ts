function redirectToCurrentGuide(request: Request) {
  return Response.redirect(new URL("/how-to-bail-someone-out", request.url), 308);
}

export function GET(request: Request) {
  return redirectToCurrentGuide(request);
}

export function HEAD(request: Request) {
  return redirectToCurrentGuide(request);
}
