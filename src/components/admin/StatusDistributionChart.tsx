import { type StatusDistributionDatum } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StatusDistributionChartProps {
  data: StatusDistributionDatum[];
}

const BAR_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-400',
  SUBMITTED: 'bg-blue-500',
  UNDER_DOCUMENT_VERIFICATION: 'bg-yellow-500',
  UNDER_ELIGIBILITY_CHECK: 'bg-amber-500',
  ELIGIBLE: 'bg-green-500',
  INELIGIBLE: 'bg-red-400',
  DEFICIENT: 'bg-orange-500',
  UNDER_SCRUTINY: 'bg-purple-500',
  SCRUTINY_COMPLETE: 'bg-indigo-500',
  UNDER_SCREENING: 'bg-cyan-500',
  SELECTED: 'bg-emerald-500',
  APPROVED: 'bg-green-700',
  REJECTED: 'bg-red-500',
  WITHDRAWN: 'bg-gray-400',
};

export default function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-900">Applications by Status</h2>
      <p className="text-sm text-gray-500 mb-5">Distribution across the workflow</p>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.status}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 font-medium">
                  {item.count}
                  <span className="text-gray-400 font-normal"> ({percentage}%)</span>
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full', BAR_COLORS[item.status] ?? 'bg-gray-400')}
                  style={{ width: `${Math.round((item.count / max) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
