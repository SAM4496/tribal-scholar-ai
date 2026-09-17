import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import AreaChart from '@/components/admin/AreaChart';
import DonutChart from '@/components/admin/DonutChart';
import BarList from '@/components/admin/BarList';
import StatusDistributionChart from '@/components/admin/StatusDistributionChart';
import {
  getApplicationsOverTime,
  getKpis,
  getSchemeSplit,
  getTopStates,
} from '@/lib/mock-analytics';
import { getStatusDistribution } from '@/lib/mock-data';

export default function AdminReportsPage() {
  const trend = getApplicationsOverTime();
  const schemeSplit = getSchemeSplit();
  const topStates = getTopStates();
  const statusDistribution = getStatusDistribution();
  const kpis = getKpis();

  const kpiCards = [
    { label: 'Total Applications', value: String(kpis.total), hint: 'across both schemes' },
    { label: 'Approval Rate', value: `${Math.round(kpis.approvalRate * 100)}%`, hint: `${kpis.approved} selected or approved` },
    { label: 'Avg. Processing Time', value: `${kpis.avgProcessingDays.toFixed(1)}d`, hint: 'from submission to decision' },
    { label: 'Deficiency Rate', value: `${Math.round(kpis.deficiencyRate * 100)}%`, hint: 'applications needing corrections' },
  ];

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="Insights into application volume, outcomes, and processing efficiency"
        actions={<DemoBadge />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpiCards.map((card, index) => (
          <div
            key={card.label}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-fade-in-up card card-hover p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section className="animate-fade-in-up card p-5 xl:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="section-title">Applications Received</h2>
              <p className="text-sm text-slate-500">Weekly submissions over the last 6 weeks</p>
            </div>
          </div>
          <AreaChart data={trend} />
        </section>

        <section className="animate-fade-in-up card p-5 animate-delay-150">
          <h2 className="section-title">Scheme Split</h2>
          <p className="mb-5 text-sm text-slate-500">Applications by scheme</p>
          <DonutChart data={schemeSplit} centerLabel="All schemes" />
        </section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="animate-fade-in-up card p-5">
          <h2 className="section-title">Top States</h2>
          <p className="mb-5 text-sm text-slate-500">Applications by applicant state</p>
          <BarList data={topStates} />
        </section>

        <section className="animate-fade-in-up card p-5 animate-delay-75 lg:col-span-2">
          <StatusDistributionChart data={statusDistribution} />
        </section>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-sm font-semibold text-blue-900">Data note</h2>
        <p className="mt-1 text-sm text-blue-800">
          All figures are generated from demo data for the hackathon prototype. Charts use CSS/SVG
          and will connect to live aggregate endpoints once the backend is ready.
        </p>
      </div>
    </div>
  );
}
