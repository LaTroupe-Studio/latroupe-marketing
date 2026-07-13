import { NextRequest, NextResponse } from "next/server";
import { i18nConfig, getPreferredLocale, Locale } from "@/lib/i18n";

/**
 * Middleware that handles automatic locale detection and redirection.
 *
 * How it works:
 * 1. User visits the site root
 * 2. Middleware checks Accept-Language header from their browser
 * 3. Redirects to /es or /en accordingly
 * 4. If the user manually switches language, a cookie remembers their choice
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/apply-sdr") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  const detectedLocale =
    cookieLocale && i18nConfig.locales.includes(cookieLocale)
      ? cookieLocale
      : getPreferredLocale(request.headers.get("accept-language"));

  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|fonts|favicon.ico).*)"],
};
