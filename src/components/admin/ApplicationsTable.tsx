'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { type MockApplication } from '@/lib/mock-data';
import { cn, formatDate, getStatusColor, formatStatus } from '@/lib/utils';

interface ApplicationsTableProps {
  applications: MockApplication[];
}

export default function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [search, setSearch] = useState('');
  const [scheme, setScheme] = useState('All');
  const [status, setStatus] = useState('All');

  const statusOptions = useMemo(
    () => ['All', ...Array.from(new Set(applications.map((a) => a.status)))],
    [applications]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesQuery =
        query === '' ||
        a.applicationNumber.toLowerCase().includes(query) ||
        a.applicant.name.toLowerCase().includes(query);
      const matchesScheme = scheme === 'All' || a.schemeCode === scheme;
      const matchesStatus = status === 'All' || a.status === status;
      return matchesQuery && matchesScheme && matchesStatus;
    });
  }, [applications, search, scheme, status]);

  return (
    <div className="card">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 border-b border-slate-100">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by application # or applicant"
          className="input sm:col-span-1"
        />
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
          className="input"
        >
          <option value="All">All Schemes</option>
          <option value="NFST">NFST</option>
          <option value="NOS">NOS</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'All' ? 'All Statuses' : formatStatus(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-slate-500">
              <th className="px-5 py-3">Application #</th>
              <th className="px-5 py-3">Applicant</th>
              <th className="px-5 py-3">Scheme</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Stage</th>
              <th className="px-5 py-3">Submitted</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((application) => (
              <tr key={application.id} className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900 whitespace-nowrap">
                  {application.applicationNumber}
                </td>
                <td className="px-5 py-3">
                  <p className="text-slate-900">{application.applicant.name}</p>
                  <p className="text-xs text-slate-400">
                    {application.applicant.tribe} · {application.applicant.state}
                  </p>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded">
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
                <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{application.currentStage}</td>
                <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                  {application.submittedAt ? formatDate(application.submittedAt) : '—'}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="text-blue-700 font-medium hover:underline whitespace-nowrap"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                  No applications match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
        Showing {filtered.length} of {applications.length} applications
      </div>
    </div>
  );
}
