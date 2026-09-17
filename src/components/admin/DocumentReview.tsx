import { type MockDocument } from '@/lib/mock-application-details';
import ResultBadge from './ResultBadge';

interface DocumentReviewProps {
  documents: MockDocument[];
  bare?: boolean;
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

export default function DocumentReview({ documents, bare = false }: DocumentReviewProps) {
  const list = (
    <div className="space-y-3">
      {documents.map((document) => (
        <details
          key={document.id}
          className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-colors open:border-blue-200 open:shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 transition-colors hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{document.documentName}</p>
              <p className="mt-0.5 truncate text-xs text-slate-400">
                {document.fileName} · {formatSize(document.sizeKB)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {document.verification && (
                <span className="tabular-nums text-xs font-medium text-slate-500">
                  {Math.round(document.verification.confidenceScore * 100)}%
                </span>
              )}
              <ResultBadge status={document.status} />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </summary>

          <div className="animate-fade-in space-y-4 border-t border-slate-100 bg-slate-50/40 p-4">
            {document.ocrResult && (
              <div>
                <h4 className="eyebrow mb-2">
                  OCR Extracted Fields
                  <span className="ml-2 normal-case font-normal text-slate-400">
                    confidence {Math.round(document.ocrResult.confidence * 100)}%
                  </span>
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(document.ocrResult.extractedFields).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-3 text-sm">
                      <dt className="text-slate-500">{formatKey(key)}</dt>
                      <dd className="text-slate-900 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {document.verification && (
              <div>
                <h4 className="eyebrow mb-2">
                  Verification Checks ({document.verification.verificationType})
                </h4>
                <ul className="space-y-2">
                  {document.verification.checks.map((check) => (
                    <li key={check.label} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-600">
                        {check.label}
                        <span className="text-slate-400"> — {check.detail}</span>
                      </span>
                      <ResultBadge status={check.status} />
                    </li>
                  ))}
                </ul>
                {document.verification.remarks && (
                  <p className="text-xs text-slate-400 mt-2">{document.verification.remarks}</p>
                )}
              </div>
            )}

            {!document.ocrResult && !document.verification && (
              <p className="text-sm text-slate-500">
                Not yet processed. AI extraction will appear once verification runs.
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  );

  if (bare) return list;

  return (
    <div className="card p-5">
      <h2 className="section-title">Documents & AI Extraction</h2>
      <p className="text-sm text-slate-500 mb-4">
        OCR extracted fields and verification checks per uploaded document
      </p>
      {list}
    </div>
  );
}
