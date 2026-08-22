function InternshipDetails() {
  return (
    <div>
      <div className="mb-8">
        <button className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-700">
          ← Back to internships
        </button>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="flex gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600">
                T
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Software Developer Intern
                </h1>

                <p className="mt-2 text-slate-500">
                  TechNova Uganda
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    Full-time
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    📍 Kampala
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    Software Development
                  </span>
                </div>
              </div>
            </div>

            <button className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
              Apply Now
            </button>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              About the Internship
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We are looking for a motivated student to join our
              development team and gain practical experience building
              modern software applications.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Responsibilities
            </h2>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>• Assist with developing web applications.</li>
              <li>• Work with developers on new features.</li>
              <li>• Test and debug application functionality.</li>
              <li>• Participate in team development activities.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Requirements
            </h2>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>• Currently enrolled in a relevant university program.</li>
              <li>• Basic knowledge of programming.</li>
              <li>• Familiarity with Git and GitHub.</li>
              <li>• Good communication and teamwork skills.</li>
            </ul>
          </section>

        </div>

        <aside>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Internship Information
            </h2>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-xs text-slate-400">
                  Location
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Kampala, Uganda
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Internship Type
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Full-time
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Category
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  Software Development
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Application Deadline
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  30 September 2026
                </p>
              </div>

            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default InternshipDetails