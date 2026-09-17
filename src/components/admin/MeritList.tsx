'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { type SelectionEntry, totalScore, getCriteria, maxTotal } from '@/lib/mock-selection';
import { cn } from '@/lib/utils';

interface MeritListProps {
  entries: SelectionEntry[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean, ids: string[]) => void;
  onBulkSelect: () => void;
  onBulkReject: () => void;
  onSelectEntry: (id: string) => void;
}

const DECISION_STYLES: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  SELECTED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function MeritList({
  entries,
  selectedIds,
  onToggle,
  onToggleAll,
  onBulkSelect,
  onBulkReject,
  onSelectEntry,
}: MeritListProps) {
  const [scheme, setScheme] = useState('All');

  const ranked = useMemo(() => {
    const pool = scheme === 'All' ? entries : entries.filter((e) => e.application.schemeCode === scheme);
    return [...pool].sort((a, b) => totalScore(b) - totalScore(a));
  }, [entries, scheme]);

  const allChecked = ranked.length > 0 && ranked.every((e) => selectedIds.includes(e.application.id));

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Merit List</h2>
          <p className="text-sm text-gray-500">Ranked by total score (highest first)</p>
        </div>
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Schemes</option>
          <option value="NFST">NFST</option>
          <option value="NOS">NOS</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={(e) => onToggleAll(e.target.checked, ranked.map((r) => r.application.id))}
                  aria-label="Select all"
                />
              </th>
              <th className="px-3 py-3">Rank</th>
              <th className="px-4 py-3">Application #</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-3 py-3">Scheme</th>
              <th className="px-3 py-3">Score</th>
              <th className="px-4 py-3">Breakdown</th>
              <th className="px-4 py-3">Decision</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((entry, index) => {
              const total = totalScore(entry);
              const breakdown = getCriteria(entry.application.schemeCode)
                .map((criterion) => entry.scores[criterion.name] ?? 0)
                .join(' + ');
              return (
                <tr
                  key={entry.application.id}
                  className={cn(
                    'border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50',
                    selectedIds.includes(entry.application.id) && 'bg-blue-50/50'
                  )}
                  onClick={() => onSelectEntry(entry.application.id)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(entry.application.id)}
                      onChange={() => onToggle(entry.application.id)}
                      aria-label={`Select ${entry.application.applicationNumber}`}
                    />
                  </td>
                  <td className="px-3 py-3 font-semibold text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {entry.application.applicationNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900 whitespace-nowrap">{entry.application.applicant.name}</p>
                    <p className="text-xs text-gray-400">{entry.application.applicant.state}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                      {entry.application.schemeCode}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-bold text-gray-900">{total}</span>
                    <span className="text-gray-400"> / {maxTotal(entry.application.schemeCode)}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{breakdown}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-block text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
                        DECISION_STYLES[entry.decision]
                      )}
                    >
                      {entry.decision.charAt(0) + entry.decision.slice(1).toLowerCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
            {ranked.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-gray-500">
                  No applications in the screening pool.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          {selectedIds.length} selected for batch action ·{' '}
          <Link href="/admin/applications" className="text-blue-700 hover:underline">
            open application review
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBulkSelect}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select
          </button>
          <button
            type="button"
            onClick={onBulkReject}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
