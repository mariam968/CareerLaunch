function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Good morning, Mariam 👋
        </h2>

        <p className="mt-1 text-slate-500">
          Find opportunities that launch your career.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Applications</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            12
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Pending</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            5
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Interviews</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            2
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard