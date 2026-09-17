'use client';

import { useState } from 'react';
import { type MockDeficiencyRecord } from '@/lib/mock-deficiencies';
import { formatDateTime } from '@/lib/utils';
import { DeficiencyStatusBadge } from './DeficiencyList';

interface DeficiencyReviewPanelProps {
  record: MockDeficiencyRecord;
  onClose: () => void;
  onResolve: (remarks: string) => void;
  onReject: (remarks: string) => void;
}

export default function DeficiencyReviewPanel({
  record,
  onClose,
  onResolve,
  onReject,
}: DeficiencyReviewPanelProps) {
  const [remarks, setRemarks] = useState('');
  const canAct = record.status === 'RESPONDED' || record.status === 'OPEN';
  const requiresRemarks = record.status === 'RESPONDED';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="section-title">Deficiency Review</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {record.applicationNumber} · {record.applicantName}
            </p>
          </div>
          <DeficiencyStatusBadge status={record.status} />
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="eyebrow mb-1">
              Flagged Document
            </h3>
            <p className="text-sm text-slate-900">{record.documentType.replace(/_/g, ' ')}</p>
          </div>

          <div>
            <h3 className="eyebrow mb-1">
              Officer Description
            </h3>
            <p className="text-sm text-slate-700">{record.description}</p>
            <p className="text-xs text-slate-400 mt-1">
              {record.createdByName} · {formatDateTime(record.createdAt)}
            </p>
          </div>

          {record.responseText ? (
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3">
              <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                Applicant Response
              </h3>
              <p className="text-sm text-slate-700">{record.responseText}</p>
              {record.responseDocumentName && (
                <p className="text-xs text-slate-500 mt-1">
                  Replacement document:{' '}
                  <span className="font-medium text-slate-700">{record.responseDocumentName}</span>
                </p>
              )}
              {record.respondedAt && (
                <p className="text-xs text-slate-400 mt-1">Responded {formatDateTime(record.respondedAt)}</p>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-sm text-slate-500">
              Awaiting applicant response.
            </div>
          )}

          {record.resolvedAt && (
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
              <p className="text-xs text-slate-500">
                {record.status === 'RESOLVED' ? 'Resolved' : 'Rejected'} by {record.resolvedByName} ·{' '}
                {formatDateTime(record.resolvedAt)}
              </p>
              {record.remarks && <p className="text-sm text-slate-700 mt-1">{record.remarks}</p>}
            </div>
          )}

          {canAct && (
            <div>
              <label htmlFor="review-remarks" className="block text-sm font-medium text-slate-700 mb-1">
                {requiresRemarks ? 'Remarks' : 'Reason for rejection (optional)'}
              </label>
              <textarea
                id="review-remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={2}
                placeholder="Add a note for the audit trail…"
                className="input"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
          >
            Close
          </button>
          {canAct && (
            <>
              <button
                type="button"
                onClick={() => onReject(remarks.trim())}
                className="px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
              >
                Reject
              </button>
              {record.status === 'RESPONDED' && (
                <button
                  type="button"
                  onClick={() => onResolve(remarks.trim())}
                  disabled={requiresRemarks && remarks.trim() === ''}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mark Resolved
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
