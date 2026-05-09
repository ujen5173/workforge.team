import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./server/better-auth";

export const runtime = "nodejs";

const BASE_DOMAIN =
  process.env.NODE_ENV === "production" ? "workforge.team" : "lvh.me:3000";

const PUBLIC_PATHS = [
  "/onboard/login",
  "/onboard/company",
  "/onboard/signup",
  "/api/auth",
  "/api/trpc",
  "/api/set-tenant",
  "/api/uploads",
];

function getSubdomain(hostname: string): string | null {
  const suffix = `.${BASE_DOMAIN}`;
  if (!hostname.endsWith(suffix)) return null;
  const withoutBase = hostname.slice(0, -suffix.length);
  if (withoutBase === "www" || withoutBase === "app") return null;
  return withoutBase || null;
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";
  const subdomain = getSubdomain(hostname);

  if (isPublicPath(pathname)) return NextResponse.next();

  const session = await auth.api.getSession({ headers: request.headers });
  const tenantCookie = request.cookies.get("workforge-tenant")?.value;

  // Get active org slug from session, or fallback to cookie.
  const activeOrg =
    session?.session?.activeOrganizationSlug ?? tenantCookie ?? null;

  if (!subdomain) {
    if (session?.user && activeOrg) {
      // redirecting to user org
      const orgUrl = new URL(
        `http://${activeOrg}.${BASE_DOMAIN}${pathname === "/" ? "/app" : pathname}`,
      );
      return NextResponse.redirect(orgUrl);
    }

    return NextResponse.next();
  }

  // if user is not present, redirect to login
  if (!session?.user) {
    const loginUrl = new URL(`http://${BASE_DOMAIN}/onboard/login`);
    loginUrl.searchParams.set("next", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (!activeOrg) {
    // there is not activeOrg associated to user.
    return NextResponse.redirect(
      new URL(`http://${BASE_DOMAIN}/onboard/company`),
    );
  }

  if (activeOrg !== subdomain) {
    // if user is trying to access other orgs, it will redirect to the user active org.
    const theirUrl = new URL(`http://${activeOrg}.${BASE_DOMAIN}${pathname}`);
    return NextResponse.redirect(theirUrl);
  }

  if (pathname.startsWith("/app")) {
    const newPath = pathname.replace("/app", `/app/${subdomain}`);
    return NextResponse.rewrite(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
