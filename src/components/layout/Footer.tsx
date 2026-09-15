export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">Tribal Scholar AI</h3>
            <p className="text-sm leading-relaxed">
              AI-enabled Scholarship and Fellowship Management System for the
              Ministry of Tribal Affairs.
            </p>
          </div>

          {/* Supported Schemes */}
          <div>
            <h3 className="text-white font-semibold mb-3">Supported Schemes</h3>
            <ul className="text-sm space-y-2">
              <li>National Fellowship for ST (NFST)</li>
              <li>National Overseas Scholarship (NOS)</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/login" className="hover:text-white transition-colors">
                  Applicant Login
                </a>
              </li>
              <li>
                <a href="/admin/dashboard" className="hover:text-white transition-colors">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center sm:text-left">
              ⚠️ This is a <strong className="text-yellow-400">Hackathon Prototype / Demo</strong>.
              Not an official Government of India application.
            </p>
            <p className="text-xs">
              © {new Date().getFullYear()} Hackathon Team — Built for MoTA Hackathon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
