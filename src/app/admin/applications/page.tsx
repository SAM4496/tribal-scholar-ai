import ApplicationsTable from '@/components/admin/ApplicationsTable';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';

export default function AdminApplicationsPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Application Management</h1>
          <p className="text-gray-500 mt-1">Review, verify, and manage scholarship applications</p>
        </div>
        <span className="self-start sm:self-auto inline-block bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-3 py-1 rounded-full">
          Demo Data — Hackathon Prototype
        </span>
      </div>

      <ApplicationsTable applications={MOCK_APPLICATIONS} />
    </div>
  );
}
