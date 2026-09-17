import { type DashboardStats } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatDefinition {
  label: string;
  value: number;
  change: string;
  accent: string;
  valueColor: string;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatDefinition[] = [
    {
      label: 'Total Applications',
      value: stats.total,
      change: '+12%',
      accent: 'border-l-blue-600',
      valueColor: 'text-gray-900',
    },
    {
      label: 'Submitted',
      value: stats.submitted,
      change: '+5%',
      accent: 'border-l-sky-500',
      valueColor: 'text-sky-700',
    },
    {
      label: 'Under Verification',
      value: stats.underVerification,
      change: '+3%',
      accent: 'border-l-amber-500',
      valueColor: 'text-amber-600',
    },
    {
      label: 'Eligible',
      value: stats.eligible,
      change: '+8%',
      accent: 'border-l-emerald-500',
      valueColor: 'text-emerald-600',
    },
    {
      label: 'Deficient',
      value: stats.deficient,
      change: '-2%',
      accent: 'border-l-orange-500',
      valueColor: 'text-orange-600',
    },
    {
      label: 'Selected',
      value: stats.selected,
      change: '+4%',
      accent: 'border-l-indigo-500',
      valueColor: 'text-indigo-600',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      change: '-1%',
      accent: 'border-l-red-500',
      valueColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={cn(
            'bg-white border border-gray-200 border-l-4 rounded-xl p-5',
            card.accent
          )}
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <div className="flex items-end justify-between mt-2">
            <p className={cn('text-3xl font-bold', card.valueColor)}>{card.value}</p>
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                card.change.startsWith('-')
                  ? 'bg-red-50 text-red-600'
                  : 'bg-green-50 text-green-700'
              )}
            >
              {card.change}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">vs. previous period</p>
        </div>
      ))}
    </div>
  );
}
