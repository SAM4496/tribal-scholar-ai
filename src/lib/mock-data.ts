// Mock/demo data for the Admin Portal.
//
// These shapes mirror `docs/api.md` and `prisma/schema.prisma` so that the UI can
// be developed while the backend routes are still being built. When the API is
// ready, replace the helper functions below with fetch() calls to:
//   - GET /api/dashboard/stats
//   - GET /api/applications
//
// NOTE: All data here is fictional demo data for the hackathon prototype.

import { ApplicationStatus } from '@/types';

export interface MockApplicantSummary {
  name: string;
  email: string;
  tribe: string;
  state: string;
  category: string;
}

export interface MockApplication {
  id: string;
  applicationNumber: string;
  applicant: MockApplicantSummary;
  schemeCode: 'NFST' | 'NOS';
  schemeName: string;
  status: ApplicationStatus;
  currentStage: string;
  submittedAt: string | null;
  createdAt: string;
}

export interface DashboardStats {
  total: number;
  submitted: number;
  underVerification: number;
  eligible: number;
  deficient: number;
  selected: number;
  rejected: number;
  byStatus: Record<string, number>;
  byScheme: Record<string, number>;
}

export interface StatusDistributionDatum {
  status: ApplicationStatus;
  label: string;
  count: number;
}

// Order in which statuses move through the workflow (docs/workflow.md).
const STATUS_ORDER: ApplicationStatus[] = [
  ApplicationStatus.DRAFT,
  ApplicationStatus.SUBMITTED,
  ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
  ApplicationStatus.UNDER_ELIGIBILITY_CHECK,
  ApplicationStatus.ELIGIBLE,
  ApplicationStatus.INELIGIBLE,
  ApplicationStatus.DEFICIENT,
  ApplicationStatus.UNDER_SCRUTINY,
  ApplicationStatus.SCRUTINY_COMPLETE,
  ApplicationStatus.UNDER_SCREENING,
  ApplicationStatus.SELECTED,
  ApplicationStatus.APPROVED,
  ApplicationStatus.REJECTED,
  ApplicationStatus.WITHDRAWN,
];

