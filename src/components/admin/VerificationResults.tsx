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
    const relevant = withVerification.filter((d) => d.verification?.checks.some((c) => c.label === label));
    const passed = relevant.filter(
      (d) => d.verification?.checks.find((c) => c.label === label)?.status === VerificationStatus.PASS
    );
    return { label, total: relevant.length, passed: passed.length };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-900">AI Verification Summary</h2>
      <p className="text-sm text-gray-500 mb-4">
        Automated document intelligence results (human review retained)
      </p>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Overall confidence</span>
            <span className="font-semibold text-gray-900">
              {averageConfidence > 0 ? `${Math.round(averageConfidence * 100)}%` : '—'}
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full',
                averageConfidence >= 0.85 ? 'bg-green-500' : averageConfidence >= 0.6 ? 'bg-amber-500' : 'bg-red-500'
              )}
              style={{ width: `${Math.round(averageConfidence * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {aggregateChecks.map((check) => {
          const percentage = check.total > 0 ? Math.round((check.passed / check.total) * 100) : 0;
          return (
            <div key={check.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{check.label}</span>
                <span className="text-gray-500">
                  {check.passed}/{check.total} passed
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 text-center">
        <div className="rounded-lg bg-gray-50 py-2">
          <p className="text-lg font-bold text-gray-900">{documents.length}</p>
          <p className="text-xs text-gray-500">Documents</p>
        </div>
        <div className="rounded-lg bg-green-50 py-2">
          <p className="text-lg font-bold text-green-700">
            {documents.filter((d) => d.status === DocumentStatus.VERIFIED).length}
          </p>
          <p className="text-xs text-green-700">Verified</p>
        </div>
        <div className="rounded-lg bg-amber-50 py-2">
          <p className="text-lg font-bold text-amber-700">
            {documents.filter((d) => d.status === DocumentStatus.NEEDS_REVIEW).length}
          </p>
          <p className="text-xs text-amber-700">Need Review</p>
        </div>
      </div>
    </div>
  );
}
