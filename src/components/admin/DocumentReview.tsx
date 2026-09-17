import { type MockDocument } from '@/lib/mock-application-details';
import ResultBadge from './ResultBadge';

interface DocumentReviewProps {
  documents: MockDocument[];
}

function formatSize(sizeKB: number): string {
  return sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export default function DocumentReview({ documents }: DocumentReviewProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-900">Documents & AI Extraction</h2>
      <p className="text-sm text-gray-500 mb-4">
        OCR extracted fields and verification checks per uploaded document
      </p>

      <div className="space-y-3">
        {documents.map((document) => (
          <details key={document.id} className="border border-gray-100 rounded-lg">
            <summary className="flex items-center justify-between gap-3 p-3 cursor-pointer list-none">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{document.documentName}</p>
                <p className="text-xs text-gray-400 truncate">
                  {document.fileName} · {formatSize(document.sizeKB)}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {document.verification && (
                  <span className="text-xs text-gray-500">
                    {Math.round(document.verification.confidenceScore * 100)}%
                  </span>
                )}
                <ResultBadge status={document.status} />
              </div>
            </summary>

            <div className="border-t border-gray-100 p-3 space-y-4">
              {document.ocrResult && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    OCR Extracted Fields
                    <span className="ml-2 normal-case font-normal text-gray-400">
                      confidence {Math.round(document.ocrResult.confidence * 100)}%
                    </span>
                  </h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(document.ocrResult.extractedFields).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-3 text-sm">
                        <dt className="text-gray-500">{formatKey(key)}</dt>
                        <dd className="text-gray-900 text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {document.verification && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Verification Checks ({document.verification.verificationType})
                  </h4>
                  <ul className="space-y-2">
                    {document.verification.checks.map((check) => (
                      <li key={check.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-gray-600">
                          {check.label}
                          <span className="text-gray-400"> — {check.detail}</span>
                        </span>
                        <ResultBadge status={check.status} />
                      </li>
                    ))}
                  </ul>
                  {document.verification.remarks && (
                    <p className="text-xs text-gray-400 mt-2">{document.verification.remarks}</p>
                  )}
                </div>
              )}

              {!document.ocrResult && !document.verification && (
                <p className="text-sm text-gray-500">
                  Not yet processed. AI extraction will appear once verification runs.
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
