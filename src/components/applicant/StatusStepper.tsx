import { ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';
import {
  getMilestoneStep,
  getMilestones,
} from '@/lib/mock-applicant-applications';

interface StatusStepperProps {
  status: ApplicationStatus;
  className?: string;
  showLabels?: boolean;
}

const PROBLEM_STATUSES = new Set<ApplicationStatus>([
  ApplicationStatus.DEFICIENT,
  ApplicationStatus.REJECTED,
  ApplicationStatus.INELIGIBLE,
]);

export default function StatusStepper({
  status,
  className,
  showLabels = true,
}: StatusStepperProps) {
  const steps = getMilestones();
  const current = getMilestoneStep(status);
  const isProblem = PROBLEM_STATUSES.has(status);

  return (
    <div className={cn('w-full', className)} aria-label="Application progress">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const isLast = index === steps.length - 1;

          return (
            <div key={step} className={cn('flex items-center', !isLast && 'flex-1')}>
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold transition-all duration-300',
                    done &&
                      'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/30',
                    active &&
                      !isProblem &&
                      'bg-white text-blue-700 ring-2 ring-blue-600 shadow-md shadow-blue-600/25',
                    active && isProblem && 'bg-orange-50 text-orange-600 ring-2 ring-orange-500',
                    !done && !active && 'bg-slate-100 text-slate-400'
                  )}
                >
                  {done ? (
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                {showLabels && (
                  <span
                    className={cn(
                      'hidden text-center text-[0.65rem] font-medium leading-tight tracking-wide sm:block',
                      active ? 'text-blue-700' : done ? 'text-slate-500' : 'text-slate-400'
                    )}
                  >
                    {step}
                  </span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mx-1.5 h-[3px] flex-1 rounded-full transition-colors duration-500 sm:mx-2',
                    index < current
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-500'
                      : 'bg-slate-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}