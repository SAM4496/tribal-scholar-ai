'use client';

import { useState } from 'react';
import DeficiencyList from '@/components/admin/DeficiencyList';
import CreateDeficiencyForm from '@/components/admin/CreateDeficiencyForm';
import DeficiencyReviewPanel from '@/components/admin/DeficiencyReviewPanel';
import PageHeader, { DemoBadge } from '@/components/admin/PageHeader';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import { MOCK_DEFICIENCIES, type MockDeficiencyRecord } from '@/lib/mock-deficiencies';

export default function DeficienciesPage() {
  const [deficiencies, setDeficiencies] = useState<MockDeficiencyRecord[]>(MOCK_DEFICIENCIES);
  const [activeReview, setActiveReview] = useState<MockDeficiencyRecord | null>(null);

  const applications = MOCK_APPLICATIONS.map((a) => ({
    id: a.id,
    applicationNumber: a.applicationNumber,
    applicantName: a.applicant.name,
  }));

  const counts = {
    OPEN: deficiencies.filter((d) => d.status === 'OPEN').length,
    RESPONDED: deficiencies.filter((d) => d.status === 'RESPONDED').length,
    RESOLVED: deficiencies.filter((d) => d.status === 'RESOLVED').length,
    REJECTED: deficiencies.filter((d) => d.status === 'REJECTED').length,
  };

  const handleCreate = ({
    application,
    documentType,
    description,
  }: {
    application: { id: string; applicationNumber: string; applicantName: string };
    documentType: string;
    description: string;
  }) => {
    const record: MockDeficiencyRecord = {
      id: `def-${Date.now()}`,
      applicationId: application.id,
      applicationNumber: application.applicationNumber,
      applicantName: application.applicantName,
      documentType,
      description,
      status: 'OPEN',
      createdByName: 'Admin (Demo)',
      createdAt: new Date().toISOString(),
    };
    setDeficiencies((prev) => [record, ...prev]);
  };

  const updateActive = (status: MockDeficiencyRecord['status'], remarks: string) => {
    if (!activeReview) return;
    const resolved = {
      ...activeReview,
      status,
      remarks,
      resolvedByName: 'Admin (Demo)',
      resolvedAt: new Date().toISOString(),
    };
    setDeficiencies((prev) => prev.map((d) => (d.id === activeReview.id ? resolved : d)));
    setActiveReview(null);
  };

  return (
    <div>
      <PageHeader
        title="Deficiency Management"
        description="Create and track deficiencies in applications"
        actions={
          <>
            <DemoBadge />
            <CreateDeficiencyForm applications={applications} onCreate={handleCreate} />
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card card-hover relative overflow-hidden border-l-4 border-l-orange-500 p-4">
          <p className="eyebrow">Open</p>
          <p className="mt-2 font-display text-[1.75rem] font-bold leading-none tabular-nums text-orange-600">
            {counts.OPEN}
          </p>
        </div>
        <div className="card card-hover relative overflow-hidden border-l-4 border-l-blue-500 p-4">
          <p className="eyebrow">Responded</p>
          <p className="mt-2 font-display text-[1.75rem] font-bold leading-none tabular-nums text-blue-600">
            {counts.RESPONDED}
          </p>
        </div>
        <div className="card card-hover relative overflow-hidden border-l-4 border-l-emerald-500 p-4">
          <p className="eyebrow">Resolved</p>
          <p className="mt-2 font-display text-[1.75rem] font-bold leading-none tabular-nums text-emerald-600">
            {counts.RESOLVED}
          </p>
        </div>
        <div className="card card-hover relative overflow-hidden border-l-4 border-l-red-500 p-4">
          <p className="eyebrow">Rejected</p>
          <p className="mt-2 font-display text-[1.75rem] font-bold leading-none tabular-nums text-red-600">
            {counts.REJECTED}
          </p>
        </div>
      </div>

      <DeficiencyList deficiencies={deficiencies} onReview={setActiveReview} />

      {activeReview && (
        <DeficiencyReviewPanel
          record={activeReview}
          onClose={() => setActiveReview(null)}
          onResolve={(remarks) => updateActive('RESOLVED', remarks)}
          onReject={(remarks) => updateActive('REJECTED', remarks)}
        />
      )}
    </div>
  );
}
