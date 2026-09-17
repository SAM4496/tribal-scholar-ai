import { DocumentStatus, VerificationStatus } from '@/types';
import { type MockDocument } from '@/lib/mock-application-details';
import { cn } from '@/lib/utils';

interface VerificationResultsProps {
  documents: MockDocument[];
}

export default function VerificationResults({ documents }: VerificationResultsProps) {
  const withVerification = documents.filter((d) => d.verification);
  const confidenceValues = withVerification
    .map((d) => d.verification?.confidenceScore ?? 0)
    .filter((value) => value > 0);
  const averageConfidence =
    confidenceValues.length > 0
      ? confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length
      : 0;

  const aggregateChecks = ['Document Quality', 'Name Match', 'Authenticity'].map((label) => {
    const relevant = withVerification.filter((d) =>
      d.verification?.checks.some((c) => c.label === label)
    );
    const passed = relevant.filter(
      (d) => d.verification?.checks.find((c) => c.label === label)?.status === VerificationStatus.PASS
    );
    return { label, total: relevant.length, passed: passed.length };
  });

  const verifiedCount = documents.filter((d) => d.status === DocumentStatus.VERIFIED).length;
  const reviewCount = documents.filter((d) => d.status === DocumentStatus.NEEDS_REVIEW).length;

  const confidenceGradient =
    averageConfidence >= 0.85
      ? 'from-emerald-400 to-teal-600'
      : averageConfidence >= 0.6
        ? 'from-amber-400 to-orange-500'
        : 'from-rose-400 to-red-600';

  const tiles = [
    {
      label: 'Documents',
      value: documents.length,
      tile: 'from-slate-100 to-white',
      text: 'text-slate-900',
      ring: 'border-slate-200',
    },
    {
      label: 'Verified',
      value: verifiedCount,
      tile: 'from-emerald-50 to-white',
      text: 'text-emerald-700',
      ring: 'border-emerald-200',
    },
    {
      label: 'Need Review',
      value: reviewCount,
      tile: 'from-amber-50 to-white',
      text: 'text-amber-700',
      ring: 'border-amber-200',
    },
  ];

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="section-title">AI Verification Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Automated results — human review retained</p>
        </div>
        <span className="chip shrink-0 bg-blue-50 text-blue-700">AI</span>
      </div>

      <div className="mb-5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm text-slate-600">Overall confidence</span>
          <span className="font-display text-xl font-bold tabular-nums text-slate-900">
            {averageConfidence > 0 ? `${Math.round(averageConfidence * 100)}%` : '—'}
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-white ring-1 ring-inset ring-slate-200">
          <div
            className={cn('h-full animate-grow-x rounded-full bg-gradient-to-r', confidenceGradient)}
            style={{ width: `${Math.round(averageConfidence * 100)}%` }}
          />
        </div>
      </div>

      <div className="space-y-3.5">
        {aggregateChecks.map((check, index) => {
          const percentage = check.total > 0 ? Math.round((check.passed / check.total) * 100) : 0;
          return (
            <div key={check.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-slate-600">{check.label}</span>
                <span className="tabular-nums text-slate-500">
                  {check.passed}/{check.total} passed
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full animate-grow-x rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  style={{ width: `${percentage}%`, animationDelay: `${index * 80}ms` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={cn('rounded-xl border bg-gradient-to-br p-3 text-center', tile.tile, tile.ring)}
          >
            <p className={cn('font-display text-xl font-bold tabular-nums', tile.text)}>
              {tile.value}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{tile.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
