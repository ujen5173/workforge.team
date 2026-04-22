import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const hostWithoutPort = hostname.split(":")[0];

  if (!hostWithoutPort) {
    const url = req.nextUrl.clone();
    url.pathname = `/`;

    return NextResponse.rewrite(url);
  }

  const rootDomains = ["lvh.me", "workforge.team", "localhost"];
  const rootDomain = rootDomains.find((d) => hostWithoutPort.endsWith(d));

  const subdomain =
    rootDomain && hostWithoutPort !== rootDomain
      ? hostWithoutPort.replace(`.${rootDomain}`, "")
      : null;

  const { pathname } = req.nextUrl;

  // If there's a subdomain and user hits /app (or /app/*)
  if (subdomain && pathname.startsWith("/app")) {
    const url = req.nextUrl.clone();
    const rest = pathname.replace("/app", "") || "";
    url.pathname = `/app/${subdomain}${rest}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
