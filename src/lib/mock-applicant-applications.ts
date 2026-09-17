// Mock/demo data for the Applicant Portal "My Applications" experience.
//
// Represents the applications owned by the demo applicant (Rahul Kumar,
// applicant@demo.com). Mirrors the seeded database rows in prisma/seed.ts so
// the UI stays consistent with the prototype. Swap these helpers for fetch()
// calls to the real API when the backend routes land.

import { ApplicationStatus } from '@/types';

export interface ApplicantApplication {
  id: string;
  applicationNumber: string;
  schemeCode: 'NFST' | 'NOS';
  schemeName: string;
  status: ApplicationStatus;
  currentStage: string;
  submittedAt: string | null;
  createdAt: string;
  course: string;
  institution: string;
}

export interface ApplicantTimelineEntry {
  title: string;
  description: string;
  date: string | null;
  tone: 'done' | 'current' | 'pending' | 'problem';
}

// Milestone pipeline shown on each application card. Order must stay in sync
// with the workflow in src/lib/workflow.ts and docs/workflow.md.
const MILESTONES = [
  'Application',
  'Documents',
  'Eligibility',
  'Scrutiny',
  'Selection',
  'Decision',
] as const;

// Position of every status on the pipeline above.
const STATUS_STEP: Record<ApplicationStatus, number> = {
  [ApplicationStatus.DRAFT]: 0,
  [ApplicationStatus.WITHDRAWN]: 0,
  [ApplicationStatus.SUBMITTED]: 1,
  [ApplicationStatus.UNDER_DOCUMENT_VERIFICATION]: 2,
  [ApplicationStatus.UNDER_ELIGIBILITY_CHECK]: 3,
  [ApplicationStatus.ELIGIBLE]: 3,
  [ApplicationStatus.INELIGIBLE]: 3,
  [ApplicationStatus.UNDER_SCRUTINY]: 4,
  [ApplicationStatus.DEFICIENT]: 4,
  [ApplicationStatus.SCRUTINY_COMPLETE]: 4,
  [ApplicationStatus.UNDER_SCREENING]: 5,
  [ApplicationStatus.SELECTED]: 6,
  [ApplicationStatus.APPROVED]: 6,
  [ApplicationStatus.REJECTED]: 6,
};

export function getMilestones(): readonly string[] {
  return MILESTONES;
}

/** 0-based index of the milestone the application currently sits on. */
export function getMilestoneStep(status: ApplicationStatus): number {
  return Math.min(STATUS_STEP[status] ?? 0, MILESTONES.length - 1);
}

/** 0..1 progress fraction for progress bars. */
export function getMilestoneProgress(status: ApplicationStatus): number {
  return getMilestoneStep(status) / (MILESTONES.length - 1);
}

export const APPLICANT_APPLICATIONS: ApplicantApplication[] = [
  {
    id: 'app-00001',
    applicationNumber: 'NFST-2026-00001',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
    currentStage: 'Document Verification',
    submittedAt: '2026-09-10T10:00:00Z',
    createdAt: '2026-09-08T09:00:00Z',
    course: 'Ph.D. Computer Science',
    institution: 'Rani Durgavati University',
  },
  {
    id: 'app-00012',
    applicationNumber: 'NFST-2026-00012',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.DEFICIENT,
    currentStage: 'Deficiency Response',
    submittedAt: '2026-09-04T16:00:00Z',
    createdAt: '2026-09-02T09:00:00Z',
    course: 'Ph.D. Applied Chemistry',
    institution: 'Rani Durgavati University',
  },
  {
    id: 'app-00008',
    applicationNumber: 'NOS-2026-00008',
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.UNDER_SCREENING,
    currentStage: 'Selection',
    submittedAt: '2026-09-06T15:30:00Z',
    createdAt: '2026-09-04T09:00:00Z',
    course: 'M.Sc. Data Science',
    institution: 'University of Oxford',
  },
  {
    id: 'app-00009',
    applicationNumber: 'NOS-2026-00009',
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.APPROVED,
    currentStage: 'Complete',
    submittedAt: '2026-09-05T12:00:00Z',
    createdAt: '2026-09-03T09:00:00Z',
    course: 'M.Sc. Statistics',
    institution: 'University of Cambridge',
  },
  {
    id: 'app-00011',
    applicationNumber: 'NOS-2026-00011',
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.DRAFT,
    currentStage: 'Application Form',
    submittedAt: null,
    createdAt: '2026-09-02T09:00:00Z',
    course: 'M.A. Economics',
    institution: 'London School of Economics',
  },
  {
    id: 'app-00016',
    applicationNumber: 'NFST-2026-00016',
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.REJECTED,
    currentStage: 'Complete',
    submittedAt: '2026-09-02T11:20:00Z',
    createdAt: '2026-08-31T09:00:00Z',
    course: 'Ph.D. Forestry',
    institution: 'Forest Research Institute',
  },
];

