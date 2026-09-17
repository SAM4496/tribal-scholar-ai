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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-100">
          <h2 className="section-title">
            {deficiencyMode ? 'Create Deficiency' : 'Confirm Status Change'}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">{applicationNumber}</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
              {formatStatus(fromStatus)}
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
              {formatStatus(transition.to)}
            </span>
          </div>

          <div>
            <label htmlFor="dialog-remarks" className="block text-sm font-medium text-slate-700 mb-1">
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
              className="input"
            />
            {deficiencyMode && remarks.trim() === '' && (
              <p className="text-xs text-amber-600 mt-1">A description is required to create a deficiency.</p>
            )}
          </div>

          <p className="text-xs text-slate-400">
            This action is recorded in the application status history. Demo only — no data is persisted.
          </p>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
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
