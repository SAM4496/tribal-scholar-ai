import StatsCards from '@/components/admin/StatsCards';
import RecentApplications from '@/components/admin/RecentApplications';
import StatusDistributionChart from '@/components/admin/StatusDistributionChart';
import {
  getDashboardStats,
  getRecentApplications,
  getStatusDistribution,
} from '@/lib/mock-data';

const SCHEME_LABELS: Record<string, string> = {
  NFST: 'National Fellowship for Scheduled Tribes',
  NOS: 'National Overseas Scholarship',
};

export default function AdminDashboard() {
  const stats = getDashboardStats();
  const recentApplications = getRecentApplications(10);
  const statusDistribution = getStatusDistribution();

  const schemeEntries = Object.entries(stats.byScheme).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of applications, statistics, and recent activity
          </p>
        </div>
        <span className="self-start sm:self-auto inline-block bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-3 py-1 rounded-full">
          Demo Data — Hackathon Prototype
        </span>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2">
          <RecentApplications applications={recentApplications} />
        </div>
        <StatusDistributionChart data={statusDistribution} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {schemeEntries.map(([code, count]) => {
          const share = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
          return (
            <div key={code} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded">
                  {code}
                </span>
                <span className="text-2xl font-bold text-gray-900">{count}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{SCHEME_LABELS[code] ?? code}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${share}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">{share}% of all applications</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
