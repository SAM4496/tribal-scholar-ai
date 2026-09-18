// Pure session-token cryptography. No Next.js imports here so this module can
// be shared between the app runtime, route handlers, and the edge/Node proxy.
//
// The session token is an HMAC-signed JWT-style payload:
//   {sub, name, email, role, iat, exp}.signature

import { createHmac, timingSafeEqual } from 'crypto';
import {
  ADMIN_PORTAL_ROLES,
  APPLICANT_ROLE,
  isAdminPortalRole,
  roleHome,
} from './auth-roles';

export const SESSION_COOKIE_NAME = 'tsa_session';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const DEV_FALLBACK_SECRET = 'tsa-prototype-only-secret-rotate-in-production';

export interface SessionClaims {
  sub: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export { APPLICANT_ROLE, ADMIN_PORTAL_ROLES, isAdminPortalRole, roleHome };

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SESSION_SECRET must be configured — set it in .env.local before deploying.'
    );
  }
  return DEV_FALLBACK_SECRET;
}

export function sessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax';
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function signature(input: string): string {
  return createHmac('sha256', getSessionSecret()).update(input).digest('base64url');
}

export function signSessionToken(
  payload: { sub: string; name: string; email: string; role: string },
  now: number = Date.now()
): string {
  const claims: SessionClaims = {
    sub: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
  };
  const body = base64UrlEncode(JSON.stringify(claims));
  return `${body}.${signature(body)}`;
}

export function verifySessionToken(
  token: string | undefined | null
): SessionClaims | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const expected = signature(parts[0]);
  const provided = parts[1];
  if (expected.length !== provided.length) return null;

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (!timingSafeEqual(expectedBuf, providedBuf)) return null;

  let claims: SessionClaims;
  try {
    claims = JSON.parse(base64UrlDecode(parts[0])) as SessionClaims;
  } catch {
    return null;
  }

  if (!claims || typeof claims.sub !== 'string' || typeof claims.exp !== 'number') {
    return null;
  }
  if (claims.exp * 1000 <= Date.now()) return null;
  if (typeof claims.role !== 'string' || typeof claims.name !== 'string') return null;

  return claims;
}