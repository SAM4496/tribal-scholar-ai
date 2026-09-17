'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { type MockApplication } from '@/lib/mock-data';
import { cn, formatDate, getInitials, getStatusColor, formatStatus } from '@/lib/utils';

interface RecentApplicationsProps {
  applications: MockApplication[];
}

const SCHEME_FILTERS = ['All', 'NFST', 'NOS'] as const;

const SCHEME_STYLES: Record<string, { badge: string; avatar: string }> = {
  NFST: { badge: 'bg-blue-50 text-blue-700', avatar: 'from-blue-500 to-indigo-600' },
  NOS: { badge: 'bg-emerald-50 text-emerald-700', avatar: 'from-emerald-500 to-teal-600' },
};

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  const [scheme, setScheme] = useState<(typeof SCHEME_FILTERS)[number]>('All');

  const filtered = useMemo(
    () => (scheme === 'All' ? applications : applications.filter((a) => a.schemeCode === scheme)),
    [applications, scheme]
  );

  return (
    <div className="card flex h-full flex-col">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="section-title">Recent Applications</h2>
            <p className="text-sm text-slate-500">Latest submissions across all schemes</p>
          </div>
          <span className="chip shrink-0 bg-slate-100 text-slate-600">{filtered.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-600" htmlFor="recent-scheme">
            <span className="whitespace-nowrap">Scheme</span>
            <select
              id="recent-scheme"
              value={scheme}
              onChange={(e) => setScheme(e.target.value as (typeof SCHEME_FILTERS)[number])}
              className="input"
            >
              {SCHEME_FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <Link
            href="/admin/applications"
            className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:inline-flex"
          >
            View all
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-slate-500">
              <th className="px-5 py-3">Application #</th>
              <th className="px-5 py-3">Applicant</th>
              <th className="px-5 py-3">Scheme</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((application) => {
              const schemeStyle = SCHEME_STYLES[application.schemeCode] ?? SCHEME_STYLES.NFST;
              return (
                <tr
                  key={application.id}
                  className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">
                    {application.applicationNumber}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[0.65rem] font-bold text-white shadow-sm',
                          schemeStyle.avatar
                        )}
                      >
                        {getInitials(application.applicant.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-slate-900">{application.applicant.name}</p>
                        <p className="text-xs text-slate-400">{application.applicant.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'inline-block rounded-md px-2 py-0.5 text-xs font-semibold',
                        schemeStyle.badge
                      )}
                    >
                      {application.schemeCode}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium',
                        getStatusColor(application.status)
                      )}
                    >
                      {formatStatus(application.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                    {application.submittedAt ? formatDate(application.submittedAt) : '—'}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="group inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:border-blue-300 hover:bg-blue-50"
                    >
                      View
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                  No applications match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}