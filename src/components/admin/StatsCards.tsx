'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
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

const STATUS_CARDS: StatDefinition[] = [
  {
    label: 'Submitted',
    value: 0,
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
    value: 0,
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
    value: 0,
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
    value: 0,
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
    value: 0,
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
    value: 0,
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

export default function StatsCards({ stats }: StatsCardsProps) {
  const valueByLabel: Record<string, number> = {
    Submitted: stats.submitted,
    'Under Verification': stats.underVerification,
    Eligible: stats.eligible,
    Deficient: stats.deficient,
    Selected: stats.selected,
    Rejected: stats.rejected,
  };

  const cards = STATUS_CARDS.map((card) => ({
    ...card,
    value: valueByLabel[card.label] ?? 0,
  }));

  const segments = cards.filter((card) => card.value > 0);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* Featured total */}
      <div
        className="card card-hover animate-fade-in-up group relative flex flex-col overflow-hidden p-5 xl:col-span-1"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" />

        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow">Overview</p>
            <p className="mt-2 text-sm font-medium text-slate-500">Total Applications</p>
            <p className="mt-1 font-display text-4xl font-bold leading-none tracking-tight text-slate-900 tabular-nums">
              <CountUp to={stats.total} duration={1400} />
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
            <svg viewBox="0 0 24 24" className="h-5 w-5" {...STROKE} aria-hidden="true">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </span>
        </div>

        {/* Segmented distribution bar */}
        <div className="relative mt-5">
          <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
            {segments.map((card) => (
              <span
                key={card.label}
                title={`${card.label}: ${card.value}`}
                className={cn('h-full bg-gradient-to-r', card.gradient)}
                style={{ width: `${(card.value / Math.max(stats.total, 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {segments.map((card) => (
              <span
                key={card.label}
                className="inline-flex items-center gap-1.5 text-[0.7rem] text-slate-500"
              >
                <span
                  className={cn('h-1.5 w-1.5 rounded-full bg-gradient-to-r', card.gradient)}
                  aria-hidden="true"
                />
                {card.label}
                <span className="font-semibold text-slate-700 tabular-nums">{card.value}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-[0.7rem] text-slate-400">100% of total · all applications</p>
          <Link
            href="/admin/applications"
            className="group/link inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-700 transition-colors hover:text-blue-800"
          >
            View all
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:col-span-2">
        {cards.map((card, index) => {
          const share = stats.total > 0 ? Math.round((card.value / stats.total) * 100) : 0;
          return (
            <div
              key={card.label}
              style={{ animationDelay: `${index * 55}ms` }}
              className="card card-hover animate-fade-in-up group relative flex flex-col overflow-hidden p-4"
            >
              <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', card.gradient)} />
              <div
                className={cn(
                  'pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25',
                  card.gradient
                )}
              />

              <div className="relative flex items-start justify-between gap-2">
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md',
                    card.gradient
                  )}
                >
                  {card.icon}
                </span>
                <p
                  className={cn(
                    'font-display text-[1.75rem] font-bold leading-none tabular-nums',
                    card.valueColor
                  )}
                >
                  <CountUp to={card.value} duration={1300} />
                </p>
              </div>

              <p className="relative mt-3 text-sm font-semibold leading-tight text-slate-800">
                {card.label}
              </p>

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
    </div>
  );
}