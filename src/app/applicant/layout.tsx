import Sidebar, { applicantNavItems } from '@/components/layout/Sidebar';

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar items={applicantNavItems} title="Applicant Portal" />
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
