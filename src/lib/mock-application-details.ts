// Detailed mock data for the Application Review / Scrutiny page.
// Mirrors the GET /api/applications/[id] response shape in docs/api.md.
// Replace getApplicationDetail() with a fetch() call once the backend exists.

import {
  ApplicationStatus,
  DocumentStatus,
  RuleType,
  VerificationStatus,
} from '@/types';
import { MOCK_APPLICATIONS, type MockApplication } from './mock-data';

export interface MockApplicantDetail {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  tribe: string;
  fatherName: string;
  motherName: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  stCertificateNumber: string;
  annualFamilyIncome: number;
  bankName: string;
  bankAccountNumber: string;
  ifscCode: string;
  currentEducationLevel: string;
  institution: string;
  course: string;
}

export interface MockApplicationField {
  section: string;
  fieldCode: string;
  label: string;
  value: string;
}

export interface MockOcrResult {
  ocrStatus: 'SUCCESS' | 'PROCESSING' | 'FAILED' | 'PENDING';
  confidence: number;
  extractedFields: Record<string, string>;
}

export interface MockVerification {
  verificationType: 'AI' | 'MANUAL';
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  checks: { label: string; status: VerificationStatus; detail: string }[];
  remarks: string;
}

export interface MockDocument {
  id: string;
  documentType: string;
  documentName: string;
  fileName: string;
  sizeKB: number;
  status: DocumentStatus;
  uploadedAt: string;
  ocrResult?: MockOcrResult;
  verification?: MockVerification;
}

export interface MockEligibilityResult {
  ruleCode: string;
  ruleName: string;
  ruleType: RuleType;
  isMandatory: boolean;
  result: VerificationStatus;
  details: string;
}

export interface MockDeficiency {
  id: string;
  documentType: string;
  description: string;
  status: 'OPEN' | 'RESPONDED' | 'RESOLVED' | 'REJECTED';
  createdByName: string;
  createdAt: string;
  responseText?: string;
  respondedAt?: string;
}

export interface MockStatusHistoryEntry {
  fromStatus: string | null;
  toStatus: string;
  changedByName: string;
  remarks: string;
  changedAt: string;
}

export interface MockApplicationDetail extends MockApplication {
  applicantDetail: MockApplicantDetail;
  fields: MockApplicationField[];
  documents: MockDocument[];
  eligibilityResults: MockEligibilityResult[];
  deficiencies: MockDeficiency[];
  statusHistory: MockStatusHistoryEntry[];
}

// ============ SCHEME-SPECIFIC CONFIG (docs/scheme-rulebook.md) ============

const NFST_FIELDS: MockApplicationField[] = [
  { section: 'Research Details', fieldCode: 'research_topic', label: 'Research Topic', value: 'Machine Learning for Tribal Language Preservation' },
  { section: 'Research Details', fieldCode: 'research_area', label: 'Research Area/Discipline', value: 'Computer Science' },
  { section: 'Research Details', fieldCode: 'supervisor_name', label: 'Name of Research Supervisor', value: 'Dr. S. Nair' },
  { section: 'Research Details', fieldCode: 'supervisor_designation', label: 'Supervisor Designation', value: 'Professor' },
  { section: 'Academic Details', fieldCode: 'university_name', label: 'University/Institution Name', value: 'Rani Durgavati University' },
  { section: 'Academic Details', fieldCode: 'department', label: 'Department', value: 'Department of Computer Science' },
  { section: 'Academic Details', fieldCode: 'enrollment_date', label: 'Date of Enrollment', value: '2026-07-15' },
  { section: 'Academic Details', fieldCode: 'course_type', label: 'Course Type', value: 'Ph.D.' },
  { section: 'Qualification', fieldCode: 'net_qualified', label: 'NET/SET Qualified?', value: 'Yes' },
  { section: 'Qualification', fieldCode: 'net_roll_number', label: 'NET/SET Roll Number', value: 'NET/2025/45812' },
];

