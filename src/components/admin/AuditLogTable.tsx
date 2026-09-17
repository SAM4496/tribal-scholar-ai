'use client';

import { useMemo, useState } from 'react';
import { type AuditActionType, type MockAuditEntry, getAuditStats } from '@/lib/mock-audit';
import { cn, formatDateTime } from '@/lib/utils';

interface AuditLogTableProps {
  entries: MockAuditEntry[];
}

const ACTION_LABELS: Record<AuditActionType, string> = {
  APPLICATION: 'Application',
  DOCUMENT: 'Document',
  DEFICIENCY: 'Deficiency',
  SELECTION: 'Selection',
  AUTH: 'Auth',
  SYSTEM: 'System',
};

const ACTION_STYLES: Record<AuditActionType, string> = {
  APPLICATION: 'bg-blue-100 text-blue-700',
  DOCUMENT: 'bg-purple-100 text-purple-700',
  DEFICIENCY: 'bg-orange-100 text-orange-700',
  SELECTION: 'bg-emerald-100 text-emerald-700',
  AUTH: 'bg-slate-100 text-slate-700',
  SYSTEM: 'bg-cyan-100 text-cyan-700',
};

const SEVERITY_STYLES: Record<string, string> = {
  INFO: 'bg-slate-100 text-slate-600',
  WARNING: 'bg-amber-100 text-amber-700',
  CRITICAL: 'bg-red-100 text-red-700',
};

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export default function AuditLogTable({ entries }: AuditLogTableProps) {
  const [search, setSearch] = useState('');
  const [actionType, setActionType] = useState('ALL');
  const [severity, setSeverity] = useState('ALL');
  const [active, setActive] = useState<MockAuditEntry | null>(null);

  const stats = useMemo(() => getAuditStats(entries), [entries]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesQuery =
        query === '' ||
        entry.actor.toLowerCase().includes(query) ||
        entry.action.toLowerCase().includes(query) ||
        entry.entityId.toLowerCase().includes(query) ||
        (entry.applicationNumber ?? '').toLowerCase().includes(query);
      const matchesType = actionType === 'ALL' || entry.actionType === actionType;
      const matchesSeverity = severity === 'ALL' || entry.severity === severity;
      return matchesQuery && matchesType && matchesSeverity;
    });
  }, [entries, search, actionType, severity]);

  const cards = [
    { label: 'Total Events', value: stats.total, accent: 'border-l-blue-600', delay: 0 },
    { label: 'Today', value: stats.today, accent: 'border-l-emerald-500', delay: 60 },
    { label: 'Warnings', value: stats.warnings, accent: 'border-l-amber-500', delay: 120 },
    { label: 'Critical', value: stats.critical, accent: 'border-l-red-500', delay: 180 },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            style={{ animationDelay: `${card.delay}ms` }}
            className={cn(
              'animate-fade-in-up card card-hover border-l-4 p-5',
              card.accent
            )}
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 card animate-fade-in-up animate-delay-200">
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-5 sm:grid-cols-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actor, action, entity or application #"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="input"
          >
            <option value="ALL">All Action Types</option>
            {(Object.keys(ACTION_LABELS) as AuditActionType[]).map((key) => (
              <option key={key} value={key}>
                {ACTION_LABELS[key]}
              </option>
            ))}
          </select>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="input"
          >
            <option value="ALL">All Severities</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Actor</th>
                <th className="px-5 py-3">Action</th>
                <th className="px-5 py-3">Entity</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3 text-right">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, index) => (
                <tr
                  key={entry.id}
                  onClick={() => setActive(entry)}
                  style={{ animationDelay: `${Math.min(index, 12) * 25}ms` }}
                  className="animate-fade-in cursor-pointer border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                    {formatDateTime(entry.timestamp)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {initials(entry.actor)}
                      </span>
                      <div>
                        <p className="text-slate-900">{entry.actor}</p>
                        <p className="text-xs text-slate-400">{entry.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
                        ACTION_STYLES[entry.actionType]
                      )}
                    >
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-slate-700">{entry.entityId}</p>
                    <p className="text-xs text-slate-400">{entry.entityType}</p>
                  </td>
                  <td className="max-w-xs px-5 py-3 text-slate-600">
                    <p className="truncate" title={entry.description}>
                      {entry.description}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={cn(
                        'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
                        SEVERITY_STYLES[entry.severity]
                      )}
                    >
                      {entry.severity.charAt(0) + entry.severity.slice(1).toLowerCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                    No audit events match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          Showing {filtered.length} of {entries.length} events Â· immutable audit trail (demo)
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="section-title">{active.action}</h2>
                <p className="mt-0.5 text-sm text-slate-500">{formatDateTime(active.timestamp)}</p>
              </div>
              <span
                className={cn(
                  'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
                  SEVERITY_STYLES[active.severity]
                )}
              >
                {active.severity.charAt(0) + active.severity.slice(1).toLowerCase()}
              </span>
            </div>

            <dl className="divide-y divide-slate-50 p-5 text-sm">
              {[
                ['Actor', `${active.actor} (${active.role})`],
                ['Action Type', ACTION_LABELS[active.actionType]],
                ['Entity', `${active.entityType} Â· ${active.entityId}`],
                ['Application', active.applicationNumber ?? 'â€”'],
                ['IP Address', active.ipAddress],
                ['Event ID', active.id],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="text-right text-slate-900">{value}</dd>
                </div>
              ))}
              <div className="py-2">
                <dt className="text-slate-500">Description</dt>
                <dd className="mt-1 text-slate-900">{active.description}</dd>
              </div>
            </dl>

            <div className="flex justify-end border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
