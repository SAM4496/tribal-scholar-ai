'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSchemes, type Scheme } from '@/lib/mock-schemes';
import { cn } from '@/lib/utils';

const APPLIED_STORAGE_KEY = 'tsa-applied-schemes';

type StatusFilter = 'all' | 'OPEN' | 'CLOSED';

export default function SchemesPage() {
  const router = useRouter();
  const schemes = useMemo(() => getSchemes(), []);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [detail, setDetail] = useState<Scheme | null>(null);
  const [applied, setApplied] = useState<Set<string>>(
    () => new Set<string>()
  );
  const [justApplied, setJustApplied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return schemes.filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (!term) return true;
      return (
        s.name.toLowerCase().includes(term) ||
        s.shortName.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.level.toLowerCase().includes(term)
      );
    });
  }, [schemes, search, statusFilter]);

  const openCount = schemes.filter((s) => s.status === 'OPEN').length;

  function loadApplied() {
    try {
      const raw = window.localStorage.getItem(APPLIED_STORAGE_KEY);
      if (raw) setApplied(new Set(JSON.parse(raw) as string[]));
    } catch {
      // ignore
    }
  }

  function handleApply(scheme: Scheme) {
    if (applied.has(scheme.code)) return;
    const next = new Set(applied);
    next.add(scheme.code);
    setApplied(next);
    try {
      window.localStorage.setItem(APPLIED_STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // ignore
    }
    setDetail(null);
    setJustApplied(scheme.code);
    window.setTimeout(() => router.push('/applicant/applications'), 1400);
  }

  const statusFilterButtons: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All schemes' },
    { key: 'OPEN', label: 'Open' },
    { key: 'CLOSED', label: 'Closed' },
  ];

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
              Browse Schemes
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Explore open scholarships for Scheduled Tribe students. Pick a scheme to view
              eligibility and required documents.
            </p>
          </div>
          <span className="chip shrink-0 bg-emerald-100 text-emerald-700">
            ● {openCount} open now
          </span>
        </div>
        <div className="divider-accent mt-5 h-[3px] w-full" />
      </div>

      {/* Success toast */}
      {justApplied && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 animate-fade-in" role="status">
          <span className="text-lg">✅</span>
          Application started for {schemes.find((s) => s.code === justApplied)?.name}. Taking you
          to your applications…
        </div>
      )}

      {/* Search + filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes…"
            className="input pl-10"
          />
        </div>
        <div className="flex w-fit items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm">
          {statusFilterButtons.map((b) => (
            <button
              key={b.key}
              onClick={() => setStatusFilter(b.key)}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95',
                statusFilter === b.key
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((scheme, index) => {
            const isApplied = applied.has(scheme.code);
            return (
              <article
                key={scheme.code}
                className="card card-hover animate-fade-in-up flex flex-col p-6"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-2xl', scheme.tint)}>
                    {scheme.emoji}
                  </span>
                  <span
                    className={cn(
                      'chip whitespace-nowrap',
                      scheme.status === 'OPEN'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {scheme.status === 'OPEN' ? '● Open' : 'Closed'}
                  </span>
                </div>

                <h3 className="section-title mt-4">{scheme.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  {scheme.code} · {scheme.level}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
                  {scheme.description}
                </p>

                <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-medium text-slate-400">Funding</dt>
                    <dd className="text-right text-xs font-medium text-slate-700">{scheme.funding}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-medium text-slate-400">Deadline</dt>
                    <dd className="text-xs font-medium text-slate-700">{scheme.deadline}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-xs font-medium text-slate-400">Requirements</dt>
                    <dd className="text-xs font-medium text-slate-700">
                      {scheme.eligibility.length} eligibility · {scheme.documents.length} documents
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-5">
                  <button
                    onClick={() => {
                      loadApplied();
                      setDetail(scheme);
                    }}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 active:scale-95"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => (isApplied ? router.push('/applicant/applications') : handleApply(scheme))}
                    disabled={scheme.status !== 'OPEN' || isApplied}
                    className={cn(
                      'flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition-all duration-200 active:scale-95',
                      scheme.status !== 'OPEN'
                        ? 'cursor-not-allowed bg-slate-300'
                        : isApplied
                          ? 'bg-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md shadow-blue-700/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/30'
                    )}
                  >
                    {isApplied ? 'Applied ✓' : scheme.status === 'OPEN' ? 'Apply' : 'Closed'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card mt-6 p-12 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🔍
          </div>
          <h3 className="section-title mt-4">No schemes found</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            {search
              ? `Nothing matches “${search}”. Try a different search term.`
              : 'No schemes under this status right now.'}
          </p>
          {(search || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-5 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Help strip */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">💡</span>
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-800">Not sure which scheme fits you?</p>
          <p className="mt-1 leading-relaxed">
            Use “View details” to check eligibility and document needs before applying. Your saved
            profile and verified documents are reused across all applications automatically.
          </p>
          <Link href="/applicant/profile" className="mt-2 inline-block font-medium text-blue-700 hover:text-blue-800">
            Review my profile →
          </Link>
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setDetail(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-scale-in sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl text-3xl', detail.tint)}>
                  {detail.emoji}
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-slate-900">
                    {detail.name}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-slate-400">
                    {detail.code} · {detail.level}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">{detail.description}</p>

            <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-slate-400">Funding</p>
                <p className="mt-1 font-medium text-slate-800">{detail.funding}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Deadline</p>
                <p className="mt-1 font-medium text-slate-800">{detail.deadline}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Status</p>
                <span className={cn('chip mt-0.5', detail.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600')}>
                  {detail.status === 'OPEN' ? 'Open for applications' : 'Closed'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="eyebrow mb-3">Eligibility criteria</h3>
              <ul className="space-y-2">
                {detail.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[0.6rem] font-bold text-emerald-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="eyebrow mb-3">Required documents</h3>
              <div className="flex flex-wrap gap-2">
                {detail.documents.map((doc) => (
                  <span key={doc} className="chip bg-white text-slate-600 ring-1 ring-slate-200">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDetail(null)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300"
              >
                Close
              </button>
              {detail.status === 'OPEN' ? (
                applied.has(detail.code) ? (
                  <button
                    onClick={() => router.push('/applicant/applications')}
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-emerald-500/20 transition-all duration-200 hover:shadow-lg"
                  >
                    Applied — View my applications →
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(detail)}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
                  >
                    Start application →
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-slate-300 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Applications closed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}