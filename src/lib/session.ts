// Server-side session helpers built on top of the signed token crypto.
// Use these inside Server Components, Route Handlers and Server Functions.

import { cookies } from 'next/headers';
import {
  SESSION_COOKIE_NAME,
  signSessionToken,
  sessionCookieOptions,
  verifySessionToken,
  type SessionClaims,
} from './session-crypto';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function readSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const claims = verifySessionToken(token);
  if (!claims) return null;

  return {
    id: claims.sub,
    name: claims.name,
    email: claims.email,
    role: claims.role,
  };
}

// Re-export for callers that want the raw claims (e.g. login flows).
export function parseToken(token: string): SessionClaims | null {
  return verifySessionToken(token);
}

export async function establishSession(user: SessionUser): Promise<void> {
  const store = await cookies();
  store.set(
    SESSION_COOKIE_NAME,
    signSessionToken({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
    sessionCookieOptions()
  );
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}