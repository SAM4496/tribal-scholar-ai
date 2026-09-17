// Aggregated demo analytics for the Admin Reports page (/admin/reports).
// Derived from the shared mock applications so every chart tells one story.

import { ApplicationStatus, DocumentStatus } from '@/types';
import { MOCK_APPLICATIONS } from './mock-data';
import { getApplicationDetail } from './mock-application-details';

export interface TrendPoint {
  label: string;
  value: number;
}

export interface Slice {
  label: string;
  value: number;
  color: string;
}

export interface Kpis {
  total: number;
  approved: number;
  approvalRate: number;
  avgProcessingDays: number;
  deficiencyRate: number;
  aiVerifiedRate: number;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function applicationDate(app: (typeof MOCK_APPLICATIONS)[number]): number {
  return new Date(app.submittedAt ?? app.createdAt).getTime();
}

export function getApplicationsOverTime(weeks = 6): TrendPoint[] {
  const timestamps = MOCK_APPLICATIONS.map(applicationDate);
  const latest = Math.max(...timestamps);

  const buckets = Array.from({ length: weeks }, (_, index) => {
    const end = latest - (weeks - 1 - index) * WEEK_MS;
    const start = end - WEEK_MS;
    const count = timestamps.filter((ts) => ts > start && ts <= end).length;
    return {
      label: new Date(end).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      value: count,
    };
  });

  return buckets;
}

export function getSchemeSplit(): Slice[] {
  const colors: Record<string, string> = { NFST: '#2563eb', NOS: '#10b981' };
  const counts = new Map<string, number>();
  for (const app of MOCK_APPLICATIONS) {
    counts.set(app.schemeCode, (counts.get(app.schemeCode) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([label, value]) => ({
    label,
    value,
    color: colors[label] ?? '#94a3b8',
  }));
}

export function getTopStates(limit = 6): Slice[] {
  const counts = new Map<string, number>();
  for (const app of MOCK_APPLICATIONS) {
    counts.set(app.applicant.state, (counts.get(app.applicant.state) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value, color: '#2563eb' }));
}

export function getKpis(): Kpis {
  const total = MOCK_APPLICATIONS.length;
  const approved = MOCK_APPLICATIONS.filter(
    (app) => app.status === ApplicationStatus.APPROVED || app.status === ApplicationStatus.SELECTED
  ).length;
  const deficient = MOCK_APPLICATIONS.filter(
    (app) => app.status === ApplicationStatus.DEFICIENT
  ).length;

  let totalDays = 0;
  let measured = 0;
  let documents = 0;
  let verifiedDocuments = 0;

  for (const app of MOCK_APPLICATIONS) {
    const detail = getApplicationDetail(app.id);
    if (!detail) continue;

    if (detail.statusHistory.length > 1) {
      const first = new Date(detail.statusHistory[0].changedAt).getTime();
      const last = new Date(detail.statusHistory[detail.statusHistory.length - 1].changedAt).getTime();
      totalDays += (last - first) / (24 * 60 * 60 * 1000);
      measured += 1;
    }

    documents += detail.documents.length;
    verifiedDocuments += detail.documents.filter((d) => d.status === DocumentStatus.VERIFIED).length;
  }

  return {
    total,
    approved,
    approvalRate: total > 0 ? approved / total : 0,
    avgProcessingDays: measured > 0 ? totalDays / measured : 0,
    deficiencyRate: total > 0 ? deficient / total : 0,
    aiVerifiedRate: documents > 0 ? verifiedDocuments / documents : 0,
  };
}