const NOS_FIELDS: MockApplicationField[] = [
  { section: 'Overseas Details', fieldCode: 'foreign_university', label: 'Foreign University Name', value: 'University of Oxford' },
  { section: 'Overseas Details', fieldCode: 'foreign_country', label: 'Country', value: 'United Kingdom' },
  { section: 'Overseas Details', fieldCode: 'course_name', label: 'Course/Program Name', value: 'M.Sc. Data Science' },
  { section: 'Overseas Details', fieldCode: 'course_type', label: 'Course Level', value: "Master's" },
  { section: 'Overseas Details', fieldCode: 'course_duration', label: 'Course Duration (years)', value: '2' },
  { section: 'Overseas Details', fieldCode: 'course_start_date', label: 'Expected Course Start Date', value: '2026-09-01' },
  { section: 'Passport Details', fieldCode: 'passport_number', label: 'Passport Number', value: 'M1234567' },
  { section: 'Passport Details', fieldCode: 'passport_expiry', label: 'Passport Expiry Date', value: '2032-05-20' },
  { section: 'Qualification', fieldCode: 'ielts_toefl_score', label: 'IELTS/TOEFL Score', value: 'IELTS 7.5' },
  { section: 'Academic Details', fieldCode: 'graduation_percentage', label: 'Graduation Percentage', value: '72' },
];

interface DocSeed {
  documentType: string;
  documentName: string;
  fileName: string;
  sizeKB: number;
  extracted: Record<string, string>;
}

const NFST_DOCS: DocSeed[] = [
  { documentType: 'ST_CERTIFICATE', documentName: 'ST/Caste Certificate', fileName: 'st_certificate.pdf', sizeKB: 820, extracted: { candidateName: 'Applicant', certificateNumber: 'ST/MP/2024/12345', tribe: 'Gond', issuingAuthority: 'District Magistrate', issueDate: '2024-03-15' } },
  { documentType: 'INCOME_CERTIFICATE', documentName: 'Income Certificate', fileName: 'income_certificate.pdf', sizeKB: 640, extracted: { candidateName: 'Applicant', annualIncome: '450000', issuingAuthority: 'Tehsildar', issueDate: '2024-04-02' } },
  { documentType: 'ADMISSION_LETTER', documentName: 'University Admission/Enrollment Letter', fileName: 'admission_letter.pdf', sizeKB: 1210, extracted: { candidateName: 'Applicant', institution: 'Rani Durgavati University', program: 'Ph.D. Computer Science', enrollmentDate: '2026-07-15' } },
  { documentType: 'MARKSHEET', documentName: 'Last Qualifying Exam Marksheet', fileName: 'pg_marksheet.pdf', sizeKB: 980, extracted: { candidateName: 'Applicant', exam: 'M.Sc. Computer Science', percentage: '71.4', year: '2025' } },
  { documentType: 'PHOTO', documentName: 'Passport-size Photograph', fileName: 'photograph.jpg', sizeKB: 180, extracted: { faceDetected: 'yes', background: 'plain' } },
  { documentType: 'ID_PROOF', documentName: 'Government Photo ID', fileName: 'aadhaar.pdf', sizeKB: 510, extracted: { candidateName: 'Applicant', idNumber: 'XXXX-XXXX-4321', idType: 'Aadhaar' } },
  { documentType: 'BANK_PASSBOOK', documentName: 'Bank Passbook First Page', fileName: 'bank_passbook.pdf', sizeKB: 430, extracted: { accountHolder: 'Applicant', bankName: 'State Bank of India', ifscCode: 'SBIN0001234', accountNumber: '1234567890' } },
  { documentType: 'RESEARCH_PROPOSAL', documentName: 'Research Proposal', fileName: 'research_proposal.pdf', sizeKB: 2100, extracted: { title: 'Machine Learning for Tribal Language Preservation', pages: '18' } },
];

