import { notFound } from 'next/navigation';
import ApplicationDetail from '@/components/admin/ApplicationDetail';
import { getApplicationDetail, getApplicationIds } from '@/lib/mock-application-details';

export function generateStaticParams() {
  return getApplicationIds().map((id) => ({ id }));
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getApplicationDetail(id);

  if (!detail) notFound();

  return <ApplicationDetail detail={detail} />;
}
