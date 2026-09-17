'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ApplicationStatus } from '@/types';
import {
  type MockApplicationDetail,
  type MockDeficiency,
  type MockStatusHistoryEntry,
} from '@/lib/mock-application-details';
import { getManualTransitions, isDeficiencyTransition, type StatusTransition } from '@/lib/workflow';
import { cn, formatDate, formatDateTime, formatStatus, getStatusColor } from '@/lib/utils';
import DocumentReview from './DocumentReview';
import EligibilityResults from './EligibilityResults';
import VerificationResults from './VerificationResults';
import StatusChangeDialog from './StatusChangeDialog';

interface ApplicationDetailProps {
  detail: MockApplicationDetail;
}

function Currency({ value }: { value: number }) {
  return (
    <>
      {new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(value)}
    </>
  );
}

export default function ApplicationDetail({ detail }: ApplicationDetailProps) {
  const [status, setStatus] = useState<ApplicationStatus>(detail.status);
  const [history, setHistory] = useState<MockStatusHistoryEntry[]>(detail.statusHistory);
  const [deficiencies, setDeficiencies] = useState<MockDeficiency[]>(detail.deficiencies);
  const [activeTransition, setActiveTransition] = useState<StatusTransition | null>(null);

  const transitions = getManualTransitions(status);
  const fields = detail.fields;

  const fieldSections = useMemo(() => {
    const sections = new Map<string, typeof fields>();
    for (const field of fields) {
      const list = sections.get(field.section) ?? [];
      list.push(field);
      sections.set(field.section, list);
    }
    return Array.from(sections.entries());
  }, [fields]);

  const applicantRows: { label: string; value: ReactNode }[] = [
    { label: 'Email', value: detail.applicantDetail.email },
    { label: 'Phone', value: detail.applicantDetail.phone },
    { label: 'Date of Birth', value: formatDate(detail.applicantDetail.dateOfBirth) },
    { label: 'Gender', value: detail.applicantDetail.gender },
    { label: 'Category', value: detail.applicantDetail.category },
    { label: 'Tribe', value: detail.applicantDetail.tribe },
    { label: 'Father Name', value: detail.applicantDetail.fatherName },
    { label: 'Mother Name', value: detail.applicantDetail.motherName },
    { label: 'Address', value: `${detail.applicantDetail.address}, ${detail.applicantDetail.district}` },
    { label: 'State / Pincode', value: `${detail.applicantDetail.state} — ${detail.applicantDetail.pincode}` },
    { label: 'ST Certificate No.', value: detail.applicantDetail.stCertificateNumber },
    { label: 'Annual Family Income', value: <Currency value={detail.applicantDetail.annualFamilyIncome} /> },
    { label: 'Education Level', value: detail.applicantDetail.currentEducationLevel },
    { label: 'Institution', value: detail.applicantDetail.institution },
    { label: 'Course', value: detail.applicantDetail.course },
    { label: 'Bank', value: `${detail.applicantDetail.bankName} · ${detail.applicantDetail.ifscCode}` },
  ];

  const handleConfirm = (remarks: string) => {
    if (!activeTransition) return;
    const toStatus = activeTransition.to;
    const actor = isDeficiencyTransition(activeTransition)
      ? 'Priya Sharma (Scrutiny Officer)'
      : 'Admin (Demo)';

    setHistory((prev) => [
      ...prev,
      {
        fromStatus: status,
        toStatus,
        changedByName: actor,
        remarks: remarks || (isDeficiencyTransition(activeTransition) ? 'Deficiency created' : 'Status updated'),
        changedAt: new Date().toISOString(),
      },
    ]);

    if (isDeficiencyTransition(activeTransition)) {
      setDeficiencies((prev) => [
        ...prev,
        {
          id: `${detail.id}-def-${prev.length + 1}`,
          documentType: 'INCOME_CERTIFICATE',
          description: remarks,
          status: 'OPEN',
          createdByName: actor,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setStatus(toStatus);
    setActiveTransition(null);
  };

  const openDeficiencies = deficiencies.filter((d) => d.status === 'OPEN' || d.status === 'RESPONDED');

  return (
    <div>
      <Link href="/admin/applications" className="text-sm text-blue-700 hover:underline">
        ← Back to Applications
      </Link>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-3">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{detail.applicationNumber}</h1>
              <span
                className={cn(
                  'inline-block text-xs font-medium px-2.5 py-1 rounded-full',
                  getStatusColor(status)
                )}
              >
                {formatStatus(status)}
              </span>
            </div>
            <p className="text-gray-600 mt-1">
              {detail.applicant.name} · {detail.schemeCode} — {detail.schemeName}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              Stage: {detail.currentStage}
              {detail.submittedAt && ` · Submitted ${formatDate(detail.submittedAt)}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {transitions.map((transition) => {
              const isDanger = transition.to === ApplicationStatus.REJECTED;
              const isDeficiency = isDeficiencyTransition(transition);
              return (
                <button
                  key={transition.to}
                  type="button"
                  onClick={() => setActiveTransition(transition)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    isDanger
                      ? 'border-red-300 text-red-700 hover:bg-red-50'
                      : isDeficiency
                        ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                        : 'border-transparent text-white bg-blue-700 hover:bg-blue-800'
                  )}
                >
                  {transition.label}
                </button>
              );
            })}
            {transitions.length === 0 && (
              <span className="text-sm text-gray-400 self-center">No manual actions for this status</span>
            )}
          </div>
        </div>
      </div>

      {openDeficiencies.length > 0 && (
        <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <h2 className="text-sm font-semibold text-orange-800">
            {openDeficiencies.length} open deficiency{openDeficiencies.length > 1 ? 'ies' : ''}
          </h2>
          {openDeficiencies.map((deficiency) => (
            <p key={deficiency.id} className="text-sm text-orange-700 mt-1">
              <span className="font-medium">{deficiency.documentType.replace(/_/g, ' ')}:</span>{' '}
              {deficiency.description}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {applicantRows.map((row) => (
                <div key={row.label} className="flex justify-between gap-3 text-sm border-b border-gray-50 pb-2">
                  <dt className="text-gray-500">{row.label}</dt>
                  <dd className="text-gray-900 text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Scheme-Specific Details</h2>
            <div className="space-y-5">
              {fieldSections.map(([section, fields]) => (
                <div key={section}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section}</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {fields.map((field) => (
                      <div key={field.fieldCode} className="flex justify-between gap-3 text-sm">
                        <dt className="text-gray-500">{field.label}</dt>
                        <dd className="text-gray-900 text-right">{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <VerificationResults documents={detail.documents} />
          <EligibilityResults results={detail.eligibilityResults} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <DocumentReview documents={detail.documents} />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status History</h2>
          <ol className="relative border-l border-gray-200 ml-2 space-y-4">
            {history.map((entry, index) => (
              <li key={`${entry.toStatus}-${index}`} className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                <p className="text-sm font-medium text-gray-900">{formatStatus(entry.toStatus)}</p>
                <p className="text-xs text-gray-500">
                  {entry.changedByName} · {formatDateTime(entry.changedAt)}
                </p>
                {entry.remarks && <p className="text-xs text-gray-400 mt-0.5">{entry.remarks}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {activeTransition && (
        <StatusChangeDialog
          applicationNumber={detail.applicationNumber}
          fromStatus={status}
          transition={activeTransition}
          onClose={() => setActiveTransition(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
