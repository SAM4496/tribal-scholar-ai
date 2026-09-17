import Link from 'next/link';
import { ApplicationStatus } from '@/types';
import { type ApplicantApplication } from '@/lib/mock-applicant-applications';
import {
  getApplicantAction,
  getApplicantTimeline,
  getMilestoneProgress,
} from '@/lib/mock-applicant-applications';
import { cn, formatDate, formatStatus, getStatusColor } from '@/lib/utils';
import StatusStepper from './StatusStepper';

interface ApplicationCardProps {
  application: ApplicantApplication;
  delayMs?: number;
}

const SCHEME_META: Record<'NFST' | 'NOS', { emoji: string; tint: string }> = {
  NFST: {
    emoji: '🎓',
    tint: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200',
  },
  NOS: {
    emoji: '🌍',
    tint: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
  },
};

export default function ApplicationCard({
  application,
  delayMs = 0,
}: ApplicationCardProps) {
  const meta = SCHEME_META[application.schemeCode];
  const action = getApplicantAction(application);
  const progress = getMilestoneProgress(application.status);
  const isDeficient = application.status === ApplicationStatus.DEFICIENT;
  const timeline = getApplicantTimeline(application);
  const nextUp =
    timeline.find((entry) => entry.tone === 'pending' || entry.tone === 'problem') ??
    timeline[timeline.length - 1];

  return (
    <article
      className="card card-hover animate-fade-in-up flex flex-col p-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl',
              meta.tint
            )}
          >
            {meta.emoji}
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[0.7rem] font-medium tracking-wide text-slate-400">
              {application.applicationNumber}
            </p>
            <h3 className="section-title truncate">{application.schemeName}</h3>
          </div>
        </div>
        <span
          className={cn(
            'chip shrink-0 whitespace-nowrap',
            getStatusColor(application.status)
          )}
        >
          {formatStatus(application.status)}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        <span className="font-medium text-slate-700">{application.course}</span>
        <span className="mx-1.5 text-slate-300">·</span>
        {application.institution}
      </p>

      <div className="mt-5">
        <StatusStepper status={application.status} />
        <div className="mt-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span
              className={cn(
                'font-medium',
                isDeficient ? 'text-orange-600' : 'text-blue-700'
              )}
            >
              {application.currentStage}
            </span>
            <span className="text-slate-400">
              {application.submittedAt
                ? `Submitted ${formatDate(application.submittedAt)}`
                : 'Not submitted yet'}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-700',
                isDeficient
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                  : progress >= 1
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                    : 'progress-shine'
              )}
              style={{ width: `${Math.max(progress * 100, 8)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-500">
        <span className="font-medium text-slate-700">Next: </span>
        {nextUp.title}
        {nextUp.tone === 'problem' && (
          <span className="ml-1.5 rounded bg-orange-100 px-1.5 py-0.5 font-medium text-orange-700">
            Action required
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span
          className={cn(
            'chip bg-slate-100 font-semibold tracking-wider text-slate-600',
            application.schemeCode === 'NFST' && 'text-indigo-700',
            application.schemeCode === 'NOS' && 'text-sky-700'
          )}
        >
          {application.schemeCode}
        </span>
        <Link
          href={action.href}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95',
            action.kind === 'primary' &&
              'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-700/20 hover:shadow-lg hover:shadow-blue-700/30',
            action.kind === 'warning' &&
              'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30',
            action.kind === 'outline' &&
              'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
          )}
        >
          {isDeficient && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
          {action.label}
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </article>
  );
}