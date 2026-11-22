import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname, search } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname + search);
    return NextResponse.redirect(url);
  }

  // Already logged in -> skip the login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
