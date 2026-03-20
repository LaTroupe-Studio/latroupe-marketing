import { NextRequest, NextResponse } from "next/server";
import { i18nConfig, getPreferredLocale, Locale } from "@/lib/i18n";

/**
 * Middleware that handles automatic locale detection and redirection.
 *
 * How it works:
 * 1. User visits latroupe.com
 * 2. Middleware checks Accept-Language header from their browser
 * 3. Redirects to /es or /en accordingly
 * 4. If user manually switches language, a cookie remembers their choice
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, api routes, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the URL already has a valid locale prefix
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // No locale in URL → detect and redirect
  // 1. Check cookie first (user's manual choice)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
  // 2. Fall back to browser's Accept-Language
  const detectedLocale =
    cookieLocale && i18nConfig.locales.includes(cookieLocale)
      ? cookieLocale
      : getPreferredLocale(request.headers.get("accept-language"));

  // Redirect to the locale-prefixed URL
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except static assets
  matcher: ["/((?!_next|api|images|fonts|favicon.ico).*)"],
};
