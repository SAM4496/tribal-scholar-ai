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

const VERDICT_STYLES: Record<
  VerificationStatus,
  { box: string; text: string; icon: string; iconBg: string; label: string; title: string }
> = {
  [VerificationStatus.PASS]: {
    box: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white',
    text: 'text-emerald-800',
    icon: '✓',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    title: 'Eligible',
    label: 'All mandatory rules passed',
  },
  [VerificationStatus.FAIL]: {
    box: 'border-red-200 bg-gradient-to-br from-red-50 to-white',
    text: 'text-red-800',
    icon: '✕',
    iconBg: 'bg-gradient-to-br from-rose-500 to-red-600',
    title: 'Ineligible',
    label: 'One or more mandatory rules failed',
  },
  [VerificationStatus.NEEDS_REVIEW]: {
    box: 'border-amber-200 bg-gradient-to-br from-amber-50 to-white',
    text: 'text-amber-800',
    icon: '!',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    title: 'Needs Review',
    label: 'Some rules require manual verification',
  },
};

const RULE_ACCENT: Record<string, string> = {
  PASS: 'border-l-emerald-500',
  FAIL: 'border-l-red-500',
  NEEDS_REVIEW: 'border-l-amber-500',
};

export default function EligibilityResults({ results }: EligibilityResultsProps) {
  const verdict = getOverallVerdict(results);
  const style = VERDICT_STYLES[verdict];
  const mandatoryCount = results.filter((r) => r.isMandatory).length;

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="section-title">Eligibility Check</h2>
          <p className="mt-1 text-sm text-slate-500">Configurable scheme rules</p>
        </div>
        <span className="chip shrink-0 bg-slate-100 text-slate-600">
          {mandatoryCount} mandatory
        </span>
      </div>

      <div className={cn('mb-4 flex items-center gap-3 rounded-xl border px-4 py-3', style.box)}>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm',
            style.iconBg
          )}
        >
          {style.icon}
        </span>
        <div>
          <p className={cn('text-sm font-semibold', style.text)}>{style.title}</p>
          <p className={cn('text-xs', style.text, 'opacity-80')}>{style.label}</p>
        </div>
      </div>

      <ul className="space-y-3">
        {results.map((result) => (
          <li
            key={result.ruleCode}
            className={cn(
              'rounded-lg border border-slate-100 border-l-4 bg-white p-3 transition-colors hover:bg-slate-50/60',
              RULE_ACCENT[result.result] ?? 'border-l-slate-300'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{result.ruleName}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {result.ruleCode} · {result.ruleType}
                  {result.isMandatory ? ' · Mandatory' : ' · Optional'}
                </p>
              </div>
              <ResultBadge status={result.result} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
