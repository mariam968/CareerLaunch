function InternshipCard({ title, company, location, type }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {company}
          </p>
        </div>

        <button className="text-xl text-slate-400 hover:text-red-500">
          ♡
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {type}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          📍 {location}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Posted recently
        </p>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
          View internship
        </button>
      </div>
    </div>
  )
}

export default InternshipCard