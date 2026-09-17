import ApplicationsTable from '@/components/admin/ApplicationsTable';
import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';

export default function AdminApplicationsPage() {
  return (
    <div>
      <PageHeader
        title="Application Management"
        description="Review, verify, and manage scholarship applications"
        actions={<DemoBadge />}
      />

      <ApplicationsTable applications={MOCK_APPLICATIONS} />
    </div>
  );
}
