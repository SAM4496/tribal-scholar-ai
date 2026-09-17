import { getKpis } from '@/lib/mock-analytics';
import { cn } from '@/lib/utils';

interface KpiItem {
  label: string;
  display: string;
  bar: number;
  gradient: string;
  hint: string;
}

export default function KpiStrip() {
  const kpis = getKpis();

  const items: KpiItem[] = [
    {
      label: 'Approval Rate',
      display: `${Math.round(kpis.approvalRate * 100)}%`,
      bar: Math.round(kpis.approvalRate * 100),
      gradient: 'from-emerald-400 to-teal-600',
      hint: `${kpis.approved} selected / approved`,
    },
    {
      label: 'AI Verification',
      display: `${Math.round(kpis.aiVerifiedRate * 100)}%`,
      bar: Math.round(kpis.aiVerifiedRate * 100),
      gradient: 'from-sky-400 to-blue-600',
      hint: 'documents auto-verified',
    },
    {
      label: 'Avg. Processing',
      display: `${kpis.avgProcessingDays.toFixed(1)}d`,
      bar: Math.min(100, Math.round((kpis.avgProcessingDays / 14) * 100)),
      gradient: 'from-indigo-400 to-violet-600',
      hint: 'vs target ≤ 14d',
    },
    {
      label: 'Deficiency Rate',
      display: `${Math.round(kpis.deficiencyRate * 100)}%`,
      bar: Math.round(kpis.deficiencyRate * 100),
      gradient: 'from-amber-400 to-orange-500',
      hint: 'applications needing correction',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          style={{ animationDelay: `${index * 60}ms` }}
          className="animate-fade-in-up card card-hover group relative overflow-hidden p-5"
        >
          <div className={cn('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r', item.gradient)} />
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{item.label}</p>
            <span className={cn('h-2 w-2 rounded-full bg-gradient-to-r', item.gradient)} />
          </div>
          <p className="mt-2 font-display text-2xl font-bold tabular-nums text-slate-900">
            {item.display}
          </p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn('h-full animate-grow-x rounded-full bg-gradient-to-r', item.gradient)}
              style={{ width: `${item.bar}%`, animationDelay: `${250 + index * 70}ms` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">{item.hint}</p>
        </div>
      ))}
    </div>
  );
}