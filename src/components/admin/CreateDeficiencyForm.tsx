'use client';

import { useState, type FormEvent } from 'react';
import { DOCUMENT_TYPES } from '@/lib/mock-deficiencies';

interface ApplicationOption {
  id: string;
  applicationNumber: string;
  applicantName: string;
}

interface CreateDeficiencyFormProps {
  applications: ApplicationOption[];
  onCreate: (payload: { application: ApplicationOption; documentType: string; description: string }) => void;
}

export default function CreateDeficiencyForm({ applications, onCreate }: CreateDeficiencyFormProps) {
  const [open, setOpen] = useState(false);
  const [applicationId, setApplicationId] = useState(applications[0]?.id ?? '');
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0].value);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const close = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const application = applications.find((a) => a.id === applicationId);
    if (!application || description.trim() === '') {
      setError('Please select an application and enter a description.');
      return;
    }
    onCreate({ application, documentType, description: description.trim() });
    setDescription('');
    setError('');
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
      >
        <span className="text-base leading-none">+</span> New Deficiency
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in"
          onClick={close}
          role="presentation"
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h2 className="section-title">Create Deficiency</h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Flag a document the applicant must correct
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <label htmlFor="def-application" className="mb-1 block text-sm font-medium text-slate-700">
                    Application
                  </label>
                  <select
                    id="def-application"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="input"
                  >
                    {applications.map((application) => (
                      <option key={application.id} value={application.id}>
                        {application.applicationNumber} — {application.applicantName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="def-document" className="mb-1 block text-sm font-medium text-slate-700">
                    Document
                  </label>
                  <select
                    id="def-document"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="input"
                  >
                    {DOCUMENT_TYPES.map((doc) => (
                      <option key={doc.value} value={doc.value}>
                        {doc.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="def-description" className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    id="def-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe what the applicant needs to correct or re-upload…"
                    className="input"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Create Deficiency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
