import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import DocumentQueue from '@/components/admin/DocumentQueue';
import { getDocumentQueue } from '@/lib/mock-documents';

export default function AdminDocumentsPage() {
  const items = getDocumentQueue();

  return (
    <div>
      <PageHeader
        title="Document Verification"
        description="Review uploaded documents and AI/OCR verification results"
        actions={<DemoBadge />}
      />
      <DocumentQueue items={items} />
    </div>
  );
}
