// Mock deficiency records for the admin Deficiency Management page.
// Mirrors the Deficiency model in prisma/schema.prisma and docs/api.md.
// Replace with GET /api/applications/[id]/deficiencies once the backend exists.

import { MOCK_APPLICATIONS } from './mock-data';

export type MockDeficiencyStatus = 'OPEN' | 'RESPONDED' | 'RESOLVED' | 'REJECTED';

export interface MockDeficiencyRecord {
  id: string;
  applicationId: string;
  applicationNumber: string;
  applicantName: string;
  documentType: string;
  description: string;
  status: MockDeficiencyStatus;
  createdByName: string;
  createdAt: string;
  responseText?: string;
  responseDocumentName?: string;
  respondedAt?: string;
  resolvedByName?: string;
  resolvedAt?: string;
  remarks?: string;
}

export const DOCUMENT_TYPES: { value: string; label: string }[] = [
  { value: 'ST_CERTIFICATE', label: 'ST/Caste Certificate' },
  { value: 'INCOME_CERTIFICATE', label: 'Income Certificate' },
  { value: 'ADMISSION_LETTER', label: 'University Admission/Enrollment Letter' },
  { value: 'ADMISSION_LETTER_FOREIGN', label: 'Admission Letter from Foreign University' },
  { value: 'MARKSHEET', label: 'Marksheet' },
  { value: 'PASSPORT', label: 'Valid Passport' },
  { value: 'PHOTO', label: 'Passport-size Photograph' },
  { value: 'ID_PROOF', label: 'Government Photo ID' },
  { value: 'BANK_PASSBOOK', label: 'Bank Passbook' },
];

function app(id: string) {
  const found = MOCK_APPLICATIONS.find((a) => a.id === id);
  return {
    applicationId: id,
    applicationNumber: found?.applicationNumber ?? id,
    applicantName: found?.applicant.name ?? 'Unknown Applicant',
  };
}

export const MOCK_DEFICIENCIES: MockDeficiencyRecord[] = [
  {
    id: 'def-0001',
    ...app('app-00005'),
    documentType: 'INCOME_CERTIFICATE',
    description: 'The income certificate is blurred and the income amount is not legible. Please upload a clearer copy.',
    status: 'OPEN',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-09T11:20:00Z',
  },
  {
    id: 'def-0002',
    ...app('app-00004'),
    documentType: 'MARKSHEET',
    description: 'The uploaded marksheet is for Semester 1 only. Please upload the complete final marksheet.',
    status: 'OPEN',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-09T09:45:00Z',
  },
  {
    id: 'def-0003',
    ...app('app-00001'),
    documentType: 'PHOTO',
    description: 'Photograph does not meet the passport-size specification. Please re-upload against a plain background.',
    status: 'RESPONDED',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-08T14:00:00Z',
    responseText: 'Uploaded a new passport-size photograph with a plain white background.',
    responseDocumentName: 'photograph_v2.jpg',
    respondedAt: '2026-09-09T08:30:00Z',
  },
  {
    id: 'def-0004',
    ...app('app-00015'),
    documentType: 'PASSPORT',
    description: 'Only the first page of the passport was uploaded. The last page is also required.',
    status: 'RESPONDED',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-08T10:15:00Z',
    responseText: 'Attached both first and last pages of the passport in a single PDF.',
    responseDocumentName: 'passport_full.pdf',
    respondedAt: '2026-09-09T12:05:00Z',
  },
  {
    id: 'def-0005',
    ...app('app-00007'),
    documentType: 'ADMISSION_LETTER',
    description: 'Enrollment letter does not clearly show the enrollment date. Please provide an official letter with the date.',
    status: 'RESOLVED',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-06T15:30:00Z',
    responseText: 'Provided an updated enrollment letter with the date clearly printed.',
    responseDocumentName: 'enrollment_letter_v2.pdf',
    respondedAt: '2026-09-07T09:10:00Z',
    resolvedByName: 'Priya Sharma (Scrutiny Officer)',
    resolvedAt: '2026-09-07T16:40:00Z',
    remarks: 'Replacement document is clear and verified.',
  },
  {
    id: 'def-0006',
    ...app('app-00008'),
    documentType: 'ST_CERTIFICATE',
    description: 'ST certificate appears to be expired. Please upload a valid certificate.',
    status: 'RESOLVED',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-05T11:00:00Z',
    responseText: 'Uploaded the renewed ST certificate.',
    responseDocumentName: 'st_certificate_renewed.pdf',
    respondedAt: '2026-09-06T10:20:00Z',
    resolvedByName: 'Priya Sharma (Scrutiny Officer)',
    resolvedAt: '2026-09-06T17:15:00Z',
    remarks: 'Renewed certificate verified against issuing authority.',
  },
  {
    id: 'def-0007',
    ...app('app-00011'),
    documentType: 'ID_PROOF',
    description: 'The uploaded ID proof is not a government-issued photo ID.',
    status: 'REJECTED',
    createdByName: 'Priya Sharma (Scrutiny Officer)',
    createdAt: '2026-09-04T13:25:00Z',
    responseText: 'Uploaded a college identity card.',
    responseDocumentName: 'college_id.jpg',
    respondedAt: '2026-09-05T09:00:00Z',
    resolvedByName: 'Priya Sharma (Scrutiny Officer)',
    resolvedAt: '2026-09-05T14:30:00Z',
    remarks: 'College ID is not an accepted government photo ID.',
  },
];
