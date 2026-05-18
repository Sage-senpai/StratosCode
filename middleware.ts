import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (isProtected && !req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("signin", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  // Run on everything except static assets and auth API endpoints
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|api/webhooks).*)"],
};
