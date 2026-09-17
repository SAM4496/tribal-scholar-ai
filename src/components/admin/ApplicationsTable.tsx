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
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 border-b border-gray-100">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by application # or applicant"
          className="sm:col-span-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Schemes</option>
          <option value="NFST">NFST</option>
          <option value="NOS">NOS</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
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
              <tr key={application.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                  {application.applicationNumber}
                </td>
                <td className="px-5 py-3">
                  <p className="text-gray-900">{application.applicant.name}</p>
                  <p className="text-xs text-gray-400">
                    {application.applicant.tribe} · {application.applicant.state}
                  </p>
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
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{application.currentStage}</td>
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
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
                <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                  No applications match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
        Showing {filtered.length} of {applications.length} applications
      </div>
    </div>
  );
}
