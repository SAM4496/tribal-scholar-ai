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

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        + New Deficiency
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Create Deficiency</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="def-application" className="block text-sm font-medium text-gray-700 mb-1">
            Application
          </label>
          <select
            id="def-application"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {applications.map((application) => (
              <option key={application.id} value={application.id}>
                {application.applicationNumber} — {application.applicantName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="def-document" className="block text-sm font-medium text-gray-700 mb-1">
            Document
          </label>
          <select
            id="def-document"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DOCUMENT_TYPES.map((doc) => (
              <option key={doc.value} value={doc.value}>
                {doc.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="def-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="def-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe what the applicant needs to correct or re-upload…"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Create Deficiency
        </button>
      </div>
    </form>
  );
}
