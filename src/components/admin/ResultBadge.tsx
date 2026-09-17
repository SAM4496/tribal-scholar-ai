import { type VerificationStatus, type DocumentStatus } from '@/types';
import { cn } from '@/lib/utils';

type ResultStatus = VerificationStatus | DocumentStatus | string;

const STYLES: Record<string, string> = {
  PASS: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  VERIFIED: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  FAIL: 'bg-red-50 text-red-700 ring-red-200',
  FAILED: 'bg-red-50 text-red-700 ring-red-200',
  REJECTED: 'bg-red-50 text-red-700 ring-red-200',
  NEEDS_REVIEW: 'bg-amber-50 text-amber-700 ring-amber-200',
  PROCESSING: 'bg-blue-50 text-blue-700 ring-blue-200',
  UPLOADED: 'bg-slate-100 text-slate-600 ring-slate-200',
};

const DOTS: Record<string, string> = {
  PASS: 'bg-emerald-500',
  VERIFIED: 'bg-emerald-500',
  FAIL: 'bg-red-500',
  FAILED: 'bg-red-500',
  REJECTED: 'bg-red-500',
  NEEDS_REVIEW: 'bg-amber-500',
  PROCESSING: 'bg-blue-500 animate-pulse-soft',
  UPLOADED: 'bg-slate-400',
};

const LABELS: Record<string, string> = {
  PASS: 'Pass',
  VERIFIED: 'Verified',
  FAIL: 'Fail',
  FAILED: 'Failed',
  REJECTED: 'Rejected',
  NEEDS_REVIEW: 'Needs Review',
  PROCESSING: 'Processing',
  UPLOADED: 'Uploaded',
};

export default function ResultBadge({ status }: { status: ResultStatus }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        STYLES[status] ?? 'bg-slate-100 text-slate-600 ring-slate-200'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', DOTS[status] ?? 'bg-slate-400')} />
      {LABELS[status] ?? status.replace(/_/g, ' ')}
    </span>
  );
}
