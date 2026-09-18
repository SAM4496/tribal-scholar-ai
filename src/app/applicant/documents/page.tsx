'use client';

import { useMemo, useRef, useState } from 'react';
import {
  APPLICANT_DOCUMENTS,
  type ApplicantDocument,
  type ApplicantDocumentStatus,
} from '@/lib/mock-applicant-documents';
import { cn, formatDateTime } from '@/lib/utils';

const STATUS_BADGE: Record<ApplicantDocumentStatus, string> = {
  VERIFIED: 'bg-emerald-100 text-emerald-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  UPLOADED: 'bg-slate-100 text-slate-600',
  NEEDS_REVIEW: 'bg-orange-100 text-orange-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const STATUS_LABEL: Record<ApplicantDocumentStatus, string> = {
  VERIFIED: 'Verified',
  PROCESSING: 'Processing',
  UPLOADED: 'Uploaded',
  NEEDS_REVIEW: 'Needs review',
  REJECTED: 'Rejected',
};

type FilterKey = 'all' | 'verified' | 'attention' | 'processing';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'verified', label: 'Verified' },
  { key: 'processing', label: 'Processing' },
  { key: 'attention', label: 'Needs attention' },
];

function matchesFilter(doc: ApplicantDocument, filter: FilterKey): boolean {
  switch (filter) {
    case 'verified':
      return doc.status === 'VERIFIED';
    case 'processing':
      return doc.status === 'PROCESSING' || doc.status === 'UPLOADED';
    case 'attention':
      return doc.status === 'NEEDS_REVIEW' || doc.status === 'REJECTED';
    default:
      return true;
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<ApplicantDocument[]>(APPLICANT_DOCUMENTS);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [adding, setAdding] = useState(false);
  const [newFileName, setNewFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => {
    const verified = documents.filter((d) => d.status === 'VERIFIED').length;
    const attention = documents.filter(
      (d) => d.status === 'NEEDS_REVIEW' || d.status === 'REJECTED'
    ).length;
    const processing = documents.filter(
      (d) => d.status === 'PROCESSING' || d.status === 'UPLOADED'
    ).length;
    return { total: documents.length, verified, attention, processing };
  }, [documents]);

  const filtered = documents.filter((d) => matchesFilter(d, filter));

  const statCards = [
    { label: 'Total Documents', value: stats.total, tone: 'text-slate-900', icon: '🗂️', tint: 'bg-slate-100 text-slate-600' },
    { label: 'Verified', value: stats.verified, tone: 'text-emerald-600', icon: '✅', tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'Processing', value: stats.processing, tone: 'text-blue-600', icon: '⚙️', tint: 'bg-blue-50 text-blue-600' },
    { label: 'Needs Attention', value: stats.attention, tone: stats.attention > 0 ? 'text-orange-600' : 'text-slate-400', icon: '⚠️', tint: stats.attention > 0 ? 'bg-orange-50 text-orange-500' : 'bg-slate-100 text-slate-400' },
  ];

  function handleFilePicked(file: File | undefined) {
    if (!file) return;
    const now = new Date().toISOString();
    const doc: ApplicantDocument = {
      id: `doc-${Date.now()}`,
      documentType: 'NEW_UPLOAD',
      documentName: newFileName ?? file.name.replace(/\.[^.]+$/, ''),
      fileName: file.name,
      sizeKB: Math.max(1, Math.round(file.size / 1024)),
      uploadedAt: now,
      status: 'UPLOADED',
      confidence: null,
      applicationNumber: 'NFST-2026-00001',
      schemeCode: 'NFST',
    };
    setDocuments((prev) => [doc, ...prev]);
    setAdding(false);
    setNewFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const countFor = (key: FilterKey) =>
    documents.filter((doc) => matchesFilter(doc, key)).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-7 animate-fade-in-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
              Applicant Portal
            </p>
            <h1 className="mt-2.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.9rem]">
              My Documents
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Track verification status and re-upload documents when the scrutiny
              team flags an issue.
            </p>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 11V5M5 8h6" />
              <circle cx="8" cy="8" r="6.5" />
            </svg>
            Upload Document
          </button>
        </div>
        <div className="divider-accent mt-5 h-[3px] w-full" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div key={stat.label} className="card animate-fade-in-up p-4 sm:p-5" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[0.8rem] font-medium text-slate-500">{stat.label}</p>
                <p className={cn('mt-1.5 font-display text-3xl font-bold tracking-tight', stat.tone)}>{stat.value}</p>
              </div>
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', stat.tint)}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI verification banner */}
      <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">🤖</span>
          <div className="text-sm">
            <p className="font-medium text-slate-800">AI-assisted verification is active</p>
            <p className="mt-0.5 text-slate-500">
              Uploaded documents are scanned and cross-checked against your profile automatically.
            </p>
          </div>
        </div>
        <span className="chip shrink-0 bg-white text-blue-700 shadow-sm">PDF · JPG · PNG · max 5 MB</span>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm w-fit">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95',
              filter === f.key
                ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            {f.label}
            <span className={cn('rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold', filter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500')}>
              {countFor(f.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Documents list */}
      {filtered.length > 0 ? (
        <div className="mt-6 space-y-3">
          {filtered.map((doc, index) => {
            const needsAction = doc.status === 'NEEDS_REVIEW' || doc.status === 'REJECTED';
            return (
              <div
                key={doc.id}
                className={cn(
                  'card card-hover animate-fade-in-up p-4 sm:p-5',
                  needsAction && 'border-orange-200'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl', doc.status === 'VERIFIED' ? 'bg-emerald-50' : doc.status === 'PROCESSING' ? 'bg-blue-50' : doc.status === 'UPLOADED' ? 'bg-slate-100' : 'bg-orange-50')}>
                    {needsAction ? '⚠️' : doc.status === 'VERIFIED' ? '✅' : doc.status === 'PROCESSING' ? '⚙️' : '📄'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="section-title">{doc.documentName}</h3>
                      <span className={cn('chip whitespace-nowrap', STATUS_BADGE[doc.status])}>
                        {STATUS_LABEL[doc.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      <span className="font-mono text-slate-400">{doc.applicationNumber}</span>
                      <span className="mx-1.5 text-slate-300">·</span>
                      {doc.fileName} ({doc.sizeKB} KB)
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Uploaded {formatDateTime(doc.uploadedAt)}
                    </p>
                  </div>

                  <div className="shrink-0 md:w-40">
                    {doc.confidence !== null ? (
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">AI confidence</span>
                          <span className="font-semibold text-slate-600">{doc.confidence}%</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              doc.confidence >= 90 ? 'bg-emerald-500' : doc.confidence >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                            )}
                            style={{ width: `${doc.confidence}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-blue-500" />
                        Queued for scan
                      </span>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => setAdding(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setAdding(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                    >
                      Replace
                    </button>
                  </div>
                </div>

                {needsAction && (
                  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-orange-200/70 bg-orange-50/60 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-relaxed text-orange-800">
                      {doc.status === 'REJECTED'
                        ? 'This document was rejected. Upload a valid copy to continue the review.'
                        : 'The verification engine needs a clearer copy. Please upload a revised document.'}
                    </p>
                    <button
                      onClick={() => setAdding(true)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-2 text-xs font-medium text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
                    >
                      Re-upload document
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card mt-6 p-12 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">🗂️</div>
          <h3 className="section-title mt-4">No documents here</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            No documents match this filter. Upload documents to support your applications.
          </p>
        </div>
      )}

      {/* Upload modal */}
      {adding && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setAdding(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="section-title">Upload a document</h3>
              <button
                onClick={() => setAdding(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <div>
              <label htmlFor="docName" className="eyebrow mb-1.5 block">
                Document type
              </label>
              <input
                id="docName"
                type="text"
                value={newFileName ?? ''}
                onChange={(e) => setNewFileName(e.target.value)}
                className="input"
                placeholder="e.g. Income Certificate"
              />
            </div>

            <label
              className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center transition-colors hover:border-blue-300 hover:bg-blue-50/40"
            >
              <span className="text-3xl">📤</span>
              <span className="text-sm font-medium text-slate-700">Choose a file</span>
              <span className="text-xs text-slate-400">PDF, JPG or PNG · up to 5 MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFilePicked(e.target.files?.[0])}
              />
            </label>

            <p className="mt-4 text-xs text-amber-700">
              ⚠️ Prototype: the chosen file is added to your document list locally. Server upload
              will be wired when the live backend is available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}