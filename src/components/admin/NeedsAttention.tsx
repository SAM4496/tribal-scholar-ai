import Link from 'next/link';
import { type MockApplication } from '@/lib/mock-data';
import { cn, getInitials, formatStatus } from '@/lib/utils';

interface NeedsAttentionProps {
  items: MockApplication[];
}

export default function NeedsAttention({ items }: NeedsAttentionProps) {
  if (items.length === 0) {
    return (
      <div className="card flex h-full flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-title">Needs Attention</h2>
          <span className="chip bg-emerald-50 text-emerald-700">0 open</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-lg">
            ✓
          </span>
          <p className="text-sm font-medium text-slate-700">All caught up!</p>
          <p className="max-w-[15rem] text-xs text-slate-500">
            No applications currently need corrections.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="section-title">Needs Attention</h2>
        <span className="chip shrink-0 bg-orange-50 text-orange-700">{items.length} open</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">Applications flagged for correction</p>

      <ul className="mt-4 flex-1 space-y-3">
        {items.map((application) => (
          <li
            key={application.id}
            className="rounded-xl border border-orange-100 bg-orange-50/50 p-3 transition-colors hover:border-orange-200 hover:bg-orange-50"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-[0.65rem] font-bold text-white shadow-sm">
                {getInitials(application.applicant.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {application.applicant.name}
                </p>
                <p className="text-xs text-slate-500">{application.applicationNumber}</p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
                  'bg-orange-100 text-orange-700'
                )}
              >
                {formatStatus(application.status)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/admin/deficiencies"
        className="group mt-4 inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
      >
        Open deficiencies panel
        <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}