'use client';

import { type SelectionEntry, getCriteria, maxTotal, totalScore } from '@/lib/mock-selection';
import { cn } from '@/lib/utils';

interface ScoringPanelProps {
  entries: SelectionEntry[];
  activeId: string;
  onSelect: (id: string) => void;
  onScoreChange: (id: string, criterion: string, value: number) => void;
  onRemarksChange: (id: string, criterion: string, value: string) => void;
}

export default function ScoringPanel({
  entries,
  activeId,
  onSelect,
  onScoreChange,
  onRemarksChange,
}: ScoringPanelProps) {
  const active = entries.find((e) => e.application.id === activeId) ?? entries[0];
  if (!active) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-500">
        No applications in the screening pool.
      </div>
    );
  }

  const criteria = getCriteria(active.application.schemeCode);
  const total = totalScore(active);
  const max = maxTotal(active.application.schemeCode);

  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Scoring Panel</h2>
        <p className="text-sm text-gray-500">Apply the approved scheme criteria transparently</p>

        <label htmlFor="scoring-application" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Application
        </label>
        <select
          id="scoring-application"
          value={active.application.id}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {entries.map((entry) => (
            <option key={entry.application.id} value={entry.application.id}>
              {entry.application.applicationNumber} — {entry.application.applicant.name} ({entry.application.schemeCode})
            </option>
          ))}
        </select>
      </div>

      <div className="p-5 space-y-4">
        {criteria.map((criterion) => {
          const score = active.scores[criterion.name] ?? 0;
          return (
            <div key={criterion.name} className="border border-gray-100 rounded-lg p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{criterion.name}</p>
                  <p className="text-xs text-gray-400">{criterion.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="number"
                    min={0}
                    max={criterion.maxScore}
                    value={score}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const clamped = Math.max(0, Math.min(criterion.maxScore, Number.isNaN(raw) ? 0 : raw));
                      onScoreChange(active.application.id, criterion.name, clamped);
                    }}
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-400">/ {criterion.maxScore}</span>
                </div>
              </div>
              <input
                type="text"
                value={active.remarks[criterion.name] ?? ''}
                onChange={(e) => onRemarksChange(active.application.id, criterion.name, e.target.value)}
                placeholder="Remarks (optional)"
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        })}

        <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
          <span className="text-sm font-medium text-blue-800">Total Score</span>
          <span className={cn('text-xl font-bold', total > 0 ? 'text-blue-800' : 'text-gray-400')}>
            {total} <span className="text-sm font-normal">/ {max}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
