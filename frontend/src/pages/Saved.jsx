import { Link } from 'react-router-dom'
import { useSavedInternships } from '../context/SavedInternshipsContext'

function Saved() {
  const { savedInternships, toggleSaved } =
    useSavedInternships()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-sm">
              ❤️
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Saved Internships
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of opportunities you want to explore later.
              </p>
            </div>

          </div>

          {/* Count */}
          {savedInternships.length > 0 && (
            <div className="mt-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {savedInternships.length}{' '}
              {savedInternships.length === 1
                ? 'internship saved'
                : 'internships saved'}
            </div>
          )}
        </div>

        {/* Empty State */}
        {savedInternships.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-14">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl text-blue-600">
              ♡
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No saved internships
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Save internships you're interested in and they'll appear
              here, making it easier to come back to them later.
            </p>

            <Link
              to="/internships"
              className="mt-7 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              Browse Internships →
            </Link>

          </div>
        ) : (

          /* Saved Internship Cards */
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {savedInternships.map((internship) => (
              <div
                key={internship.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 gap-4">

                    {/* Company Logo */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold uppercase text-white shadow-sm">
                      {internship.company?.charAt(0) || 'C'}
                    </div>

                    <div className="min-w-0">

                      <h2 className="truncate text-lg font-bold text-slate-900">
                        {internship.title}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {internship.company}
                      </p>

                    </div>

                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => toggleSaved(internship)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-lg text-red-500 transition hover:bg-red-100 hover:text-red-600"
                    title="Remove from saved"
                    aria-label="Remove from saved"
                  >
                    ♥
                  </button>

                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">

                  {internship.type && (
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                      {internship.type}
                    </span>
                  )}

                  {internship.category && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {internship.category}
                    </span>
                  )}

                  {internship.location && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      📍 {internship.location}
                    </span>
                  )}

                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Application deadline
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {internship.deadline || 'Not specified'}
                    </p>
                  </div>

                  <Link
                    to={`/internships/${internship.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details →
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default Saved