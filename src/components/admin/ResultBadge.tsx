import { type VerificationStatus, type DocumentStatus } from '@/types';
import { cn } from '@/lib/utils';

type ResultStatus = VerificationStatus | DocumentStatus | string;

const STYLES: Record<string, string> = {
  PASS: 'bg-green-100 text-green-700',
  VERIFIED: 'bg-green-100 text-green-700',
  FAIL: 'bg-red-100 text-red-700',
  FAILED: 'bg-red-100 text-red-700',
  REJECTED: 'bg-red-100 text-red-700',
  NEEDS_REVIEW: 'bg-amber-100 text-amber-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  UPLOADED: 'bg-gray-100 text-gray-600',
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
        'inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
        STYLES[status] ?? 'bg-gray-100 text-gray-600'
      )}
    >
      {LABELS[status] ?? status.replace(/_/g, ' ')}
    </span>
  );
}
