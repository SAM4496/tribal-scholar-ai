// Demo notifications for the applicant portal.

export type ApplicantNotificationType =
  | 'STATUS_UPDATE'
  | 'DEFICIENCY'
  | 'APPROVAL'
  | 'GENERAL';

export interface ApplicantNotification {
  id: string;
  type: ApplicantNotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  applicationId?: string;
}

export const APPLICANT_NOTIFICATIONS: ApplicantNotification[] = [
  {
    id: 'not-001',
    type: 'DEFICIENCY',
    title: 'Action required — NFC-2026-00012',
    message:
      'The income certificate you uploaded is illegible in the income amount field. Please upload a clearer copy within 7 days.',
    createdAt: '2026-09-14T09:30:00Z',
    isRead: false,
    applicationId: 'app-00012',
  },
  {
    id: 'not-002',
    type: 'STATUS_UPDATE',
    title: 'Application under document verification',
    message:
      'Your NFST application NFST-2026-00001 has moved to document verification. Documents are being cross-checked by the AI review engine.',
    createdAt: '2026-09-10T11:00:00Z',
    isRead: false,
    applicationId: 'app-00001',
  },
  {
    id: 'not-003',
    type: 'STATUS_UPDATE',
    title: 'Your application reached selection stage',
    message:
      'NOS application NOS-2026-00008 has been shortlisted and is now being scored in the selection stage.',
    createdAt: '2026-09-08T16:20:00Z',
    isRead: true,
    applicationId: 'app-00008',
  },
  {
    id: 'not-004',
    type: 'APPROVAL',
    title: 'Congratulations — scholarship approved 🎉',
    message:
      'Your application NOS-2026-00009 has been approved. Your scholarship is confirmed.',
    createdAt: '2026-09-07T10:00:00Z',
    isRead: true,
    applicationId: 'app-00009',
  },
  {
    id: 'not-005',
    type: 'GENERAL',
    title: 'New applications window open',
    message:
      'The National Overseas Scholarship (NOS) 2026 window is open until 31 December 2026.',
    createdAt: '2026-09-05T08:00:00Z',
    isRead: true,
  },
  {
    id: 'not-006',
    type: 'STATUS_UPDATE',
    title: 'Application rejected',
    message:
      'Your NFST application NFST-2026-00016 was rejected during the review process.',
    createdAt: '2026-09-03T12:00:00Z',
    isRead: true,
    applicationId: 'app-00016',
  },
];