const NOS_DOCS: DocSeed[] = [
  { documentType: 'ST_CERTIFICATE', documentName: 'ST/Caste Certificate', fileName: 'st_certificate.pdf', sizeKB: 830, extracted: { candidateName: 'Applicant', certificateNumber: 'ST/RJ/2024/88213', tribe: 'Bhil', issuingAuthority: 'District Magistrate', issueDate: '2024-02-20' } },
  { documentType: 'INCOME_CERTIFICATE', documentName: 'Income Certificate', fileName: 'income_certificate.pdf', sizeKB: 610, extracted: { candidateName: 'Applicant', annualIncome: '480000', issuingAuthority: 'Tehsildar', issueDate: '2024-03-11' } },
  { documentType: 'ADMISSION_LETTER_FOREIGN', documentName: 'Admission Letter from Foreign University', fileName: 'oxford_offer.pdf', sizeKB: 1450, extracted: { candidateName: 'Applicant', institution: 'University of Oxford', program: 'M.Sc. Data Science', intake: '2026' } },
  { documentType: 'MARKSHEET', documentName: 'Graduation Marksheet', fileName: 'graduation_marksheet.pdf', sizeKB: 990, extracted: { candidateName: 'Applicant', exam: 'B.Sc. Mathematics', percentage: '72.0', year: '2024' } },
  { documentType: 'PASSPORT', documentName: 'Valid Passport', fileName: 'passport.pdf', sizeKB: 760, extracted: { candidateName: 'Applicant', passportNumber: 'M1234567', expiryDate: '2032-05-20' } },
  { documentType: 'PHOTO', documentName: 'Passport-size Photograph', fileName: 'photograph.jpg', sizeKB: 175, extracted: { faceDetected: 'yes', background: 'plain' } },
  { documentType: 'ID_PROOF', documentName: 'Government Photo ID', fileName: 'aadhaar.pdf', sizeKB: 520, extracted: { candidateName: 'Applicant', idNumber: 'XXXX-XXXX-9911', idType: 'Aadhaar' } },
  { documentType: 'BANK_PASSBOOK', documentName: 'Bank Passbook', fileName: 'bank_passbook.pdf', sizeKB: 440, extracted: { accountHolder: 'Applicant', bankName: 'State Bank of India', ifscCode: 'SBIN0001234', accountNumber: '9876543210' } },
  { documentType: 'ENGLISH_PROFICIENCY', documentName: 'IELTS/TOEFL Score', fileName: 'ielts_score.pdf', sizeKB: 410, extracted: { candidateName: 'Applicant', test: 'IELTS', score: '7.5', testDate: '2025-11-08' } },
];

const NFST_RULES: Omit<MockEligibilityResult, 'result' | 'details'>[] = [
  { ruleCode: 'NFST_ST_CATEGORY', ruleName: 'Must belong to Scheduled Tribe', ruleType: RuleType.CATEGORY, isMandatory: true },
  { ruleCode: 'NFST_EDUCATION', ruleName: 'Educational Qualification', ruleType: RuleType.EDUCATION, isMandatory: true },
  { ruleCode: 'NFST_INCOME', ruleName: 'Family Income Limit', ruleType: RuleType.INCOME, isMandatory: true },
  { ruleCode: 'NFST_INSTITUTION', ruleName: 'Recognized Institution', ruleType: RuleType.EDUCATION, isMandatory: true },
  { ruleCode: 'NFST_NOT_AVAILING', ruleName: 'Not availing other fellowship', ruleType: RuleType.CUSTOM, isMandatory: true },
];

const NOS_RULES: Omit<MockEligibilityResult, 'result' | 'details'>[] = [
  { ruleCode: 'NOS_ST_CATEGORY', ruleName: 'Must belong to Scheduled Tribe', ruleType: RuleType.CATEGORY, isMandatory: true },
  { ruleCode: 'NOS_EDUCATION', ruleName: 'Educational Qualification', ruleType: RuleType.EDUCATION, isMandatory: true },
  { ruleCode: 'NOS_INCOME', ruleName: 'Family Income Limit', ruleType: RuleType.INCOME, isMandatory: true },
  { ruleCode: 'NOS_AGE', ruleName: 'Age Limit', ruleType: RuleType.AGE, isMandatory: true },
  { ruleCode: 'NOS_ADMISSION', ruleName: 'Foreign University Admission', ruleType: RuleType.CUSTOM, isMandatory: true },
];

