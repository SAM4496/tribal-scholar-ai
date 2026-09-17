import { type SelectionEntry } from '@/lib/mock-selection';

interface SelectionSummaryProps {
  entries: SelectionEntry[];
}

export default function SelectionSummary({ entries }: SelectionSummaryProps) {
  const selected = entries.filter((e) => e.decision === 'SELECTED').length;
  const rejected = entries.filter((e) => e.decision === 'REJECTED').length;
  const pending = entries.filter((e) => e.decision === 'PENDING').length;

  const cards = [
    { label: 'In Screening Pool', value: entries.length, accent: 'border-l-blue-600', color: 'text-gray-900' },
    { label: 'Selected', value: selected, accent: 'border-l-emerald-500', color: 'text-emerald-600' },
    { label: 'Rejected', value: rejected, accent: 'border-l-red-500', color: 'text-red-600' },
    { label: 'Pending Decision', value: pending, accent: 'border-l-amber-500', color: 'text-amber-600' },
  ];

  const schemes = (['NFST', 'NOS'] as const).map((code) => {
    const schemeEntries = entries.filter((e) => e.application.schemeCode === code);
    return {
      code,
      total: schemeEntries.length,
      selected: schemeEntries.filter((e) => e.decision === 'SELECTED').length,
    };
  });

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white border border-gray-200 border-l-4 ${card.accent} rounded-xl p-5`}
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {schemes.map((scheme) => (
          <div key={scheme.code} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded">
                {scheme.code}
              </span>
              <p className="text-sm text-gray-500 mt-1">In pool: {scheme.total}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">{scheme.selected}</p>
              <p className="text-xs text-gray-500">selected</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
