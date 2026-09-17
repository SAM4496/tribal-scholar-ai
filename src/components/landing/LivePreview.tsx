'use client';

const TICKER_ITEMS = [
  'NFST fellowship approved — app-00014',
  'Document verified · confidence 0.97',
  'Eligibility check passed — NOS',
  'New application submitted',
  'Merit list recomputed',
  'Deficiency marked resolved',
];

const BARS = [62, 84, 48, 96, 72, 58, 88, 66];

export default function LivePreview() {
  return (
    <div className="animate-floaty-2 relative hidden w-full max-w-md lg:block">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-emerald-500/20 blur-2xl" />

      <div className="glass-dark relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[0.65rem] text-slate-400">
              tribal-scholar.ai — live
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[0.62rem] font-semibold text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <defs>
                <linearGradient id="lp-ring" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa" />
                  <stop offset="0.5" stopColor="#818cf8" />
                  <stop offset="1" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="url(#lp-ring)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="72 214"
                className="animate-draw"
              />
            </svg>
            <p className="mt-1 font-display text-sm font-bold text-white">2 schemes</p>
            <p className="text-[0.62rem] text-slate-400">live in system</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-[0.65rem]">
                <span className="text-slate-400">Applications</span>
                <span className="font-mono text-emerald-300">48</span>
              </div>
              <div className="mb-1 mt-2 flex items-end justify-between gap-1" style={{ height: 44 }}>
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className="animate-bar-grow w-full rounded-sm bg-gradient-to-t from-blue-600 to-indigo-400"
                    style={{ height: `${h}%`, animationDelay: `${600 + i * 90}ms` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-[0.65rem]">
                <span className="text-slate-400">Verified docs</span>
                <span className="font-mono text-amber-300">96%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="progress-shine h-full rounded-full"
                  style={{ width: '96%', animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-3">
          <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Live activity
          </p>
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex w-max gap-8 whitespace-nowrap pr-8">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-[0.68rem] text-slate-300">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}