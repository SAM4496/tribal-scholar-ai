import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Prototype badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Hackathon Prototype / Demo
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              AI-Enabled Scholarship &amp; Fellowship Management
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              A digital platform to manage the complete lifecycle of scholarship
              and fellowship applications for Scheduled Tribe students under the
              Ministry of Tribal Affairs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-blue-900 bg-white rounded-lg hover:bg-blue-50 transition-colors"
              >
                Apply Now →
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
              >
                Login to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Schemes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apply for scholarships and fellowships designed to support
              Scheduled Tribe students in pursuing higher education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* NFST Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                National Fellowship for ST (NFST)
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Financial assistance for Scheduled Tribe students pursuing
                M.Phil and Ph.D. degrees in Indian universities and research
                institutions.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  M.Phil / Ph.D.
                </span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  Fellowship
                </span>
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  Research
                </span>
              </div>
              <Link
                href="/login"
                className="text-blue-700 text-sm font-medium hover:text-blue-800"
              >
                View Details & Apply →
              </Link>
            </div>

            {/* NOS Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                National Overseas Scholarship (NOS)
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Financial assistance for Scheduled Tribe students for pursuing
                Master&apos;s and Ph.D. programs at top universities abroad.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  Master&apos;s / Ph.D.
                </span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  Overseas
                </span>
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                  International
                </span>
              </div>
              <Link
                href="/login"
                className="text-blue-700 text-sm font-medium hover:text-blue-800"
              >
                View Details & Apply →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="📄"
              title="Smart Document Processing"
              description="AI-powered OCR extracts and verifies information from uploaded documents automatically."
            />
            <FeatureCard
              icon="✅"
              title="Automatic Eligibility Check"
              description="Configurable rules engine validates eligibility criteria against applicant data."
            />
            <FeatureCard
              icon="📊"
              title="Transparent Selection"
              description="Clear scoring criteria with full transparency — every score has a visible reason."
            />
            <FeatureCard
              icon="🔒"
              title="Secure & Audited"
              description="Complete audit trail of all actions. Role-based access ensures data security."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StepCard step={1} title="Register & Profile" description="Create your account and complete your profile with personal and academic details." />
            <StepCard step={2} title="Choose Scheme & Apply" description="Browse available schemes, check eligibility, and fill the application form." />
            <StepCard step={3} title="Upload Documents" description="Upload required documents. AI verifies and extracts information automatically." />
            <StepCard step={4} title="Track & Get Selected" description="Track your application status in real-time through every stage until final decision." />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-yellow-50 border-t border-yellow-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-yellow-800">
            ⚠️ <strong>Disclaimer:</strong> This is a hackathon prototype/demo
            application. It is NOT an official Government of India or Ministry of
            Tribal Affairs application. All data shown is simulated for
            demonstration purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
        {step}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
