import { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}

export default function PageHeader({
  title,
  description,
  actions,
  eyebrow = 'Ministry of Tribal Affairs',
}: PageHeaderProps) {
  return (
    <div className="mb-7 animate-fade-in-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
            {eyebrow}
          </p>
          <h1 className="mt-2.5 font-display text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.9rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
      <div className="divider-accent mt-5 h-[3px] w-full" />
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="chip border border-amber-200/80 bg-amber-50/80 text-amber-700 backdrop-blur">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
      </span>
      Demo Data · Hackathon Prototype
    </span>
  );
}