const STATUS_PATHS: Record<ApplicationStatus, ApplicationStatus[]> = {
  [ApplicationStatus.DRAFT]: [ApplicationStatus.DRAFT],
  [ApplicationStatus.SUBMITTED]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED],
  [ApplicationStatus.UNDER_DOCUMENT_VERIFICATION]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION],
  [ApplicationStatus.UNDER_ELIGIBILITY_CHECK]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK],
  [ApplicationStatus.ELIGIBLE]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE],
  [ApplicationStatus.INELIGIBLE]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.INELIGIBLE],
  [ApplicationStatus.UNDER_SCRUTINY]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY],
  [ApplicationStatus.DEFICIENT]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.DEFICIENT],
  [ApplicationStatus.SCRUTINY_COMPLETE]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.SCRUTINY_COMPLETE],
  [ApplicationStatus.UNDER_SCREENING]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.SCRUTINY_COMPLETE, ApplicationStatus.UNDER_SCREENING],
  [ApplicationStatus.SELECTED]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.SCRUTINY_COMPLETE, ApplicationStatus.UNDER_SCREENING, ApplicationStatus.SELECTED],
  [ApplicationStatus.APPROVED]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.SCRUTINY_COMPLETE, ApplicationStatus.UNDER_SCREENING, ApplicationStatus.SELECTED, ApplicationStatus.APPROVED],
  [ApplicationStatus.REJECTED]: [ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION, ApplicationStatus.UNDER_ELIGIBILITY_CHECK, ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCRUTINY, ApplicationStatus.SCRUTINY_COMPLETE, ApplicationStatus.UNDER_SCREENING, ApplicationStatus.SELECTED, ApplicationStatus.REJECTED],
  [ApplicationStatus.WITHDRAWN]: [ApplicationStatus.DRAFT, ApplicationStatus.WITHDRAWN],
};

function actorFor(status: ApplicationStatus): string {
  switch (status) {
    case ApplicationStatus.SUBMITTED:
    case ApplicationStatus.WITHDRAWN:
      return 'Applicant';
    case ApplicationStatus.ELIGIBLE:
    case ApplicationStatus.UNDER_SCRUTINY:
    case ApplicationStatus.DEFICIENT:
    case ApplicationStatus.SCRUTINY_COMPLETE:
      return 'Priya Sharma (Scrutiny Officer)';
    case ApplicationStatus.UNDER_SCREENING:
    case ApplicationStatus.SELECTED:
      return 'Vikram Singh (Selection Officer)';
    case ApplicationStatus.APPROVED:
    case ApplicationStatus.REJECTED:
      return 'Anita Patel (Administrator)';
    default:
      return 'System';
  }
}

function formatRuleDetails(ruleCode: string, result: VerificationStatus, app: MockApplication): string {
  if (result === VerificationStatus.FAIL) {
    if (ruleCode.includes('INCOME')) return 'Annual family income ₹7,20,000 exceeds the ₹6,00,000 limit';
    if (ruleCode.includes('EDUCATION')) return 'Qualification does not meet the minimum requirement';
    return 'Rule condition not satisfied';
  }
  if (result === VerificationStatus.NEEDS_REVIEW) {
    return 'Supporting document is unclear — manual review needed';
  }
  switch (ruleCode) {
    case 'NFST_ST_CATEGORY':
    case 'NOS_ST_CATEGORY':
      return `Applicant category: ST (${app.applicant.tribe})`;
    case 'NFST_EDUCATION':
      return 'Admitted to a Ph.D. programme — meets requirement';
    case 'NFST_INCOME':
    case 'NOS_INCOME':
      return 'Annual family income within the ₹6,00,000 limit';
    case 'NFST_INSTITUTION':
      return 'Enrolled in a UGC-recognized institution';
    case 'NFST_NOT_AVAILING':
      return 'Self-declaration submitted — no other fellowship availed';
    case 'NOS_EDUCATION':
      return 'Graduation completed with 72% — meets the 55% minimum';
    case 'NOS_AGE':
      return `Applicant age ${28} years — within the 35-year limit`;
    case 'NOS_ADMISSION':
      return 'Foreign university admission offer verified';
    default:
      return 'Rule condition satisfied';
  }
}

