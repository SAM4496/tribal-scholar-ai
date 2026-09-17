import { type StatusDistributionDatum } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StatusDistributionChartProps {
  data: StatusDistributionDatum[];
}

const BAR_GRADIENTS: Record<string, string> = {
  DRAFT: 'from-slate-300 to-slate-500',
  SUBMITTED: 'from-sky-400 to-blue-600',
  UNDER_DOCUMENT_VERIFICATION: 'from-yellow-400 to-amber-500',
  UNDER_ELIGIBILITY_CHECK: 'from-amber-400 to-orange-500',
  ELIGIBLE: 'from-emerald-400 to-green-600',
  INELIGIBLE: 'from-red-400 to-rose-500',
  DEFICIENT: 'from-orange-400 to-red-500',
  UNDER_SCRUTINY: 'from-purple-400 to-violet-600',
  SCRUTINY_COMPLETE: 'from-indigo-400 to-indigo-600',
  UNDER_SCREENING: 'from-cyan-400 to-sky-600',
  SELECTED: 'from-emerald-400 to-teal-600',
  APPROVED: 'from-green-500 to-emerald-700',
  REJECTED: 'from-rose-500 to-red-600',
  WITHDRAWN: 'from-slate-300 to-slate-400',
};

const DOTS: Record<string, string> = {
  DRAFT: 'bg-slate-400',
  SUBMITTED: 'bg-blue-500',
  UNDER_DOCUMENT_VERIFICATION: 'bg-amber-500',
  UNDER_ELIGIBILITY_CHECK: 'bg-orange-500',
  ELIGIBLE: 'bg-emerald-500',
  INELIGIBLE: 'bg-rose-500',
  DEFICIENT: 'bg-orange-600',
  UNDER_SCRUTINY: 'bg-violet-500',
  SCRUTINY_COMPLETE: 'bg-indigo-500',
  UNDER_SCREENING: 'bg-cyan-500',
  SELECTED: 'bg-teal-500',
  APPROVED: 'bg-green-600',
  REJECTED: 'bg-red-600',
  WITHDRAWN: 'bg-slate-400',
};

export default function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <div className="card flex h-full flex-col p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="section-title">Applications by Status</h2>
          <p className="mt-1 text-sm text-slate-500">Distribution across the workflow</p>
        </div>
        <span className="chip shrink-0 bg-slate-100 text-slate-600">{total} total</span>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.status}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex min-w-0 items-center gap-2 text-slate-600">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 shrink-0 rounded-full',
                      DOTS[item.status] ?? 'bg-slate-400'
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="shrink-0 tabular-nums text-slate-900">
                  <span className="font-semibold">{item.count}</span>
                  <span className="font-normal text-slate-400"> ({percentage}%)</span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn(
                    'h-full animate-grow-x rounded-full bg-gradient-to-r',
                    BAR_GRADIENTS[item.status] ?? 'from-slate-300 to-slate-500'
                  )}
                  style={{
                    width: `${Math.round((item.count / max) * 100)}%`,
                    animationDelay: `${index * 60}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
