import { NextRequest } from 'next/server';
import { parseToken } from '@/lib/session';

export async function GET(request: NextRequest): Promise<Response> {
  const token = request.cookies.get('tsa_session')?.value;
  const claims = token ? parseToken(token) : null;

  if (!claims) {
    return Response.json({ user: null });
  }

  return Response.json({
    user: {
      id: claims.sub,
      name: claims.name,
      email: claims.email,
      role: claims.role,
    },
  });
}