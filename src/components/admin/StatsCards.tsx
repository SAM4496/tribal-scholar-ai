'use client';

import type { ReactNode } from 'react';
import { type DashboardStats } from '@/lib/mock-data';
import CountUp from '@/components/landing/CountUp';
import { cn } from '@/lib/utils';

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatDefinition {
  label: string;
  value: number;
  gradient: string;
  valueColor: string;
  hint: string;
  icon: ReactNode;
}

const ICON_CLASS = 'h-4 w-4';
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards: StatDefinition[] = [
    {
      label: 'Total',
      value: stats.total,
      gradient: 'from-slate-400 to-slate-600',
      valueColor: 'text-slate-900',
      hint: 'all applications',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      label: 'Submitted',
      value: stats.submitted,
      gradient: 'from-sky-400 to-blue-600',
      valueColor: 'text-blue-700',
      hint: 'awaiting review',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      ),
    },
    {
      label: 'Under Verification',
      value: stats.underVerification,
      gradient: 'from-amber-400 to-orange-500',
      valueColor: 'text-amber-600',
      hint: 'docs + eligibility',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      label: 'Eligible',
      value: stats.eligible,
      gradient: 'from-emerald-400 to-teal-600',
      valueColor: 'text-emerald-600',
      hint: 'moved to scrutiny',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      label: 'Deficient',
      value: stats.deficient,
      gradient: 'from-orange-400 to-red-500',
      valueColor: 'text-orange-600',
      hint: 'need correction',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      label: 'Selected',
      value: stats.selected,
      gradient: 'from-indigo-400 to-violet-600',
      valueColor: 'text-indigo-600',
      hint: 'merit list',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
        </svg>
      ),
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      gradient: 'from-rose-400 to-red-600',
      valueColor: 'text-rose-600',
      hint: 'incl. ineligible',
      icon: (
        <svg viewBox="0 0 24 24" className={ICON_CLASS} {...STROKE} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9l6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card, index) => {
        const share = stats.total > 0 ? Math.round((card.value / stats.total) * 100) : 0;
        return (
          <div
            key={card.label}
            style={{ animationDelay: `${index * 55}ms` }}
            className="animate-fade-in-up card card-hover group relative overflow-hidden p-4"
          >
            <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', card.gradient)} />
            <div
              className={cn(
                'pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25',
                card.gradient
              )}
            />

            <div className="relative flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="eyebrow truncate" title={card.label}>
                  {card.label}
                </p>
                <p
                  className={cn(
                    'mt-2 font-display text-[1.75rem] font-bold leading-none tabular-nums',
                    card.valueColor
                  )}
                >
                  <CountUp to={card.value} duration={1300} />
                </p>
              </div>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md',
                  card.gradient
                )}
              >
                {card.icon}
              </span>
            </div>

            <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn('h-full animate-grow-x rounded-full bg-gradient-to-r', card.gradient)}
                style={{ width: `${share}%`, animationDelay: `${200 + index * 60}ms` }}
              />
            </div>
            <p className="relative mt-1.5 text-[0.7rem] text-slate-400">
              {share}% of total · {card.hint}
            </p>
          </div>
        );
      })}
    </div>
  );
}