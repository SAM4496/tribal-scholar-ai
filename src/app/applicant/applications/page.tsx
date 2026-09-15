export default function ApplicationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 mt-1">View and manage your scholarship applications</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <div className="text-4xl mb-4">📄</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-500 mb-4">You haven&apos;t submitted any applications. Browse schemes to get started.</p>
        <a href="/applicant/schemes" className="inline-flex px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800">Browse Schemes →</a>
      </div>
    </div>
  );
}