// Mirrors the demo applicants created by prisma/seed.ts so the admin UI is
// consistent with the seeded database.
export const MOCK_APPLICATIONS: MockApplication[] = [
  {
    id: 'app-00001',
    applicationNumber: 'NFST-2026-00001',
    applicant: { name: 'Rahul Kumar', email: 'applicant@demo.com', tribe: 'Gond', state: 'Madhya Pradesh', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.SUBMITTED,
    currentStage: 'Document Verification',
    submittedAt: '2026-09-10T10:00:00Z',
    createdAt: '2026-09-08T09:00:00Z',
  },
  {
    id: 'app-00002',
    applicationNumber: 'NFST-2026-00002',
    applicant: { name: 'Meera Bhil', email: 'meera@demo.com', tribe: 'Bhil', state: 'Rajasthan', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.ELIGIBLE,
    currentStage: 'Scrutiny',
    submittedAt: '2026-09-09T11:30:00Z',
    createdAt: '2026-09-07T09:00:00Z',
  },
  {
    id: 'app-00003',
    applicationNumber: 'NFST-2026-00003',
    applicant: { name: 'Arjun Munda', email: 'arjun@demo.com', tribe: 'Munda', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
    currentStage: 'Document Verification',
    submittedAt: '2026-09-09T14:15:00Z',
    createdAt: '2026-09-07T10:00:00Z',
  },
  {
    id: 'app-00004',
    applicationNumber: 'NFST-2026-00004',
    applicant: { name: 'Priya Tirkey', email: 'priya.t@demo.com', tribe: 'Oraon', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_SCRUTINY,
    currentStage: 'Scrutiny',
    submittedAt: '2026-09-08T16:45:00Z',
    createdAt: '2026-09-06T09:00:00Z',
  },
  {
    id: 'app-00005',
    applicationNumber: 'NFST-2026-00005',
    applicant: { name: 'Vikash Lakra', email: 'vikash@demo.com', tribe: 'Lakra', state: 'Chhattisgarh', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.DEFICIENT,
    currentStage: 'Deficiency Response',
    submittedAt: '2026-09-08T09:20:00Z',
    createdAt: '2026-09-06T10:00:00Z',
  },
  {
    id: 'app-00006',
    applicationNumber: 'NFST-2026-00006',
    applicant: { name: 'Sunita Soren', email: 'sunita@demo.com', tribe: 'Santal', state: 'West Bengal', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.SCRUTINY_COMPLETE,
    currentStage: 'Screening',
    submittedAt: '2026-09-07T13:00:00Z',
    createdAt: '2026-09-05T09:00:00Z',
  },
  {
    id: 'app-00007',
    applicationNumber: 'NFST-2026-00007',
    applicant: { name: 'Deepak Xalxo', email: 'deepak@demo.com', tribe: 'Oraon', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_SCREENING,
    currentStage: 'Selection',
    submittedAt: '2026-09-07T10:10:00Z',
    createdAt: '2026-09-05T10:00:00Z',
  },
  {
    id: 'app-00008',
    applicationNumber: 'NOS-2026-00008',
    applicant: { name: 'Kavita Maravi', email: 'kavita@demo.com', tribe: 'Gond', state: 'Madhya Pradesh', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.SELECTED,
    currentStage: 'Final Approval',
    submittedAt: '2026-09-06T15:30:00Z',
    createdAt: '2026-09-04T09:00:00Z',
  },
  {
    id: 'app-00009',
    applicationNumber: 'NOS-2026-00009',
    applicant: { name: 'Ravi Hembram', email: 'ravi@demo.com', tribe: 'Santal', state: 'Odisha', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.APPROVED,
    currentStage: 'Complete',
    submittedAt: '2026-09-05T12:00:00Z',
    createdAt: '2026-09-03T09:00:00Z',
  },
  {
    id: 'app-00010',
    applicationNumber: 'NOS-2026-00010',
    applicant: { name: 'Anita Kujur', email: 'anita.k@demo.com', tribe: 'Oraon', state: 'Chhattisgarh', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.REJECTED,
    currentStage: 'Complete',
    submittedAt: '2026-09-05T11:00:00Z',
    createdAt: '2026-09-03T10:00:00Z',
  },
  {
    id: 'app-00011',
    applicationNumber: 'NOS-2026-00011',
    applicant: { name: 'Sunil Toppo', email: 'sunil@demo.com', tribe: 'Kharia', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.DRAFT,
    currentStage: 'Application Form',
    submittedAt: null,
    createdAt: '2026-09-02T09:00:00Z',
  },
  {
    id: 'app-00012',
    applicationNumber: 'NFST-2026-00012',
    applicant: { name: 'Lakshmi Oraon', email: 'lakshmi@demo.com', tribe: 'Oraon', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_ELIGIBILITY_CHECK,
    currentStage: 'Eligibility Check',
    submittedAt: '2026-09-04T16:00:00Z',
    createdAt: '2026-09-02T09:00:00Z',
  },
  {
    id: 'app-00013',
    applicationNumber: 'NOS-2026-00013',
    applicant: { name: 'Ramesh Bhil', email: 'ramesh@demo.com', tribe: 'Bhil', state: 'Rajasthan', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.INELIGIBLE,
    currentStage: 'Complete',
    submittedAt: '2026-09-04T10:30:00Z',
    createdAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'app-00014',
    applicationNumber: 'NFST-2026-00014',
    applicant: { name: 'Sita Kumari', email: 'sita@demo.com', tribe: 'Munda', state: 'Jharkhand', category: 'ST' },
    schemeCode: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes',
    status: ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
    currentStage: 'Document Verification',
    submittedAt: '2026-09-03T14:00:00Z',
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 'app-00015',
    applicationNumber: 'NOS-2026-00015',
    applicant: { name: 'Mohan Munda', email: 'mohan@demo.com', tribe: 'Munda', state: 'Odisha', category: 'ST' },
    schemeCode: 'NOS',
    schemeName: 'National Overseas Scholarship',
    status: ApplicationStatus.SUBMITTED,
    currentStage: 'Document Verification',
    submittedAt: '2026-09-03T09:45:00Z',
    createdAt: '2026-09-01T10:00:00Z',
  },
];

function countBy(items: MockApplication[], key: (item: MockApplication) => string) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const value = key(item);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function getDashboardStats(): DashboardStats {
  const byStatus = countBy(MOCK_APPLICATIONS, (a) => a.status);
  const byScheme = countBy(MOCK_APPLICATIONS, (a) => a.schemeCode);

  const count = (...statuses: ApplicationStatus[]) =>
    statuses.reduce((sum, status) => sum + (byStatus[status] ?? 0), 0);

  return {
    total: MOCK_APPLICATIONS.length,
    submitted: count(ApplicationStatus.SUBMITTED),
    underVerification: count(
      ApplicationStatus.UNDER_DOCUMENT_VERIFICATION,
      ApplicationStatus.UNDER_ELIGIBILITY_CHECK
    ),
    eligible: count(ApplicationStatus.ELIGIBLE),
    deficient: count(ApplicationStatus.DEFICIENT),
    selected: count(ApplicationStatus.SELECTED),
    rejected: count(ApplicationStatus.REJECTED, ApplicationStatus.INELIGIBLE),
    byStatus,
    byScheme,
  };
}

export function getRecentApplications(limit = 10): MockApplication[] {
  return [...MOCK_APPLICATIONS]
    .sort((a, b) => {
      const aDate = a.submittedAt ?? a.createdAt;
      const bDate = b.submittedAt ?? b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, limit);
}

export function getStatusDistribution(): StatusDistributionDatum[] {
  const byStatus = countBy(MOCK_APPLICATIONS, (a) => a.status);
  return STATUS_ORDER.filter((status) => (byStatus[status] ?? 0) > 0).map((status) => ({
    status,
    label: status
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' '),
    count: byStatus[status],
  }));
}
