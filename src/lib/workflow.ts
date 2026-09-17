// Workflow rules derived from docs/workflow.md.
// Shared by the review page (status transitions) and the selection page.

import { ApplicationStatus, UserRole } from '@/types';

export interface StatusTransition {
  to: ApplicationStatus;
  label: string;
  allowedRoles: UserRole[];
}

const ADMIN_ROLES = [UserRole.SCRUTINY_OFFICER, UserRole.SELECTION_OFFICER, UserRole.ADMIN];

// Full transition table from docs/workflow.md ("Allowed Status Transitions").
export const ALLOWED_TRANSITIONS: Record<ApplicationStatus, StatusTransition[]> = {
  [ApplicationStatus.DRAFT]: [
    { to: ApplicationStatus.SUBMITTED, label: 'Submit', allowedRoles: [UserRole.APPLICANT] },
    { to: ApplicationStatus.WITHDRAWN, label: 'Withdraw', allowedRoles: [UserRole.APPLICANT] },
  ],
  [ApplicationStatus.SUBMITTED]: [
    { to: ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, label: 'Start Verification', allowedRoles: [] },
  ],
  [ApplicationStatus.UNDER_DOCUMENT_VERIFICATION]: [
    { to: ApplicationStatus.UNDER_ELIGIBILITY_CHECK, label: 'Start Eligibility Check', allowedRoles: [] },
  ],
  [ApplicationStatus.UNDER_ELIGIBILITY_CHECK]: [
    { to: ApplicationStatus.ELIGIBLE, label: 'Mark Eligible', allowedRoles: [] },
    { to: ApplicationStatus.INELIGIBLE, label: 'Mark Ineligible', allowedRoles: [] },
  ],
  [ApplicationStatus.ELIGIBLE]: [
    { to: ApplicationStatus.UNDER_SCRUTINY, label: 'Move to Scrutiny', allowedRoles: ADMIN_ROLES },
  ],
  [ApplicationStatus.INELIGIBLE]: [],
  [ApplicationStatus.DEFICIENT]: [
    { to: ApplicationStatus.UNDER_SCRUTINY, label: 'Resume Scrutiny', allowedRoles: [] },
  ],
  [ApplicationStatus.UNDER_SCRUTINY]: [
    { to: ApplicationStatus.DEFICIENT, label: 'Create Deficiency', allowedRoles: ADMIN_ROLES },
    { to: ApplicationStatus.SCRUTINY_COMPLETE, label: 'Complete Scrutiny', allowedRoles: ADMIN_ROLES },
  ],
  [ApplicationStatus.SCRUTINY_COMPLETE]: [
    { to: ApplicationStatus.UNDER_SCREENING, label: 'Move to Screening', allowedRoles: ADMIN_ROLES },
  ],
  [ApplicationStatus.UNDER_SCREENING]: [
    { to: ApplicationStatus.SELECTED, label: 'Select', allowedRoles: ADMIN_ROLES },
    { to: ApplicationStatus.REJECTED, label: 'Reject', allowedRoles: ADMIN_ROLES },
  ],
  [ApplicationStatus.SELECTED]: [
    { to: ApplicationStatus.APPROVED, label: 'Approve', allowedRoles: ADMIN_ROLES },
    { to: ApplicationStatus.REJECTED, label: 'Reject', allowedRoles: ADMIN_ROLES },
  ],
  [ApplicationStatus.APPROVED]: [],
  [ApplicationStatus.REJECTED]: [],
  [ApplicationStatus.WITHDRAWN]: [],
};

/**
 * Manual (officer/admin) transitions available for a given status.
 * System- and applicant-only transitions are filtered out.
 */
export function getManualTransitions(status: ApplicationStatus): StatusTransition[] {
  return (ALLOWED_TRANSITIONS[status] ?? []).filter((t) => t.allowedRoles.length > 0);
}

/** True if the given transition requires a deficiency to be created instead of a plain status change. */
export function isDeficiencyTransition(transition: StatusTransition): boolean {
  return transition.to === ApplicationStatus.DEFICIENT;
}
