import { NextRequest, NextResponse } from 'next/server';
import {
  APPLICANT_ROLE,
  SESSION_COOKIE_NAME,
  isAdminPortalRole,
  roleHome,
  verifySessionToken,
} from '@/lib/session-crypto';

// First-line route guard. Runs before every page render and:
//  - redirects signed-out visitors away from /admin and /applicant
//  - redirects signed-in visitors away from /login and /register
//  - enforces role boundaries between the admin and applicant portals
//
// Authoritative checks are repeated in src/app/admin/layout.tsx and
// src/app/applicant/layout.tsx (defence in depth).

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const claims = token ? verifySessionToken(token) : null;

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  const isApplicant = pathname === '/applicant' || pathname.startsWith('/applicant/');

  // Signed-in users don't need login/register.
  if (isAuthPage && claims) {
    return NextResponse.redirect(new URL(roleHome(claims.role), request.url));
  }

  if ((isAdmin || isApplicant) && !claims) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname + search);
    return NextResponse.redirect(login);
  }

  if (isAdmin && claims && !isAdminPortalRole(claims.role)) {
    return NextResponse.redirect(new URL(roleHome(claims.role), request.url));
  }

  if (isApplicant && claims && claims.role !== APPLICANT_ROLE) {
    return NextResponse.redirect(new URL(roleHome(claims.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on every page route; skip assets and the (self-guarding) API.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)'],
};