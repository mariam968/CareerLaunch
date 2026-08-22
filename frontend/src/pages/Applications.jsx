const applications = [
  {
    id: 1,
    title: 'Software Developer Intern',
    company: 'TechNova Uganda',
    location: 'Kampala',
    type: 'Full-time',
    status: 'Under Review',
    appliedDate: '22 August 2026',
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Digital Solutions Ltd',
    location: 'Kampala',
    type: 'Hybrid',
    status: 'Shortlisted',
    appliedDate: '20 August 2026',
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Kampala',
    type: 'Part-time',
    status: 'Interview',
    appliedDate: '18 August 2026',
  },
  {
    id: 4,
    title: 'Cybersecurity Intern',
    company: 'SecureNet Africa',
    location: 'Remote',
    type: 'Remote',
    status: 'Rejected',
    appliedDate: '15 August 2026',
  },
]

function getStatusStyle(status) {
  switch (status) {
    case 'Under Review':
      return 'bg-yellow-50 text-yellow-700'

    case 'Shortlisted':
      return 'bg-green-50 text-green-700'

    case 'Interview':
      return 'bg-blue-50 text-blue-700'

    case 'Rejected':
      return 'bg-red-50 text-red-700'

    case 'Accepted':
      return 'bg-emerald-50 text-emerald-700'

    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function Applications() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          My Applications
        </h1>

        <p className="mt-1 text-slate-500">
          Track the progress of your internship applications.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {applications.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Under Review
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {
              applications.filter(
                (application) =>
                  application.status === 'Under Review'
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Shortlisted
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              applications.filter(
                (application) =>
                  application.status === 'Shortlisted'
              ).length
            }
          </p>
        </div>

      </div>

      {/* Applications */}
      <div className="mt-8 space-y-4">

        {applications.map((application) => (
          <div
            key={application.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              {/* Internship information */}
              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
                  {application.company.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {application.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {application.company}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>
                      📍 {application.location}
                    </span>

                    <span>
                      💼 {application.type}
                    </span>

                    <span>
                      Applied {application.appliedDate}
                    </span>
                  </div>
                </div>

              </div>

              {/* Status */}
              <div className="flex items-center gap-4">

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>

                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Applications