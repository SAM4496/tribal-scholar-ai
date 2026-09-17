// Mock data for the Admin Document Verification queue (/admin/documents).
// Aggregates documents across every application so reviewers get one worklist.
// Replace getDocumentQueue() with GET /api/documents once the backend exists.

import { DocumentStatus, VerificationStatus } from '@/types';
import { MOCK_APPLICATIONS } from './mock-data';
import { getApplicationDetail, type MockDocument } from './mock-application-details';

export interface DocumentQueueItem {
  id: string;
  applicationId: string;
  applicationNumber: string;
  applicantName: string;
  schemeCode: 'NFST' | 'NOS';
  documentType: string;
  documentName: string;
  fileName: string;
  sizeKB: number;
  status: DocumentStatus;
  uploadedAt: string;
  confidence: number | null;
  verificationStatus: VerificationStatus | null;
  verificationType: 'AI' | 'MANUAL' | null;
  document: MockDocument;
}

export interface DocumentQueueStats {
  total: number;
  verified: number;
  processing: number;
  needsReview: number;
  avgConfidence: number;
}

export function getDocumentQueue(): DocumentQueueItem[] {
  return MOCK_APPLICATIONS.flatMap((app) => {
    const detail = getApplicationDetail(app.id);
    if (!detail) return [];

    return detail.documents.map((document) => ({
      id: document.id,
      applicationId: app.id,
      applicationNumber: app.applicationNumber,
      applicantName: app.applicant.name,
      schemeCode: app.schemeCode,
      documentType: document.documentType,
      documentName: document.documentName,
      fileName: document.fileName,
      sizeKB: document.sizeKB,
      status: document.status,
      uploadedAt: document.uploadedAt,
      confidence: document.verification?.confidenceScore ?? document.ocrResult?.confidence ?? null,
      verificationStatus: document.verification?.verificationStatus ?? null,
      verificationType: document.verification?.verificationType ?? null,
      document,
    }));
  });
}

export function getDocumentStats(items: DocumentQueueItem[]): DocumentQueueStats {
  const scored = items.filter((item) => item.confidence !== null);
  const avgConfidence =
    scored.length > 0
      ? scored.reduce((sum, item) => sum + (item.confidence ?? 0), 0) / scored.length
      : 0;

  return {
    total: items.length,
    verified: items.filter((item) => item.status === DocumentStatus.VERIFIED).length,
    processing: items.filter(
      (item) => item.status === DocumentStatus.PROCESSING || item.status === DocumentStatus.UPLOADED
    ).length,
    needsReview: items.filter(
      (item) =>
        item.status === DocumentStatus.NEEDS_REVIEW ||
        item.status === DocumentStatus.FAILED ||
        item.status === DocumentStatus.REJECTED
    ).length,
    avgConfidence,
  };
}

export function documentTypeLabel(type: string): string {
  return type
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}
