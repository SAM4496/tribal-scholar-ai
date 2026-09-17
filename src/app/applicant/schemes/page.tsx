export default function SchemesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">Browse Schemes</h1>
        <p className="text-slate-500 mt-1">Explore available scholarship and fellowship schemes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card card-hover p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">🎓</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Open</span>
          </div>
          <h3 className="section-title mb-2">National Fellowship for ST (NFST)</h3>
          <p className="text-sm text-slate-600 mb-4">Financial assistance for ST students pursuing M.Phil and Ph.D. degrees in Indian universities.</p>
          <a href="/applicant/schemes/nfst" className="text-blue-700 text-sm font-medium hover:text-blue-800">View Details →</a>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">🌍</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Open</span>
          </div>
          <h3 className="section-title mb-2">National Overseas Scholarship (NOS)</h3>
          <p className="text-sm text-slate-600 mb-4">Financial assistance for ST students pursuing Master&apos;s and Ph.D. programs abroad.</p>
          <a href="/applicant/schemes/nos" className="text-blue-700 text-sm font-medium hover:text-blue-800">View Details →</a>
        </div>
      </div>
    </div>
  );
}