export function getApplicantApplications(): ApplicantApplication[] {
  return [...APPLICANT_APPLICATIONS];
}

export function getApplicantApplication(
  id: string
): ApplicantApplication | undefined {
  return APPLICANT_APPLICATIONS.find((a) => a.id === id);
}

// Builds a human-readable, applicant-facing timeline for an application based
// on where it currently sits in the workflow.
export function getApplicantTimeline(
  app: ApplicantApplication
): ApplicantTimelineEntry[] {
  const status = app.status;
  const step = getMilestoneStep(status);
  const isDraft = status === ApplicationStatus.DRAFT;
  const already = (needAt: number, tone: 'done' | 'current' | 'problem' = 'done') =>
    step > needAt ? 'done' : step === needAt ? tone : 'pending';

  if (isDraft) {
    return [
      {
        title: 'Application Created',
        description:
          'Draft started — complete the scheme form and submit it for review.',
        date: app.createdAt,
        tone: 'done',
      },
      {
        title: 'Application Submitted',
        description: 'Submit the completed form to begin the review process.',
        date: null,
        tone: 'pending',
      },
      {
        title: 'Document Verification',
        description:
          'AI-assisted verification of the uploaded documents against your profile.',
        date: null,
        tone: 'pending',
      },
      {
        title: 'Eligibility Check',
        description:
          'Your application is checked against the scheme eligibility rules.',
        date: null,
        tone: 'pending',
      },
      {
        title: 'Scrutiny',
        description:
          'A scrutiny officer manually reviews the application and supporting documents.',
        date: null,
        tone: 'pending',
      },
      {
        title: 'Selection & Screening',
        description:
          'Shortlisted applications are scored and screened for final selection.',
        date: null,
        tone: 'pending',
      },
      {
        title: 'Decision',
        description: 'Final outcome is communicated once the review is complete.',
        date: null,
        tone: 'pending',
      },
    ];
  }

  const entries: ApplicantTimelineEntry[] = [
    {
      title: 'Application Submitted',
      description: `Application ${app.applicationNumber} submitted successfully.`,
      date: app.submittedAt,
      tone: 'done',
    },
    {
      title: 'Document Verification',
      description:
        'AI-assisted verification of the uploaded documents against your profile.',
      date: null,
      tone: already(2, 'current'),
    },
    {
      title: 'Eligibility Check',
      description:
        'Your application is checked against the scheme eligibility rules.',
      date: null,
      tone: already(3, 'current'),
    },
    {
      title: 'Scrutiny',
      description:
        'A scrutiny officer manually reviews the application and supporting documents.',
      date: null,
      tone:
        status === ApplicationStatus.DEFICIENT
          ? 'problem'
          : already(4, 'current'),
    },
    {
      title: 'Selection & Screening',
      description:
        'Shortlisted applications are scored and screened for final selection.',
      date: null,
      tone: already(5, 'current'),
    },
    {
      title: 'Decision',
      description:
        status === ApplicationStatus.DEFICIENT
          ? 'Respond to the raised deficiency to keep your application moving.'
          : 'Final outcome is communicated once the review is complete.',
      date: null,
      tone:
        status === ApplicationStatus.APPROVED ||
        status === ApplicationStatus.SELECTED ||
        status === ApplicationStatus.REJECTED ||
        status === ApplicationStatus.INELIGIBLE
          ? 'done'
          : already(6, 'current'),
    },
  ];

  const terminal =
    status === ApplicationStatus.APPROVED ||
    status === ApplicationStatus.REJECTED ||
    status === ApplicationStatus.INELIGIBLE ||
    status === ApplicationStatus.SELECTED;

  if (terminal) {
    entries[entries.length - 1].date = app.submittedAt;
  }

  return entries;
}

