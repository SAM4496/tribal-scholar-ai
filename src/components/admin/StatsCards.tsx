import { type DashboardStats } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatDefinition {
  label: string;
  value: number;
  dot: string;
  valueColor: string;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatDefinition[] = [
    { label: 'Total', value: stats.total, dot: 'bg-gray-400', valueColor: 'text-gray-900' },
    { label: 'Submitted', value: stats.submitted, dot: 'bg-blue-500', valueColor: 'text-blue-700' },
    { label: 'Under Verification', value: stats.underVerification, dot: 'bg-amber-500', valueColor: 'text-amber-600' },
    { label: 'Eligible', value: stats.eligible, dot: 'bg-emerald-500', valueColor: 'text-emerald-600' },
    { label: 'Deficient', value: stats.deficient, dot: 'bg-orange-500', valueColor: 'text-orange-600' },
    { label: 'Selected', value: stats.selected, dot: 'bg-indigo-500', valueColor: 'text-indigo-600' },
    { label: 'Rejected', value: stats.rejected, dot: 'bg-red-500', valueColor: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className={cn('h-2 w-2 shrink-0 rounded-full', card.dot)} />
            <p className="truncate text-xs font-medium text-gray-500" title={card.label}>
              {card.label}
            </p>
          </div>
          <p className={cn('mt-2 text-2xl font-bold tabular-nums', card.valueColor)}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
