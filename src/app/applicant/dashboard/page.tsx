export default function ApplicantDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Applicant Dashboard</h1>
        <p className="text-gray-500 mt-1">View your applications, track status, and see notifications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Active Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Pending Actions</p>
          <p className="text-3xl font-bold text-orange-600 mt-1">0</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Notifications</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">0</p>
        </div>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-500 mb-4">Start by browsing available schemes and submitting your first application.</p>
        <a
          href="/applicant/schemes"
          className="inline-flex px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800"
        >
          Browse Schemes →
        </a>
      </div>
    </div>
  );
}
