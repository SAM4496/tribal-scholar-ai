'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { type MockApplication } from '@/lib/mock-data';
import { cn, formatDate, getStatusColor, formatStatus } from '@/lib/utils';

interface RecentApplicationsProps {
  applications: MockApplication[];
}

const SCHEME_FILTERS = ['All', 'NFST', 'NOS'] as const;

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  const [scheme, setScheme] = useState<(typeof SCHEME_FILTERS)[number]>('All');

  const filtered = useMemo(
    () => (scheme === 'All' ? applications : applications.filter((a) => a.schemeCode === scheme)),
    [applications, scheme]
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          <p className="text-sm text-gray-500">Latest submissions across all schemes</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <span className="whitespace-nowrap">Scheme</span>
          <select
            value={scheme}
            onChange={(e) => setScheme(e.target.value as (typeof SCHEME_FILTERS)[number])}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SCHEME_FILTERS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-5 py-3">Application #</th>
              <th className="px-5 py-3">Applicant</th>
              <th className="px-5 py-3">Scheme</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((application) => (
              <tr key={application.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                  {application.applicationNumber}
                </td>
                <td className="px-5 py-3">
                  <p className="text-gray-900">{application.applicant.name}</p>
                  <p className="text-xs text-gray-400">{application.applicant.state}</p>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                    {application.schemeCode}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
                      getStatusColor(application.status)
                    )}
                  >
                    {formatStatus(application.status)}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                  {application.submittedAt ? formatDate(application.submittedAt) : '—'}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="text-blue-700 font-medium hover:underline whitespace-nowrap"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
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
