// Mock audit trail for the Admin Audit Log page (/admin/audit).
// Derived from the same demo data as the rest of the admin portal so the
// timeline is internally consistent. Replace getAuditLog() with GET /api/audit.

import { ApplicationStatus, DocumentStatus } from '@/types';
import { MOCK_APPLICATIONS } from './mock-data';
import { getApplicationDetail } from './mock-application-details';

export type AuditActionType =
  | 'APPLICATION'
  | 'DOCUMENT'
  | 'DEFICIENCY'
  | 'SELECTION'
  | 'AUTH'
  | 'SYSTEM';

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface MockAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  actionType: AuditActionType;
  entityType: string;
  entityId: string;
  applicationNumber?: string;
  description: string;
  ipAddress: string;
  severity: AuditSeverity;
}

function roleFor(actor: string): string {
  if (actor.includes('Scrutiny Officer')) return 'Scrutiny Officer';
  if (actor.includes('Selection Officer')) return 'Selection Officer';
  if (actor.includes('Administrator')) return 'Administrator';
  if (actor === 'Applicant') return 'Applicant';
  return 'System';
}

function ipFor(seed: number): string {
  return `10.14.${(seed % 12) + 1}.${(seed * 37) % 254}`;
}

export function getAuditLog(): MockAuditEntry[] {
  const entries: MockAuditEntry[] = [];
  let seed = 1;

  for (const app of MOCK_APPLICATIONS) {
    const detail = getApplicationDetail(app.id);
    if (!detail) continue;

    detail.statusHistory.forEach((entry, index) => {
      seed += 1;
      const actor = entry.changedByName;
      const toStatus = entry.toStatus as ApplicationStatus;
      const isFinal = toStatus === ApplicationStatus.APPROVED || toStatus === ApplicationStatus.REJECTED;

      entries.push({
        id: `audit-${app.id}-h${index}`,
        timestamp: entry.changedAt,
        actor,
        role: roleFor(actor),
        action: `Status → ${entry.toStatus.replace(/_/g, ' ')}`,
        actionType: isFinal ? 'SELECTION' : 'APPLICATION',
        entityType: 'Application',
        entityId: app.applicationNumber,
        applicationNumber: app.applicationNumber,
        description: entry.remarks,
        ipAddress: ipFor(seed),
        severity: toStatus === ApplicationStatus.REJECTED ? 'WARNING' : 'INFO',
      });
    });

    detail.documents.forEach((document, index) => {
      if (!document.verification) return;
      seed += 1;
      const flagged =
        document.status === DocumentStatus.NEEDS_REVIEW ||
        document.verification.verificationStatus === 'FAIL';

      entries.push({
        id: `audit-${app.id}-d${index}`,
        timestamp: new Date(new Date(app.createdAt).getTime() + (index + 1) * 20 * 60 * 60 * 1000).toISOString(),
        actor: 'AI/OCR Service',
        role: 'System',
        action: flagged ? 'Document flagged' : 'Document verified',
        actionType: 'DOCUMENT',
        entityType: 'Document',
        entityId: document.documentName,
        applicationNumber: app.applicationNumber,
        description: flagged
          ? `${document.documentName} could not be verified automatically — manual review required`
          : `${document.documentName} verified with ${Math.round(document.verification.confidenceScore * 100)}% confidence`,
        ipAddress: ipFor(seed),
        severity: flagged ? 'WARNING' : 'INFO',
      });
    });

    detail.deficiencies.forEach((deficiency, index) => {
      seed += 1;
      entries.push({
        id: `audit-${app.id}-def${index}`,
        timestamp: deficiency.createdAt,
        actor: deficiency.createdByName,
        role: roleFor(deficiency.createdByName),
        action: 'Deficiency raised',
        actionType: 'DEFICIENCY',
        entityType: 'Deficiency',
        entityId: deficiency.documentType,
        applicationNumber: app.applicationNumber,
        description: deficiency.description,
        ipAddress: ipFor(seed),
        severity: 'WARNING',
      });
    });
  }

  const base = Date.now() - 6 * 24 * 60 * 60 * 1000;
  const systemEntries: MockAuditEntry[] = [
    {
      id: 'audit-auth-1',
      timestamp: new Date(base).toISOString(),
      actor: 'Priya Sharma',
      role: 'Scrutiny Officer',
      action: 'User login',
      actionType: 'AUTH',
      entityType: 'Session',
      entityId: 'scrutiny@demo.com',
      description: 'Successful sign-in from government network',
      ipAddress: ipFor(3),
      severity: 'INFO',
    },
    {
      id: 'audit-auth-2',
      timestamp: new Date(base + 2 * 60 * 60 * 1000).toISOString(),
      actor: 'Unknown',
      role: 'Unknown',
      action: 'Failed login attempt',
      actionType: 'AUTH',
      entityType: 'Session',
      entityId: 'admin@demo.com',
      description: '3 consecutive failed sign-in attempts detected',
      ipAddress: '203.0.113.42',
      severity: 'CRITICAL',
    },
    {
      id: 'audit-system-1',
      timestamp: new Date(base + 30 * 60 * 60 * 1000).toISOString(),
      actor: 'System',
      role: 'System',
      action: 'Data export',
      actionType: 'SYSTEM',
      entityType: 'Report',
      entityId: 'monthly-applications.csv',
      description: 'Administrator exported the monthly applications report',
      ipAddress: ipFor(7),
      severity: 'INFO',
    },
  ];

  return [...entries, ...systemEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export interface AuditStats {
  total: number;
  today: number;
  warnings: number;
  critical: number;
}

export function getAuditStats(entries: MockAuditEntry[]): AuditStats {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  return {
    total: entries.length,
    today: entries.filter((entry) => new Date(entry.timestamp) >= startOfDay).length,
    warnings: entries.filter((entry) => entry.severity === 'WARNING').length,
    critical: entries.filter((entry) => entry.severity === 'CRITICAL').length,
  };
}
