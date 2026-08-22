import { Link } from 'react-router-dom'
import { useSavedInternships } from '../context/SavedInternshipsContext'

function Saved() {
  const { savedInternships, toggleSaved } =
    useSavedInternships()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Saved Internships
        </h1>

        <p className="mt-1 text-slate-500">
          Keep track of opportunities you want to explore later.
        </p>
      </div>

      {savedInternships.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="text-4xl">
            ♡
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No saved internships
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Save internships you're interested in and they'll appear here.
          </p>

          <Link
            to="/internships"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Browse Internships
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {savedInternships.map((internship) => (
            <div
              key={internship.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
                    {internship.company.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {internship.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {internship.company}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaved(internship)}
                  className="text-xl text-red-500 hover:text-red-600"
                  title="Remove from saved"
                >
                  ♥
                </button>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  {internship.type}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {internship.category}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  📍 {internship.location}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Deadline: {internship.deadline}
                </p>

                <Link
                  to={`/internships/${internship.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved