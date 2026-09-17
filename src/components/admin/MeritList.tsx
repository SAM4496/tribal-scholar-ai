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
  PENDING: 'bg-slate-100 text-slate-600',
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
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-slate-100">
        <div>
          <h2 className="section-title">Merit List</h2>
          <p className="text-sm text-slate-500">Ranked by total score (highest first)</p>
        </div>
        <select
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
          className="input"
        >
          <option value="All">All Schemes</option>
          <option value="NFST">NFST</option>
          <option value="NOS">NOS</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-slate-500">
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
              const max = maxTotal(entry.application.schemeCode);
              const breakdown = getCriteria(entry.application.schemeCode)
                .map((criterion) => entry.scores[criterion.name] ?? 0)
                .join(' + ');
              return (
                <tr
                  key={entry.application.id}
                  className={cn(
                    'border-b border-slate-100 last:border-0 cursor-pointer hover:bg-slate-50',
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
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                        index === 0
                          ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-sm'
                          : index === 1
                            ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-sm'
                            : index === 2
                              ? 'bg-gradient-to-br from-orange-400 to-amber-700 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                    {entry.application.applicationNumber}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-900 whitespace-nowrap">{entry.application.applicant.name}</p>
                    <p className="text-xs text-slate-400">{entry.application.applicant.state}</p>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded">
                      {entry.application.schemeCode}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="w-24">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-bold tabular-nums text-slate-900">{total}</span>
                        <span className="text-xs text-slate-400">/ {max}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                          style={{ width: `${max > 0 ? Math.round((total / max) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{breakdown}</td>
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
                <td colSpan={8} className="px-5 py-10 text-center text-slate-500">
                  No applications in the screening pool.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{selectedIds.length}</span> selected for
          batch action ·{' '}
          <Link href="/admin/applications" className="font-medium text-blue-700 hover:underline">
            open application review
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBulkSelect}
            disabled={selectedIds.length === 0}
            className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select
          </button>
          <button
            type="button"
            onClick={onBulkReject}
            disabled={selectedIds.length === 0}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-all hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
