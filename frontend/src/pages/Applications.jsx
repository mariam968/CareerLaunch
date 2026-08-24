import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplications } from '../services/applicationApi'

function getStatusStyle(status) {
  switch (status) {
    case 'Applied':
      return 'bg-blue-50 text-blue-700'

    case 'Under Review':
      return 'bg-yellow-50 text-yellow-700'

    case 'Shortlisted':
      return 'bg-green-50 text-green-700'

    case 'Interview':
      return 'bg-purple-50 text-purple-700'

    case 'Accepted':
      return 'bg-emerald-50 text-emerald-700'

    case 'Rejected':
      return 'bg-red-50 text-red-700'

    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications()

        setApplications(data)
        setError('')
      } catch (err) {
        console.error(err)
        setError('Unable to load your applications.')
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [])

  const underReviewCount = applications.filter(
    (application) =>
      application.status === 'Under Review'
  ).length

  const shortlistedCount = applications.filter(
    (application) =>
      application.status === 'Shortlisted'
  ).length

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          Loading applications...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
        <p className="font-medium text-red-600">
          {error}
        </p>
      </div>
    )
  }

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

        {/* Total */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Applications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {applications.length}
          </p>
        </div>

        {/* Under Review */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Under Review
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {underReviewCount}
          </p>
        </div>

        {/* Shortlisted */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Shortlisted
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {shortlistedCount}
          </p>
        </div>

      </div>

      {/* Applications list */}
      <div className="mt-8">

        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="text-4xl">
              📄
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Start applying for internships to see them here.
            </p>

            <Link
              to="/internships"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Browse Internships
            </Link>

          </div>
        ) : (
          <div className="space-y-4">

            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                  {/* Internship information */}
                  <div className="flex gap-4">

                    {/* Company initial */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
                      {application.company
                        ? application.company.charAt(0)
                        : 'I'}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {application.internship_title ||
                          'Internship Application'}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {application.company ||
                          'Company'}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">

                        <span>
                          Applied{' '}
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </span>

                        <span>
                          {application.institution}
                        </span>

                      </div>
                    </div>

                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default Applications