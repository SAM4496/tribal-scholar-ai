import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import AuditLogTable from '@/components/admin/AuditLogTable';
import { getAuditLog } from '@/lib/mock-audit';

export default function AdminAuditPage() {
  const entries = getAuditLog();

  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="Immutable record of every action taken in the system"
        actions={<DemoBadge />}
      />
      <AuditLogTable entries={entries} />
    </div>
  );
}
