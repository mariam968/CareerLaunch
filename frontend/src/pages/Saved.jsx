import { Link } from 'react-router-dom'
import { useSavedInternships } from '../context/SavedInternshipsContext'

function Saved() {
  const { savedInternships, toggleSaved } =
    useSavedInternships()

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">

          <div className="flex items-start gap-3 sm:items-center sm:gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm sm:h-12 sm:w-12 sm:text-xl">
              ❤️
            </div>

            <div className="min-w-0">

              <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900">
                Saved Internships
              </h1>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Keep track of opportunities you want to explore later.
              </p>

            </div>

          </div>

          {/* Count */}
          {savedInternships.length > 0 && (
            <div className="mt-5 inline-flex max-w-full items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {savedInternships.length}{' '}
              {savedInternships.length === 1
                ? 'internship saved'
                : 'internships saved'}
            </div>
          )}

        </div>

        {/* Empty State */}
        {savedInternships.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-14">

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
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:w-auto"
            >
              Browse Internships →
            </Link>

          </div>

        ) : (

          /* Saved Internship Cards */
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {savedInternships.map((internship) => (

              <div
                key={internship.id}
                className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
              >

                {/* Card Header */}
                <div className="flex items-start gap-3">

                  <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">

                    {/* Company Logo */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-base font-bold uppercase text-white shadow-sm sm:h-14 sm:w-14 sm:text-lg">
                      {internship.company?.charAt(0) || 'C'}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h2 className="break-words text-base font-bold leading-6 text-slate-900 sm:text-lg">
                        {internship.title}
                      </h2>

                      <p className="mt-1 break-words text-sm font-medium leading-5 text-slate-500">
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
                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">

                  {internship.type && (
                    <span className="max-w-full break-words rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                      {internship.type}
                    </span>
                  )}

                  {internship.category && (
                    <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {internship.category}
                    </span>
                  )}

                  {internship.location && (
                    <span className="max-w-full break-words rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      📍 {internship.location}
                    </span>
                  )}

                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:mt-6 sm:pt-5">

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Application deadline
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                      {internship.deadline || 'Not specified'}
                    </p>

                  </div>

                  <Link
                    to={`/internships/${internship.id}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:self-end"
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