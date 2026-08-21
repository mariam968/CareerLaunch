import InternshipCard from '../components/InternshipCard'

function Dashboard() {
  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Good morning, Mariam 👋
        </h2>

        <p className="mt-1 text-slate-500">
          Find opportunities that launch your career.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Applications
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            12
          </h3>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            5
          </h3>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Interviews
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            2
          </h3>
        </div>
      </div>

      {/* Recommended internships */}
      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recommended Internships
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Opportunities that may be a good match for you.
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <InternshipCard
            title="Software Developer Intern"
            company="TechNova Uganda"
            location="Kampala"
            type="Full-time"
          />

          <InternshipCard
            title="Frontend Developer Intern"
            company="Digital Solutions Ltd"
            location="Kampala"
            type="Hybrid"
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard