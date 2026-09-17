import { type Slice } from '@/lib/mock-analytics';

interface BarListProps {
  data: Slice[];
  valueLabel?: string;
}

export default function BarList({ data, valueLabel = 'applications' }: BarListProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-600">{item.label}</span>
            <span className="font-medium tabular-nums text-slate-900">{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full animate-grow-x rounded-full"
              style={{
                width: `${Math.round((item.value / max) * 100)}%`,
                backgroundColor: item.color,
                animationDelay: `${index * 60}ms`,
              }}
            />
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <p className="py-6 text-center text-sm text-slate-500">No data available.</p>
      )}
      <p className="pt-1 text-xs text-slate-400">Values show number of {valueLabel}.</p>
    </div>
  );
}
