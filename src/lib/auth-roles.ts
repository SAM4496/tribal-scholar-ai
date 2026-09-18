// Role constants and helpers — client-safe (no server-only imports).
// Import these from client components; the crypto stays server-side.

export const APPLICANT_ROLE = 'APPLICANT';
export const ADMIN_ROLE = 'ADMIN';
export const SCRUTINY_OFFICER_ROLE = 'SCRUTINY_OFFICER';
export const SELECTION_OFFICER_ROLE = 'SELECTION_OFFICER';

export const ADMIN_PORTAL_ROLES = [
  ADMIN_ROLE,
  SCRUTINY_OFFICER_ROLE,
  SELECTION_OFFICER_ROLE,
];

/** Home route after a successful login, keyed by role. */
export function roleHome(role: string): string {
  switch (role) {
    case APPLICANT_ROLE:
      return '/applicant/dashboard';
    case ADMIN_ROLE:
    case SCRUTINY_OFFICER_ROLE:
    case SELECTION_OFFICER_ROLE:
      return '/admin/dashboard';
    default:
      return '/';
  }
}

/** Whether a role may access the /admin portal. */
export function isAdminPortalRole(role: string): boolean {
  return ADMIN_PORTAL_ROLES.includes(role);
}