function buildEligibility(app: MockApplication): MockEligibilityResult[] {
  const baseRules = app.schemeCode === 'NFST' ? NFST_RULES : NOS_RULES;
  const failCode = app.schemeCode === 'NFST' ? 'NFST_INCOME' : 'NOS_EDUCATION';

  return baseRules.map((rule) => {
    let result: VerificationStatus = VerificationStatus.PASS;
    if (app.status === ApplicationStatus.INELIGIBLE && rule.ruleCode === failCode) {
      result = VerificationStatus.FAIL;
    } else if (app.status === ApplicationStatus.DEFICIENT && rule.ruleCode.includes('INCOME')) {
      result = VerificationStatus.NEEDS_REVIEW;
    }
    return { ...rule, result, details: formatRuleDetails(rule.ruleCode, result, app) };
  });
}

function buildDocuments(app: MockApplication): MockDocument[] {
  const seeds = app.schemeCode === 'NFST' ? NFST_DOCS : NOS_DOCS;
  const verified = [
    ApplicationStatus.UNDER_ELIGIBILITY_CHECK,
    ApplicationStatus.ELIGIBLE,
    ApplicationStatus.INELIGIBLE,
    ApplicationStatus.UNDER_SCRUTINY,
    ApplicationStatus.DEFICIENT,
    ApplicationStatus.SCRUTINY_COMPLETE,
    ApplicationStatus.UNDER_SCREENING,
    ApplicationStatus.SELECTED,
    ApplicationStatus.APPROVED,
    ApplicationStatus.REJECTED,
  ].includes(app.status);
  const processing = [ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_DOCUMENT_VERIFICATION].includes(app.status);

  return seeds.map((seed, index) => {
    const isPhoto = seed.documentType === 'PHOTO';
    const base: MockDocument = {
      id: `${app.id}-doc-${index + 1}`,
      documentType: seed.documentType,
      documentName: seed.documentName,
      fileName: seed.fileName,
      sizeKB: seed.sizeKB,
      status: DocumentStatus.UPLOADED,
      uploadedAt: app.createdAt,
    };

    if (app.status === ApplicationStatus.DRAFT) {
      return base;
    }

    if (processing) {
      return {
        ...base,
        status: index < 2 ? DocumentStatus.PROCESSING : DocumentStatus.UPLOADED,
      };
    }

    if (app.status === ApplicationStatus.DEFICIENT && seed.documentType === 'INCOME_CERTIFICATE') {
      return {
        ...base,
        status: DocumentStatus.NEEDS_REVIEW,
        ocrResult: {
          ocrStatus: 'SUCCESS',
          confidence: 0.62,
          extractedFields: { ...seed.extracted, annualIncome: 'unreadable' },
        },
        verification: {
          verificationType: 'AI',
          verificationStatus: VerificationStatus.NEEDS_REVIEW,
          confidenceScore: 0.62,
          checks: [
            { label: 'Document Quality', status: VerificationStatus.FAIL, detail: 'Scanned copy is blurred' },
            { label: 'Name Match', status: VerificationStatus.PASS, detail: 'Name matches profile' },
            { label: 'Field Extraction', status: VerificationStatus.NEEDS_REVIEW, detail: 'Income figure not legible' },
          ],
          remarks: 'Image quality too low to confirm income amount',
        },
      };
    }

    if (verified) {
      return {
        ...base,
        status: DocumentStatus.VERIFIED,
        ocrResult: {
          ocrStatus: 'SUCCESS',
          confidence: 0.94,
          extractedFields: seed.extracted,
        },
        verification: {
          verificationType: 'AI',
          verificationStatus: VerificationStatus.PASS,
          confidenceScore: 0.94,
          checks: [
            { label: 'Document Quality', status: VerificationStatus.PASS, detail: 'Clear and legible' },
            { label: 'Name Match', status: VerificationStatus.PASS, detail: isPhoto ? 'Photo present' : 'Name matches profile' },
            { label: 'Authenticity', status: VerificationStatus.PASS, detail: 'Issuing authority found' },
          ],
          remarks: 'Verified automatically by AI/OCR service',
        },
      };
    }

    return base;
  });
}