// CTA surfaced on an application card. DRAFTS resume the form, DEFICIENT apps
// jump to the deficiency response, everything else opens the detail view.
export function getApplicantAction(
  app: ApplicantApplication
): { label: string; href: string; kind: 'primary' | 'warning' | 'outline' } {
  if (app.status === ApplicationStatus.DRAFT) {
    return {
      label: 'Continue Application',
      href: '/applicant/schemes',
      kind: 'primary',
    };
  }
  if (app.status === ApplicationStatus.DEFICIENT) {
    return {
      label: 'Resolve Deficiency',
      href: `/applicant/applications/${app.id}`,
      kind: 'warning',
    };
  }
  return {
    label: 'View Details',
    href: `/applicant/applications/${app.id}`,
    kind: 'outline',
  };
}

export interface ApplicantStats {
  total: number;
  inProgress: number;
  needsAction: number;
  completed: number;
}

const IN_PROGRESS: ApplicationStatus[] = [
  ApplicationStatus.SUBMITTED,
  ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
  ApplicationStatus.UNDER_ELIGIBILITY_CHECK,
  ApplicationStatus.ELIGIBLE,
  ApplicationStatus.UNDER_SCRUTINY,
  ApplicationStatus.SCRUTINY_COMPLETE,
  ApplicationStatus.UNDER_SCREENING,
  ApplicationStatus.SELECTED,
];

const NEEDS_ACTION: ApplicationStatus[] = [
  ApplicationStatus.DEFICIENT,
  ApplicationStatus.DRAFT,
];

const COMPLETED: ApplicationStatus[] = [
  ApplicationStatus.APPROVED,
  ApplicationStatus.INELIGIBLE,
  ApplicationStatus.REJECTED,
  ApplicationStatus.WITHDRAWN,
];

export function getApplicantStats(
  applications: ApplicantApplication[]
): ApplicantStats {
  return {
    total: applications.length,
    inProgress: applications.filter((a) => IN_PROGRESS.includes(a.status)).length,
    needsAction: applications.filter((a) => NEEDS_ACTION.includes(a.status)).length,
    completed: applications.filter((a) => COMPLETED.includes(a.status)).length,
  };
}

const STATUS_NOTES: Record<ApplicationStatus, string> = {
  [ApplicationStatus.DRAFT]:
    'This is a draft. Complete and submit the application form to begin the review process.',
  [ApplicationStatus.SUBMITTED]:
    'Your application has been submitted successfully and is queued for document verification.',
  [ApplicationStatus.UNDER_DOCUMENT_VERIFICATION]:
    'Your uploaded documents are being verified against your profile by the AI-assisted review engine.',
  [ApplicationStatus.UNDER_ELIGIBILITY_CHECK]:
    'Your application is being checked against the eligibility rules of the scheme.',
  [ApplicationStatus.ELIGIBLE]:
    'Your application meets the eligibility criteria and has moved on to scrutiny.',
  [ApplicationStatus.INELIGIBLE]:
    'This application could not satisfy one or more mandatory eligibility criteria.',
  [ApplicationStatus.DEFICIENT]:
    'The scrutiny team flagged an issue with one of your documents. Please respond by uploading a corrected copy to keep your application moving.',
  [ApplicationStatus.UNDER_SCRUTINY]:
    'A scrutiny officer is manually reviewing your application and supporting documents.',
  [ApplicationStatus.SCRUTINY_COMPLETE]:
    'Scrutiny is complete. Your application is queued for screening and selection.',
  [ApplicationStatus.UNDER_SCREENING]:
    'Your application is being scored and screened for the final selection.',
  [ApplicationStatus.SELECTED]:
    'Congratulations — your application has been selected! Awaiting final approval.',
  [ApplicationStatus.APPROVED]:
    'Your application has been approved. Your scholarship is confirmed.',
  [ApplicationStatus.REJECTED]:
    'This application was rejected during the review process.',
  [ApplicationStatus.WITHDRAWN]:
    'You withdrew this application. It is no longer under review.',
};

export function getApplicantStatusNote(
  status: ApplicationStatus
): string {
  return STATUS_NOTES[status] ?? 'Application is under review.';
}