import { Link } from 'react-router-dom'
import { useSavedInternships } from '../context/SavedInternshipsContext'

function InternshipCard({
  id,
  title,
  company,
  location,
  type,
  category,
  deadline,
}) {
  const { toggleSaved, isSaved } = useSavedInternships()

  const internship = {
    id,
    title,
    company,
    location,
    type,
    category,
    deadline,
  }

  const saved = isSaved(id)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Top section */}
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          {/* Company logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
            {company.charAt(0)}
          </div>

          {/* Internship information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {company}
            </p>
          </div>

        </div>

        {/* Save button */}
        <button
          onClick={() => toggleSaved(internship)}
          className={`text-xl transition ${
            saved
              ? 'text-red-500'
              : 'text-slate-400 hover:text-red-500'
          }`}
          title={
            saved
              ? 'Remove from saved'
              : 'Save internship'
          }
        >
          {saved ? '♥' : '♡'}
        </button>

      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {type}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {category}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          📍 {location}
        </span>

      </div>

      {/* Bottom section */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

        <div>
          <p className="text-xs text-slate-400">
            Application deadline
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {deadline}
          </p>
        </div>

        {/* Details button */}
        <Link
          to={`/internships/${id}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View details
        </Link>

      </div>

    </div>
  )
}

export default InternshipCard