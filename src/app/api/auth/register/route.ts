import { NextRequest } from 'next/server';
import { establishSession } from '@/lib/session';
import { createUser } from '@/lib/auth-users';

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const host = request.headers.get('host');
    return originHost === host;
  } catch {
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export async function POST(request: NextRequest): Promise<Response> {
  if (!isSameOrigin(request)) {
    return Response.json(
      { success: false, error: { code: 'CSRF', message: 'Invalid request origin.' } },
      { status: 403 }
    );
  }

  let body: { name?: string; email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: { code: 'INVALID_BODY', message: 'Malformed request.' } },
      { status: 400 }
    );
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (name.length < 2 || name.length > 80) {
    return Response.json(
      {
        success: false,
        error: { code: 'INVALID_NAME', message: 'Please enter your full name.' },
      },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      {
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'Please enter a valid email address.' },
      },
      { status: 400 }
    );
  }
  if (!PASSWORD_RE.test(password)) {
    return Response.json(
      {
        success: false,
        error: {
          code: 'WEAK_PASSWORD',
          message: 'Password must be at least 8 characters and include a letter and a number.',
        },
      },
      { status: 400 }
    );
  }

  let user: Awaited<ReturnType<typeof createUser>>;
  try {
    user = await createUser({ name, email, password });
  } catch {
    return Response.json(
      {
        success: false,
        error: {
          code: 'EMAIL_TAKEN',
          message: 'An account with this email already exists. Try logging in instead.',
        },
      },
      { status: 409 }
    );
  }

  const sessionUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  await establishSession(sessionUser);

  return Response.json(
    {
      success: true,
      user: sessionUser,
      home: '/applicant/dashboard',
    },
    { status: 201 }
  );
}