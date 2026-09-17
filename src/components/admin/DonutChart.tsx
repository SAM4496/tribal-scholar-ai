import { type Slice } from '@/lib/mock-analytics';

interface DonutChartProps {
  data: Slice[];
  centerLabel?: string;
}

const SIZE = 180;
const RADIUS = 68;
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DonutChart({ data, centerLabel = 'Total' }: DonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  const segments: (Slice & { dash: number; offset: number; fraction: number })[] = [];
  let cursor = 0;
  for (const slice of data) {
    const fraction = total > 0 ? slice.value / total : 0;
    const dash = fraction * CIRCUMFERENCE;
    segments.push({ ...slice, dash, offset: cursor, fraction });
    cursor += dash;
  }

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-40 w-40 shrink-0 -rotate-90"
        role="img"
        aria-label="Scheme distribution"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={STROKE}
        />
        {segments.map((segment) => (
          <circle
            key={segment.label}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={segment.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${segment.dash} ${CIRCUMFERENCE - segment.dash}`}
            strokeDashoffset={-segment.offset}
            className="animate-pop"
            style={{ transformOrigin: 'center' }}
          />
        ))}
      </svg>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{centerLabel}</p>
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
            <div>
              <p className="text-sm font-medium text-slate-900">{segment.label}</p>
              <p className="text-xs text-slate-500">
                {segment.value} applications · {Math.round(segment.fraction * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
