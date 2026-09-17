import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ApplicationStatus } from '@/types';
import {
  getApplicantApplication,
  getApplicantApplications,
  getApplicantStatusNote,
  getApplicantTimeline,
  getMilestoneProgress,
} from '@/lib/mock-applicant-applications';
import { cn, formatDate, formatStatus, getStatusColor } from '@/lib/utils';
import StatusStepper from '@/components/applicant/StatusStepper';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getApplicantApplications().map((app) => ({ id: app.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const app = getApplicantApplication(id);
  return {
    title: app ? `${app.schemeName} · My Applications` : 'Application not found',
  };
}

const TONE_STYLES: Record<string, string> = {
  done: 'border-emerald-200 bg-emerald-50/80 text-emerald-700',
  current: 'border-blue-200 bg-blue-50/80 text-blue-700',
  pending: 'border-slate-100 bg-white text-slate-400',
  problem: 'border-orange-200 bg-orange-50/80 text-orange-700',
};

const DOT_STYLES: Record<string, string> = {
  done: 'bg-emerald-500 ring-emerald-100',
  current: 'bg-blue-600 ring-blue-100',
  pending: 'bg-slate-200 ring-slate-100',
  problem: 'bg-orange-500 ring-orange-100',
};

export default async function ApplicantApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const app = getApplicantApplication(id);
  if (!app) notFound();

  const timeline = getApplicantTimeline(app);
  const note = getApplicantStatusNote(app.status);
  const progress = getMilestoneProgress(app.status);
  const isDeficient = app.status === ApplicationStatus.DEFICIENT;

  return (
    <div>
      <Link
        href="/applicant/applications"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-700"
      >
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 8H3M7 4 3 8l4 4" />
        </svg>
        Back to My Applications
      </Link>

      {/* Header */}
      <div className="mb-7 mt-5 animate-fade-in-up">
        <p className="eyebrow flex items-center gap-2">
          <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
          Application · {app.schemeCode}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[1.5rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.8rem]">
            {app.schemeName}
          </h1>
          <span className={cn('chip whitespace-nowrap', getStatusColor(app.status))}>
            {formatStatus(app.status)}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-mono text-slate-400">{app.applicationNumber}</span>
          <span className="mx-2 text-slate-300">·</span>
          {app.submittedAt ? `Submitted ${formatDate(app.submittedAt)}` : 'Draft · not yet submitted'}
        </p>
        <div className="divider-accent mt-5 h-[3px] w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Status note + pipeline */}
          <div
            className={cn(
              'card p-6 animate-fade-in-up',
              isDeficient && 'border-orange-200'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Current Status</p>
                <p className="section-title mt-1.5">{app.currentStage}</p>
              </div>
              <div
                className={cn(
                  'chip shrink-0 ring-1 ring-inset',
                  isDeficient
                    ? 'bg-orange-50 text-orange-700 ring-orange-200'
                    : 'bg-blue-50 text-blue-700 ring-blue-200'
                )}
              >
                {Math.round(progress * 100)}%
              </div>
            </div>

            <div className="mt-6">
              <StatusStepper status={app.status} />
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700',
                  isDeficient
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                    : progress >= 1
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                      : 'progress-shine'
                )}
                style={{ width: `${Math.max(progress * 100, 4)}%` }}
              />
            </div>

            <p
              className={cn(
                'mt-5 rounded-xl px-4 py-3 text-sm leading-relaxed',
                isDeficient
                  ? 'border border-orange-200 bg-orange-50/70 text-orange-800'
                  : 'border border-slate-100 bg-slate-50/70 text-slate-600'
              )}
            >
              {note}
            </p>
          </div>

          {/* Summary */}
          <div className="card p-6 animate-fade-in-up">
            <p className="eyebrow">Application Summary</p>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                ['Scheme', app.schemeName],
                ['Scheme Code', app.schemeCode],
                ['Application Number', app.applicationNumber],
                ['Course', app.course],
                ['Institution', app.institution],
                [
                  'Submitted On',
                  app.submittedAt ? formatDate(app.submittedAt) : 'Not submitted',
                ],
                ['Current Stage', app.currentStage],
                [
                  'Application Started',
                  formatDate(app.createdAt),
                ],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-slate-50 pb-3">
                  <dt className="text-xs font-medium text-slate-400">{label}</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Action cards */}
          {isDeficient && (
            <div className="card animate-fade-in-up overflow-hidden border-orange-200">
              <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4">
                <p className="section-title flex items-center gap-2 text-orange-800">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  Action Required — Deficiency Raised
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 rounded-xl border border-orange-200/70 bg-orange-50/60 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-lg">
                    📄
                  </span>
                  <div className="min-w-0 text-sm text-slate-600">
                    <p className="font-medium text-slate-800">Income Certificate</p>
                    <p className="mt-1 leading-relaxed">
                      The income certificate is blurred and the income amount is not
                      legible. Upload a clearer copy to continue the review.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href="/applicant/documents"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
                  >
                    Upload Revised Document
                  </Link>
                  <span className="text-xs text-slate-400">
                    Documents page is under development in this prototype.
                  </span>
                </div>
              </div>
            </div>
          )}

          {!isDeficient && app.status === ApplicationStatus.DRAFT && (
            <div className="card animate-fade-in-up p-6">
              <p className="section-title text-slate-800">Ready to submit?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Finish filling out the application form and submit it to begin the
                review process. You can save your progress and come back anytime.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/applicant/schemes"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
                >
                  Continue Application
                </Link>
                <Link
                  href="/applicant/schemes"
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                >
                  View Scheme Details
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Timeline column */}
        <div className="card h-fit p-6 animate-fade-in-up">
          <p className="eyebrow">Status Timeline</p>
          <ol className="mt-5 space-y-0">
            {timeline.map((entry, index) => (
              <li key={entry.title} className="relative flex gap-4 pb-6 last:pb-0">
                {index < timeline.length - 1 && (
                  <span
                    className={cn(
                      'absolute left-[0.4375rem] top-3 h-full w-px',
                      entry.tone === 'done' || (index === 0 && timeline[index + 1].tone === 'done')
                        ? 'bg-emerald-200'
                        : 'bg-slate-200'
                    )}
                  />
                )}
                <span
                  className={cn(
                    'relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4',
                    DOT_STYLES[entry.tone]
                  )}
                />
                <div
                  className={cn(
                    'min-w-0 flex-1 rounded-xl border px-3.5 py-3',
                    entry.tone === 'pending' ? 'border-slate-100' : TONE_STYLES[entry.tone]
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        entry.tone === 'pending' ? 'text-slate-400' : 'text-slate-800'
                      )}
                    >
                      {entry.title}
                    </p>
                    {entry.date && (
                      <span className="text-[0.7rem] font-medium text-slate-400">
                        {formatDate(entry.date)}
                      </span>
                    )}
                </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}