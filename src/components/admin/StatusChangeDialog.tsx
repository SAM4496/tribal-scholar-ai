'use client';

import { useState } from 'react';
import { type StatusTransition, isDeficiencyTransition } from '@/lib/workflow';
import { formatStatus } from '@/lib/utils';

interface StatusChangeDialogProps {
  applicationNumber: string;
  fromStatus: string;
  transition: StatusTransition;
  onClose: () => void;
  onConfirm: (remarks: string) => void;
}

export default function StatusChangeDialog({
  applicationNumber,
  fromStatus,
  transition,
  onClose,
  onConfirm,
}: StatusChangeDialogProps) {
  const [remarks, setRemarks] = useState('');
  const deficiencyMode = isDeficiencyTransition(transition);
  const requiresRemarks = deficiencyMode;

  const handleConfirm = () => {
    if (requiresRemarks && remarks.trim() === '') return;
    onConfirm(remarks.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {deficiencyMode ? 'Create Deficiency' : 'Confirm Status Change'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{applicationNumber}</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              {formatStatus(fromStatus)}
            </span>
            <span className="text-gray-400">→</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
              {formatStatus(transition.to)}
            </span>
          </div>

          <div>
            <label htmlFor="dialog-remarks" className="block text-sm font-medium text-gray-700 mb-1">
              {deficiencyMode ? 'Deficiency description' : 'Remarks (optional)'}
            </label>
            <textarea
              id="dialog-remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              placeholder={
                deficiencyMode
                  ? 'Describe what the applicant needs to correct or re-upload…'
                  : 'Add a note for the audit trail…'
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {deficiencyMode && remarks.trim() === '' && (
              <p className="text-xs text-amber-600 mt-1">A description is required to create a deficiency.</p>
            )}
          </div>

          <p className="text-xs text-gray-400">
            This action is recorded in the application status history. Demo only — no data is persisted.
          </p>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={requiresRemarks && remarks.trim() === ''}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deficiencyMode ? 'Create Deficiency' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
