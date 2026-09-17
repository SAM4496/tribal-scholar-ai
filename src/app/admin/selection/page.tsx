'use client';

import { useMemo, useState } from 'react';
import ScoringPanel from '@/components/admin/ScoringPanel';
import MeritList from '@/components/admin/MeritList';
import SelectionSummary from '@/components/admin/SelectionSummary';
import { buildSelectionEntries, type SelectionEntry } from '@/lib/mock-selection';

export default function SelectionPage() {
  const [entries, setEntries] = useState<SelectionEntry[]>(buildSelectionEntries);
  const [activeId, setActiveId] = useState(() => buildSelectionEntries()[0]?.application.id ?? '');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const resolvedActiveId = useMemo(
    () => (entries.some((e) => e.application.id === activeId) ? activeId : entries[0]?.application.id ?? ''),
    [entries, activeId]
  );

  const handleScoreChange = (id: string, criterion: string, value: number) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.application.id === id ? { ...entry, scores: { ...entry.scores, [criterion]: value } } : entry
      )
    );
  };

  const handleRemarksChange = (id: string, criterion: string, value: string) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.application.id === id ? { ...entry, remarks: { ...entry.remarks, [criterion]: value } } : entry
      )
    );
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleToggleAll = (checked: boolean, ids: string[]) => {
    setSelectedIds((prev) =>
      checked ? Array.from(new Set([...prev, ...ids])) : prev.filter((id) => !ids.includes(id))
    );
  };

  const applyDecision = (decision: SelectionEntry['decision']) => {
    setEntries((prev) =>
      prev.map((entry) => (selectedIds.includes(entry.application.id) ? { ...entry, decision } : entry))
    );
    setSelectedIds([]);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Selection &amp; Merit List</h1>
        <p className="text-gray-500 mt-1">Score applications and manage the selection process</p>
      </div>

      <SelectionSummary entries={entries} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <ScoringPanel
          entries={entries}
          activeId={resolvedActiveId}
          onSelect={setActiveId}
          onScoreChange={handleScoreChange}
          onRemarksChange={handleRemarksChange}
        />
        <MeritList
          entries={entries}
          selectedIds={selectedIds}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          onBulkSelect={() => applyDecision('SELECTED')}
          onBulkReject={() => applyDecision('REJECTED')}
          onSelectEntry={setActiveId}
        />
      </div>
    </div>
  );
}
