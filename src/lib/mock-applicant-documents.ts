// Demo document records shown in the applicant "My Documents" workspace.

export type ApplicantDocumentStatus =
  | 'VERIFIED'
  | 'PROCESSING'
  | 'NEEDS_REVIEW'
  | 'REJECTED'
  | 'UPLOADED';

export interface ApplicantDocument {
  id: string;
  documentType: string;
  documentName: string;
  fileName: string;
  sizeKB: number;
  uploadedAt: string;
  status: ApplicantDocumentStatus;
  confidence: number | null;
  applicationNumber: string;
  schemeCode: 'NFST' | 'NOS' | 'TCEP';
}

export const APPLICANT_DOCUMENTS: ApplicantDocument[] = [
  {
    id: 'doc-001',
    documentType: 'ST_CERTIFICATE',
    documentName: 'ST/Caste Certificate',
    fileName: 'st_certificate.pdf',
    sizeKB: 412,
    uploadedAt: '2026-09-08T09:00:00Z',
    status: 'VERIFIED',
    confidence: 98,
    applicationNumber: 'NFST-2026-00001',
    schemeCode: 'NFST',
  },
  {
    id: 'doc-002',
    documentType: 'ADMISSION_LETTER',
    documentName: 'University Admission Letter',
    fileName: 'admission_letter.pdf',
    sizeKB: 623,
    uploadedAt: '2026-09-08T09:02:00Z',
    status: 'VERIFIED',
    confidence: 96,
    applicationNumber: 'NFST-2026-00001',
    schemeCode: 'NFST',
  },
  {
    id: 'doc-003',
    documentType: 'INCOME_CERTIFICATE',
    documentName: 'Income Certificate',
    fileName: 'income_certificate.jpg',
    sizeKB: 884,
    uploadedAt: '2026-09-08T09:05:00Z',
    status: 'NEEDS_REVIEW',
    confidence: 61,
    applicationNumber: 'NFST-2026-00001',
    schemeCode: 'NFST',
  },
  {
    id: 'doc-004',
    documentType: 'PHOTO',
    documentName: 'Passport-size Photograph',
    fileName: 'photo.jpg',
    sizeKB: 185,
    uploadedAt: '2026-09-08T09:06:00Z',
    status: 'VERIFIED',
    confidence: 99,
    applicationNumber: 'NFST-2026-00001',
    schemeCode: 'NFST',
  },
  {
    id: 'doc-005',
    documentType: 'ADMISSION_LETTER_FOREIGN',
    documentName: 'Admission Letter (Oxford)',
    fileName: 'oxford_offer.pdf',
    sizeKB: 1042,
    uploadedAt: '2026-09-04T09:00:00Z',
    status: 'PROCESSING',
    confidence: null,
    applicationNumber: 'NOS-2026-00008',
    schemeCode: 'NOS',
  },
  {
    id: 'doc-006',
    documentType: 'PASSPORT',
    documentName: 'Passport (First & Last Page)',
    fileName: 'passport.pdf',
    sizeKB: 755,
    uploadedAt: '2026-09-04T09:03:00Z',
    status: 'PROCESSING',
    confidence: null,
    applicationNumber: 'NOS-2026-00008',
    schemeCode: 'NOS',
  },
  {
    id: 'doc-007',
    documentType: 'BANK_PASSBOOK',
    documentName: 'Bank Passbook First Page',
    fileName: 'passbook.pdf',
    sizeKB: 390,
    uploadedAt: '2026-09-02T09:00:00Z',
    status: 'VERIFIED',
    confidence: 97,
    applicationNumber: 'NFST-2026-00012',
    schemeCode: 'NFST',
  },
];