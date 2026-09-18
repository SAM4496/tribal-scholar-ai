// Client-safe helpers for post-login redirects.
// Kept free of server-only APIs so the login/register forms can import it.

import { isAdminPortalRole, roleHome } from './auth-roles';

/**
 * Returns `next` only when it is a safe, same-site path that the given role is
 * allowed to land on. Rejects open redirects (absolute URLs, protocol-relative
 * URLs, spaces, encoded slashes) and cross-portal paths (e.g. an applicant
 * being sent into /admin).
 */
export function resolvePostLoginPath(
  next: string | null,
  role: string,
  fallback: string = roleHome(role)
): string {
  if (!next || !next.startsWith('/')) return fallback;
  if (next.startsWith('//')) return fallback;
  if (next.includes('\\')) return fallback;
  if (next.includes(':')) return fallback;

  const portalAllowed =
    (next.startsWith('/admin/') || next === '/admin') && isAdminPortalRole(role)
      ? true
      : next.startsWith('/applicant/') && role === 'APPLICANT'
        ? true
        : next === '/' || next === '';
  if (!portalAllowed) return fallback;

  return next;
}