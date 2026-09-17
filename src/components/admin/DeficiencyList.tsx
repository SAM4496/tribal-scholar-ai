'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { type MockDeficiencyRecord, type MockDeficiencyStatus } from '@/lib/mock-deficiencies';
import { cn, formatDate } from '@/lib/utils';

interface DeficiencyListProps {
  deficiencies: MockDeficiencyRecord[];
  onReview: (record: MockDeficiencyRecord) => void;
}

const STATUS_STYLES: Record<MockDeficiencyStatus, string> = {
  OPEN: 'bg-orange-100 text-orange-700',
  RESPONDED: 'bg-blue-100 text-blue-700',
  RESOLVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<MockDeficiencyStatus, string> = {
  OPEN: 'Open',
  RESPONDED: 'Responded',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected',
};

export function DeficiencyStatusBadge({ status }: { status: MockDeficiencyStatus }) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export default function DeficiencyList({ deficiencies, onReview }: DeficiencyListProps) {
  const [status, setStatus] = useState('All');

  const filtered = useMemo(
    () => (status === 'All' ? deficiencies : deficiencies.filter((d) => d.status === status)),
    [deficiencies, status]
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Deficiencies</h2>
          <p className="text-sm text-gray-500">Track and resolve flagged issues across applications</p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          {(['OPEN', 'RESPONDED', 'RESOLVED', 'REJECTED'] as MockDeficiencyStatus[]).map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
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
              <th className="px-5 py-3">Document</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                  <Link href={`/admin/applications/${record.applicationId}`} className="hover:underline">
                    {record.applicationNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-gray-900 whitespace-nowrap">{record.applicantName}</td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                  {record.documentType.replace(/_/g, ' ')}
                </td>
                <td className="px-5 py-3 text-gray-600 max-w-xs">
                  <span className="line-clamp-2">{record.description}</span>
                </td>
                <td className="px-5 py-3">
                  <DeficiencyStatusBadge status={record.status} />
                </td>
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{formatDate(record.createdAt)}</td>
                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onReview(record)}
                    className="text-blue-700 font-medium hover:underline whitespace-nowrap"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-500">
                  No deficiencies match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