function buildStatusHistory(app: MockApplication): MockStatusHistoryEntry[] {
  const path = STATUS_PATHS[app.status] ?? [app.status];
  const baseTime = new Date(app.createdAt).getTime();
  return path.map((status, index) => ({
    fromStatus: index === 0 ? null : path[index - 1],
    toStatus: status,
    changedByName: actorFor(status),
    remarks:
      index === 0
        ? 'Application created'
        : status === ApplicationStatus.DEFICIENT
          ? 'Income certificate could not be read — response requested'
          : `Moved to ${status.replace(/_/g, ' ').toLowerCase()}`,
    changedAt: new Date(baseTime + index * 36 * 60 * 60 * 1000).toISOString(),
  }));
}

function buildApplicant(app: MockApplication, index: number): MockApplicantDetail {
  return {
    name: app.applicant.name,
    email: app.applicant.email,
    phone: `98765${String(43210 + index).slice(-5)}`,
    dateOfBirth: '1998-06-12',
    gender: index % 2 === 0 ? 'Female' : 'Male',
    category: app.applicant.category,
    tribe: app.applicant.tribe,
    fatherName: 'Demo Father',
    motherName: 'Demo Mother',
    address: '42, Gandhi Nagar',
    district: 'Demo District',
    state: app.applicant.state,
    pincode: '481661',
    stCertificateNumber: `ST/${app.applicant.state.substring(0, 2).toUpperCase()}/2024/12345`,
    annualFamilyIncome: 350000 + (index % 5) * 40000,
    bankName: 'State Bank of India',
    bankAccountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    currentEducationLevel: app.schemeCode === 'NFST' ? 'Post Graduate' : 'Graduate',
    institution: app.schemeCode === 'NFST' ? 'Rani Durgavati University' : 'University of Oxford',
    course: app.schemeCode === 'NFST' ? 'Ph.D. Computer Science' : 'M.Sc. Data Science',
  };
}

function buildDeficiencies(app: MockApplication): MockDeficiency[] {
  if (app.status !== ApplicationStatus.DEFICIENT) return [];
  return [
    {
      id: `${app.id}-def-1`,
      documentType: 'INCOME_CERTIFICATE',
      description: 'The income certificate is blurred and the income amount is not legible. Please upload a clearer copy.',
      status: 'OPEN',
      createdByName: 'Priya Sharma (Scrutiny Officer)',
      createdAt: new Date(new Date(app.createdAt).getTime() + 8 * 36 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export function getApplicationDetail(id: string): MockApplicationDetail | undefined {
  const index = MOCK_APPLICATIONS.findIndex((a) => a.id === id);
  if (index === -1) return undefined;
  const app = MOCK_APPLICATIONS[index];

  return {
    ...app,
    applicantDetail: buildApplicant(app, index),
    fields: app.schemeCode === 'NFST' ? NFST_FIELDS : NOS_FIELDS,
    documents: buildDocuments(app),
    eligibilityResults: buildEligibility(app),
    deficiencies: buildDeficiencies(app),
    statusHistory: buildStatusHistory(app),
  };
}

export function getApplicationIds(): string[] {
  return MOCK_APPLICATIONS.map((a) => a.id);
}
