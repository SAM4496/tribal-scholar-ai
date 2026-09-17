'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { DocumentStatus } from '@/types';
import {
  type DocumentQueueItem,
  getDocumentStats,
  documentTypeLabel,
} from '@/lib/mock-documents';
import { cn, formatDate } from '@/lib/utils';
import DocumentReview from './DocumentReview';
import ResultBadge from './ResultBadge';

interface DocumentQueueProps {
  items: DocumentQueueItem[];
}

const STATUS_FILTERS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: DocumentStatus.VERIFIED, label: 'Verified' },
  { value: DocumentStatus.PROCESSING, label: 'Processing' },
  { value: DocumentStatus.UPLOADED, label: 'Uploaded' },
  { value: DocumentStatus.NEEDS_REVIEW, label: 'Needs Review' },
];

function confidenceColor(value: number): string {
  if (value >= 0.9) return 'bg-emerald-500';
  if (value >= 0.75) return 'bg-amber-500';
  return 'bg-red-500';
}

function StatCard({
  label,
  value,
  accent,
  delay,
}: {
  label: string;
  value: string | number;
  accent: string;
  delay: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        'animate-fade-in-up card card-hover border-l-4 p-5',
        accent
      )}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{value}</p>
    </div>
  );
}

export default function DocumentQueue({ items }: DocumentQueueProps) {
  const [records, setRecords] = useState(items);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [active, setActive] = useState<DocumentQueueItem | null>(null);

  const types = useMemo(
    () => ['ALL', ...Array.from(new Set(items.map((item) => item.documentType)))],
    [items]
  );

  const stats = useMemo(() => getDocumentStats(records), [records]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((item) => {
      const matchesQuery =
        query === '' ||
        item.documentName.toLowerCase().includes(query) ||
        item.applicationNumber.toLowerCase().includes(query) ||
        item.applicantName.toLowerCase().includes(query);
      const matchesStatus = status === 'ALL' || item.status === status;
      const matchesType = type === 'ALL' || item.documentType === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [records, search, status, type]);

  const setStatusFor = (id: string, next: DocumentStatus) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: next, document: { ...item.document, status: next } } : item))
    );
    setActive((prev) =>
      prev && prev.id === id ? { ...prev, status: next, document: { ...prev.document, status: next } } : prev
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Documents" value={stats.total} accent="border-l-blue-600" delay={0} />
        <StatCard label="Verified" value={stats.verified} accent="border-l-emerald-500" delay={60} />
        <StatCard label="Awaiting Processing" value={stats.processing} accent="border-l-blue-400" delay={120} />
        <StatCard label="Needs Review" value={stats.needsReview} accent="border-l-amber-500" delay={180} />
      </div>

      <div className="mt-4 card animate-fade-in-up animate-delay-200">
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-5 sm:grid-cols-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search document, application # or applicant"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input"
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            {types.map((option) => (
              <option key={option} value={option}>
                {option === 'ALL' ? 'All Document Types' : documentTypeLabel(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Document</th>
                <th className="px-5 py-3">Application</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Uploaded</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-900">{item.documentName}</p>
                    <p className="text-xs text-slate-400">{item.fileName}</p>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/applications/${item.applicationId}`}
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {item.applicationNumber}
                    </Link>
                    <p className="text-xs text-slate-400">{item.applicantName}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {item.schemeCode}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                    {formatDate(item.uploadedAt)}
                  </td>
                  <td className="px-5 py-3">
                    {item.confidence === null ? (
                      <span className="text-xs text-slate-400">â€”</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={cn('h-full animate-grow-x rounded-full', confidenceColor(item.confidence))}
                            style={{ width: `${Math.round(item.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-slate-500">
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <ResultBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setActive(item)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                    No documents match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          Showing {filtered.length} of {records.length} documents Â· Average OCR confidence{' '}
          {Math.round(stats.avgConfidence * 100)}%
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="section-title">{active.documentName}</h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  {active.applicationNumber} Â· {active.applicantName}
                </p>
              </div>
              <ResultBadge status={active.status} />
            </div>

            <div className="p-5">
              <DocumentReview documents={[active.document]} bare />
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setStatusFor(active.id, DocumentStatus.REJECTED)}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => setStatusFor(active.id, DocumentStatus.VERIFIED)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Mark Verified
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
