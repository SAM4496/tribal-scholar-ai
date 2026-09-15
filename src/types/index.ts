// TypeScript type definitions shared across the project

// ============ ENUMS ============

export enum UserRole {
  APPLICANT = 'APPLICANT',
  SCRUTINY_OFFICER = 'SCRUTINY_OFFICER',
  SELECTION_OFFICER = 'SELECTION_OFFICER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_DOCUMENT_VERIFICATION = 'UNDER_DOCUMENT_VERIFICATION',
  UNDER_ELIGIBILITY_CHECK = 'UNDER_ELIGIBILITY_CHECK',
  ELIGIBLE = 'ELIGIBLE',
  INELIGIBLE = 'INELIGIBLE',
  DEFICIENT = 'DEFICIENT',
  UNDER_SCRUTINY = 'UNDER_SCRUTINY',
  SCRUTINY_COMPLETE = 'SCRUTINY_COMPLETE',
  UNDER_SCREENING = 'UNDER_SCREENING',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum DocumentStatus {
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
  NEEDS_REVIEW = 'NEEDS_REVIEW',
  REJECTED = 'REJECTED',
}

export enum VerificationStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  NEEDS_REVIEW = 'NEEDS_REVIEW',
}

export enum OcrStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum DeficiencyStatus {
  OPEN = 'OPEN',
  RESPONDED = 'RESPONDED',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export enum NotificationType {
  STATUS_UPDATE = 'STATUS_UPDATE',
  DEFICIENCY = 'DEFICIENCY',
  APPROVAL = 'APPROVAL',
  GENERAL = 'GENERAL',
}

export enum RuleType {
  AGE = 'AGE',
  INCOME = 'INCOME',
  EDUCATION = 'EDUCATION',
  CATEGORY = 'CATEGORY',
  DOCUMENT = 'DOCUMENT',
  CUSTOM = 'CUSTOM',
}

export enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  SELECT = 'SELECT',
  FILE = 'FILE',
  TEXTAREA = 'TEXTAREA',
}

// ============ API RESPONSE TYPES ============

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============ NAVIGATION ============

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
}
