import { NextRequest } from 'next/server';
import { establishSession } from '@/lib/session';
import { roleHome } from '@/lib/session-crypto';
import { verifyCredentials } from '@/lib/auth-users';

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // curl / server-to-server — not a browser
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get('host');
    return originHost === host;
  } catch {
    return false;
  }
}

// ---- simple in-memory login throttling (5 fails / 15 min per remote address)
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, number[]>();

function getRemoteAddress(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (failures.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length === 0) failures.delete(ip);
  return recent.length >= MAX_FAILURES;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const recent = (failures.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  failures.set(ip, recent);
}

function clearFailures(ip: string): void {
  failures.delete(ip);
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    return await handleLogin(request);
  } catch (error) {
    console.error('[auth/login] unexpected error:', error);
    return Response.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Sign-in service is temporarily unavailable. Please try again shortly.',
        },
      },
      { status: 500 }
    );
  }
}

async function handleLogin(request: NextRequest): Promise<Response> {
  if (!isSameOrigin(request)) {
    return Response.json(
      { success: false, error: { code: 'CSRF', message: 'Invalid request origin.' } },
      { status: 403 }
    );
  }

  const ip = getRemoteAddress(request);
  if (isRateLimited(ip)) {
    return Response.json(
      {
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many failed attempts. Please try again in a few minutes.',
        },
      },
      { status: 429 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: { code: 'INVALID_BODY', message: 'Malformed request.' } },
      { status: 400 }
    );
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password) {
    return Response.json(
      {
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Email and password are required.' },
      },
      { status: 400 }
    );
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    recordFailure(ip);
    return Response.json(
      {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.',
        },
      },
      { status: 401 }
    );
  }

  clearFailures(ip);

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  await establishSession(sessionUser);

  return Response.json({
    success: true,
    user: sessionUser,
    home: roleHome(user.role),
  });
}