import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import QuickActions from '@/components/admin/QuickActions';
import StatsCards from '@/components/admin/StatsCards';
import KpiStrip from '@/components/admin/KpiStrip';
import RecentApplications from '@/components/admin/RecentApplications';
import NeedsAttention from '@/components/admin/NeedsAttention';
import StatusDistributionChart from '@/components/admin/StatusDistributionChart';
import AreaChart from '@/components/admin/AreaChart';
import DonutChart from '@/components/admin/DonutChart';
import Reveal from '@/components/landing/Reveal';
import { ApplicationStatus } from '@/types';
import {
  MOCK_APPLICATIONS,
  getDashboardStats,
  getRecentApplications,
  getStatusDistribution,
} from '@/lib/mock-data';
import { getApplicationsOverTime, getSchemeSplit } from '@/lib/mock-analytics';
import { cn } from '@/lib/utils';

const SCHEME_LABELS: Record<string, string> = {
  NFST: 'National Fellowship for Scheduled Tribes',
  NOS: 'National Overseas Scholarship',
};

const SCHEME_GRADIENTS: Record<string, string> = {
  NFST: 'from-blue-500 to-indigo-600',
  NOS: 'from-emerald-500 to-teal-600',
};

export default function AdminDashboard() {
  const stats = getDashboardStats();
  const recentApplications = getRecentApplications(10);
  const needyApplications = MOCK_APPLICATIONS.filter(
    (a) => a.status === ApplicationStatus.DEFICIENT
  );
  const statusDistribution = getStatusDistribution();
  const trend = getApplicationsOverTime(6);
  const schemeSplit = getSchemeSplit();

  const schemeEntries = Object.entries(stats.byScheme).sort((a, b) => b[1] - a[1]);

  const perScheme = schemeEntries.map(([code, count]) => {
    const apps = MOCK_APPLICATIONS.filter((a) => a.schemeCode === code);
    const countOf = (statuses: ApplicationStatus[]) =>
      statuses.reduce((sum, status) => sum + apps.filter((a) => a.status === status).length, 0);
    return {
      code,
      total: count,
      share: stats.total > 0 ? Math.round((count / stats.total) * 100) : 0,
      pipeline: countOf([ApplicationStatus.ELIGIBLE, ApplicationStatus.UNDER_SCREENING]),
      selected: countOf([ApplicationStatus.SELECTED, ApplicationStatus.APPROVED]),
      deficient: countOf([ApplicationStatus.DEFICIENT]),
      label: SCHEME_LABELS[code] ?? code,
    };
  });

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of applications, statistics, and processing performance"
        actions={<DemoBadge />}
      />

      <div className="space-y-6">
        <QuickActions />

        <StatsCards stats={stats} />

        <KpiStrip />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="h-full lg:col-span-2">
            <section className="card h-full p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="section-title">Applications Received</h2>
                  <p className="text-sm text-slate-500">Weekly submissions over the last 6 weeks</p>
                </div>
                <span className="chip shrink-0 bg-blue-50 text-blue-700">Trend</span>
              </div>
              <AreaChart data={trend} />
            </section>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <section className="card h-full p-5">
              <h2 className="section-title">Scheme Split</h2>
              <p className="mb-5 text-sm text-slate-500">Applications by scheme</p>
              <DonutChart data={schemeSplit} centerLabel="All schemes" />
            </section>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="h-full lg:col-span-2">
            <RecentApplications applications={recentApplications} />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <StatusDistributionChart data={statusDistribution} />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="h-full">
            <NeedsAttention items={needyApplications} />
          </Reveal>

          <Reveal delay={120} className="h-full lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {perScheme.map((scheme, index) => {
                const gradient = SCHEME_GRADIENTS[scheme.code] ?? SCHEME_GRADIENTS.NFST;
                return (
                  <div
                    key={scheme.code}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="card card-hover group relative h-full overflow-hidden p-5"
                  >
                    <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', gradient)} />
                    <div
                      className={cn(
                        'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20',
                        gradient
                      )}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white shadow-sm',
                            gradient
                          )}
                        >
                          {scheme.code}
                        </span>
                        <span className="font-display text-2xl font-bold tracking-tight text-slate-900">
                          {scheme.total}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{scheme.label}</p>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn('h-full rounded-full bg-gradient-to-r', gradient)}
                          style={{ width: `${scheme.share}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{scheme.share}% of all applications</p>

                      <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-3">
                        <div>
                          <p className="font-display text-base font-bold tabular-nums text-cyan-600">
                            {scheme.pipeline}
                          </p>
                          <p className="text-[0.68rem] text-slate-400">In pipeline</p>
                        </div>
                        <div className="pl-4">
                          <p className="font-display text-base font-bold tabular-nums text-indigo-600">
                            {scheme.selected}
                          </p>
                          <p className="text-[0.68rem] text-slate-400">Selected</p>
                        </div>
                        <div className="pl-4">
                          <p className="font-display text-base font-bold tabular-nums text-orange-600">
                            {scheme.deficient}
                          </p>
                          <p className="text-[0.68rem] text-slate-400">Deficient</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}