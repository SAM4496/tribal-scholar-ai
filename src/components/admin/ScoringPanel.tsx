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
      <div className="card p-5 text-sm text-slate-500">
        No applications in the screening pool.
      </div>
    );
  }

  const criteria = getCriteria(active.application.schemeCode);
  const total = totalScore(active);
  const max = maxTotal(active.application.schemeCode);

  return (
    <div className="card">
      <div className="p-5 border-b border-slate-100">
        <h2 className="section-title">Scoring Panel</h2>
        <p className="text-sm text-slate-500">Apply the approved scheme criteria transparently</p>

        <label htmlFor="scoring-application" className="block text-sm font-medium text-slate-700 mt-4 mb-1">
          Application
        </label>
        <select
          id="scoring-application"
          value={active.application.id}
          onChange={(e) => onSelect(e.target.value)}
          className="input"
        >
          {entries.map((entry) => (
            <option key={entry.application.id} value={entry.application.id}>
              {entry.application.applicationNumber} — {entry.application.applicant.name} ({entry.application.schemeCode})
            </option>
          ))}
        </select>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {criteria.map((criterion) => {
            const score = active.scores[criterion.name] ?? 0;
            return (
              <div key={criterion.name} className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50/60 to-white p-3.5 transition-colors hover:border-blue-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">{criterion.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{criterion.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
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
                      className="input w-20 text-right font-semibold"
                    />
                    <span className="text-sm text-slate-400">/ {criterion.maxScore}</span>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${Math.round((score / criterion.maxScore) * 100)}%` }}
                  />
                </div>
                <input
                  type="text"
                  value={active.remarks[criterion.name] ?? ''}
                  onChange={(e) => onRemarksChange(active.application.id, criterion.name, e.target.value)}
                  placeholder="Remarks (optional)"
                  className="input mt-2.5 text-xs"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-blue-200/70 bg-gradient-to-r from-blue-50 via-indigo-50 to-white px-4 py-3.5">
          <span className="eyebrow text-blue-800">Total Score</span>
          <span className={cn('font-display text-2xl font-bold tabular-nums', total > 0 ? 'text-blue-800' : 'text-slate-400')}>
            {total} <span className="text-sm font-medium text-slate-400">/ {max}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
