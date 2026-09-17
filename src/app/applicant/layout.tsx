import Sidebar, { applicantNavItems } from '@/components/layout/Sidebar';

export default function ApplicantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar items={applicantNavItems} title="Applicant Portal" />
      <div className="min-w-0 flex-1 animate-fade-in px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-[80rem]">{children}</div>
      </div>
    </div>
  );
}
