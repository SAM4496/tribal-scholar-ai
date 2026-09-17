'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getApplicantApplications,
  getApplicantStats,
  type ApplicantApplication,
} from '@/lib/mock-applicant-applications';
import { cn } from '@/lib/utils';
import ApplicationCard from '@/components/applicant/ApplicationCard';

type FilterKey = 'all' | 'inprogress' | 'action' | 'completed';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'action', label: 'Needs Action' },
  { key: 'completed', label: 'Completed' },
];

function matchesFilter(app: ApplicantApplication, filter: FilterKey): boolean {
  switch (filter) {
    case 'inprogress':
      return !['DRAFT', 'DEFICIENT', 'APPROVED', 'REJECTED', 'INELIGIBLE', 'WITHDRAWN'].includes(
        app.status
      );
    case 'action':
      return ['DRAFT', 'DEFICIENT'].includes(app.status);
    case 'completed':
      return ['APPROVED', 'REJECTED', 'INELIGIBLE', 'WITHDRAWN'].includes(app.status);
    default:
      return true;
  }
}

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');

  const applications = useMemo(() => getApplicantApplications(), []);
  const stats = useMemo(() => getApplicantStats(applications), [applications]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return applications.filter((app) => {
      const matchesFilterKey = matchesFilter(app, filter);
      const matchesQuery =
        query === '' ||
        app.schemeName.toLowerCase().includes(query) ||
        app.applicationNumber.toLowerCase().includes(query) ||
        app.course.toLowerCase().includes(query) ||
        app.institution.toLowerCase().includes(query);
      return matchesFilterKey && matchesQuery;
    });
  }, [applications, filter, search]);

  const statCards = [
    {
      label: 'Total Applications',
      value: stats.total,
      hint: 'Across all schemes',
      tone: 'text-slate-900',
      icon: '📚',
      tint: 'bg-slate-100 text-slate-600',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      hint: 'Actively being reviewed',
      tone: 'text-blue-700',
      icon: '⚙️',
      tint: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Needs Action',
      value: stats.needsAction,
      hint: 'Drafts & deficiencies',
      tone: stats.needsAction > 0 ? 'text-orange-600' : 'text-slate-400',
      icon: '⚠️',
      tint: stats.needsAction > 0 ? 'bg-orange-50 text-orange-500' : 'bg-slate-100 text-slate-400',
    },
    {
      label: 'Completed',
      value: stats.completed,
      hint: 'Final decision shared',
      tone: 'text-emerald-600',
      icon: '✅',
      tint: 'bg-emerald-50 text-emerald-600',
    },
  ];

  const countFor = (key: FilterKey) =>
    applications.filter((app) => matchesFilter(app, key)).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-7 animate-fade-in-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
              Applicant Portal
            </p>
            <h1 className="mt-2.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.9rem]">
              My Applications
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Track the review of your scholarship applications and respond to any
              requests from the scrutiny team.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span className="chip border border-blue-200/80 bg-blue-50/80 text-blue-700 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600" />
              </span>
              Demo Data
            </span>
            <Link
              href="/applicant/schemes"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 11V5M5 8h6" />
                <circle cx="8" cy="8" r="6.5" />
              </svg>
              Browse Schemes
            </Link>
          </div>
        </div>
        <div className="divider-accent mt-5 h-[3px] w-full" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="card animate-fade-in-up p-4 sm:p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[0.8rem] font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className={cn('mt-1.5 font-display text-3xl font-bold tracking-tight', stat.tone)}>
                  {stat.value}
                </p>
                <p className="mt-0.5 hidden text-xs text-slate-400 sm:block">{stat.hint}</p>
              </div>
              <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', stat.tint)}>
                {stat.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95',
                filter === f.key
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {f.label}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold',
                  filter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                )}
              >
                {countFor(f.key)}
              </span>
            </button>
          ))}
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes, courses, application no…"
            className="input w-full pl-9 sm:w-72"
          />
        </div>
      </div>

      {/* Applications grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((app, index) => (
            <ApplicationCard key={app.id} application={app} delayMs={index * 60} />
          ))}
        </div>
      ) : (
        <div className="card mt-6 p-12 text-center animate-fade-in">
          {search.trim() ? (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                🔍
              </div>
              <h3 className="section-title mt-4">No matching applications</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                No applications match “{search}”. Try searching by scheme, course,
                or your application number.
              </p>
              <button
                onClick={() => setSearch('')}
                className="mt-5 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-2xl">
                📄
              </div>
              <h3 className="section-title mt-4">
                {filter === 'all'
                  ? 'No applications yet'
                  : `No ${FILTERS.find((f) => f.key === filter)?.label.toLowerCase()} applications`}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                {filter === 'all'
                  ? 'You haven’t applied to any schemes yet. Browse the available scholarships to get started.'
                  : 'Nothing here right now. New activity will show up in this view.'}
              </p>
              <Link
                href="/applicant/schemes"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 active:scale-95"
              >
                Browse Available Schemes
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}