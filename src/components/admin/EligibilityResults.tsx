import { VerificationStatus } from '@/types';
import { type MockEligibilityResult } from '@/lib/mock-application-details';
import { cn } from '@/lib/utils';
import ResultBadge from './ResultBadge';

interface EligibilityResultsProps {
  results: MockEligibilityResult[];
}

function getOverallVerdict(results: MockEligibilityResult[]): VerificationStatus {
  const mandatory = results.filter((r) => r.isMandatory);
  if (mandatory.some((r) => r.result === VerificationStatus.FAIL)) return VerificationStatus.FAIL;
  if (mandatory.some((r) => r.result === VerificationStatus.NEEDS_REVIEW)) {
    return VerificationStatus.NEEDS_REVIEW;
  }
  return VerificationStatus.PASS;
}

const VERDICT_STYLES: Record<VerificationStatus, { box: string; text: string; label: string }> = {
  [VerificationStatus.PASS]: {
    box: 'bg-green-50 border-green-200',
    text: 'text-green-700',
    label: 'Eligible — all mandatory rules passed',
  },
  [VerificationStatus.FAIL]: {
    box: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    label: 'Ineligible — one or more mandatory rules failed',
  },
  [VerificationStatus.NEEDS_REVIEW]: {
    box: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    label: 'Needs Review — some rules require manual verification',
  },
};

export default function EligibilityResults({ results }: EligibilityResultsProps) {
  const verdict = getOverallVerdict(results);
  const style = VERDICT_STYLES[verdict];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-900">Eligibility Check</h2>
      <p className="text-sm text-gray-500 mb-4">Configurable scheme rules (docs/scheme-rulebook.md)</p>

      <div className={cn('rounded-lg border px-4 py-3 mb-4', style.box)}>
        <p className={cn('text-sm font-semibold', style.text)}>Overall: {style.label}</p>
      </div>

      <ul className="space-y-3">
        {results.map((result) => (
          <li key={result.ruleCode} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{result.ruleName}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {result.ruleCode} · {result.ruleType}
                  {result.isMandatory ? ' · Mandatory' : ' · Optional'}
                </p>
              </div>
              <ResultBadge status={result.result} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{result.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
