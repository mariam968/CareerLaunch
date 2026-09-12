import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplications } from '../services/applicationApi'

function getStatusStyle(status) {
  switch (status) {
    case 'Applied':
      return 'bg-blue-50 text-blue-700 border border-blue-100'

    case 'Under Review':
      return 'bg-amber-50 text-amber-700 border border-amber-100'

    case 'Shortlisted':
      return 'bg-green-50 text-green-700 border border-green-100'

    case 'Interview':
      return 'bg-purple-50 text-purple-700 border border-purple-100'

    case 'Accepted':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100'

    case 'Rejected':
      return 'bg-red-50 text-red-700 border border-red-100'

    default:
      return 'bg-slate-100 text-slate-600 border border-slate-200'
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'Applied':
      return '📨'

    case 'Under Review':
      return '👀'

    case 'Shortlisted':
      return '⭐'

    case 'Interview':
      return '💬'

    case 'Accepted':
      return '🎉'

    case 'Rejected':
      return '✕'

    default:
      return '📄'
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
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              📄
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Loading your applications
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we retrieve your application history.
            </p>

          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              !
            </div>

            <p className="mt-4 font-semibold text-red-800">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="overflow-hidden rounded-2xl bg-blue-600 shadow-sm">

          <div className="px-6 py-7 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-2xl">
                📄
              </div>

              <div>
                <p className="text-sm font-medium text-blue-100">
                  CareerLaunch
                </p>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  My Applications
                </h1>

                <p className="mt-2 text-sm text-blue-100">
                  Track the progress of your internship applications.
                </p>
              </div>

            </div>

          </div>

          <div className="h-1 bg-blue-700" />
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Applications
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {applications.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Applications submitted
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📄
              </div>

            </div>

          </div>

          {/* Under Review */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Under Review
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-600">
                  {underReviewCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Waiting for employer review
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                👀
              </div>

            </div>

          </div>

          {/* Shortlisted */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Shortlisted
                </p>

                <p className="mt-3 text-3xl font-bold text-green-600">
                  {shortlistedCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Applications moving forward
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                ⭐
              </div>

            </div>

          </div>

        </div>

        {/* Applications section */}
        <div className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Application History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View the internships you have applied for.
              </p>
            </div>

            {applications.length > 0 && (
              <Link
                to="/internships"
                className="hidden rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 sm:block"
              >
                Find More Internships
              </Link>
            )}

          </div>

          {applications.length === 0 ? (
            /* Empty state */
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📄
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No applications yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't applied for any internships yet.
                Start exploring opportunities and submit your first application.
              </p>

              <Link
                to="/internships"
                className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Browse Internships →
              </Link>

            </div>
          ) : (
            /* Applications list */
            <div className="space-y-4">

              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >

                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    {/* Internship information */}
                    <div className="flex min-w-0 gap-4">

                      {/* Company initial */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-sm">
                        {application.company
                          ? application.company.charAt(0).toUpperCase()
                          : 'I'}
                      </div>

                      <div className="min-w-0">

                        <h2 className="truncate text-lg font-bold text-slate-900">
                          {application.internship_title ||
                            'Internship Application'}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-blue-600">
                          {application.company ||
                            'Company'}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">

                          <span className="flex items-center gap-1">
                            📅
                            Applied{' '}
                            {new Date(
                              application.applied_at
                            ).toLocaleDateString()}
                          </span>

                          {application.institution && (
                            <span className="flex items-center gap-1">
                              🎓
                              {application.institution}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* Status */}
                    <div className="flex shrink-0 items-center md:justify-end">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        <span>
                          {getStatusIcon(application.status)}
                        </span>

                        {application.status}
                      </span>

                    </div>

                  </div>

                  {/* Bottom accent */}
                  <div className="mt-5 border-t border-slate-100 pt-4">

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <p className="text-xs text-slate-400">
                        Application #{application.id}
                      </p>

                      <span className="text-xs font-medium text-slate-500">
                        Status: {application.status}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Applications