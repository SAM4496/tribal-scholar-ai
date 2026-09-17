import { type TrendPoint } from '@/lib/mock-analytics';

interface AreaChartProps {
  data: TrendPoint[];
}

const WIDTH = 600;
const HEIGHT = 220;
const PAD_X = 40;
const PAD_Y = 30;

function buildSmoothPath(points: [number, number][]): string {
  if (points.length === 0) return '';
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export default function AreaChart({ data }: AreaChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);
  const innerW = WIDTH - PAD_X * 2;
  const innerH = HEIGHT - PAD_Y * 2;

  const points: [number, number][] = data.map((point, index) => [
    PAD_X + (index * innerW) / Math.max(data.length - 1, 1),
    HEIGHT - PAD_Y - (point.value / max) * innerH,
  ]);

  const linePath = buildSmoothPath(points);
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1][0]} ${HEIGHT - PAD_Y} L ${points[0][0]} ${HEIGHT - PAD_Y} Z`
      : '';

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Applications received over time"
      >
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = PAD_Y + innerH * ratio;
          return (
            <line
              key={ratio}
              x1={PAD_X}
              x2={WIDTH - PAD_X}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray={ratio === 1 ? '0' : '4 6'}
            />
          );
        })}

        {areaPath && <path d={areaPath} fill="url(#area-fill)" className="animate-fade-in" />}

        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            className="animate-draw"
          />
        )}

        {points.map(([x, y], index) => (
          <g key={data[index].label} className="animate-pop" style={{ animationDelay: `${400 + index * 80}ms` }}>
            <circle cx={x} cy={y} r="8" fill="#2563eb" opacity="0.12" />
            <circle cx={x} cy={y} r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" />
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              className="fill-slate-700"
              style={{ fontSize: '12px', fontWeight: 600 }}
            >
              {data[index].value}
            </text>
            <text
              x={x}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-slate-400"
              style={{ fontSize: '11px' }}
            >
              {data[index].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
