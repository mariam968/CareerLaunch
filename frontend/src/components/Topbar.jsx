function Topbar() {
  return (
    <header className="fixed left-64 right-0 top-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div>
        <p className="text-sm text-slate-500">Student Portal</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-xl">
          🔔
        </button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
            M
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">
              Mariam
            </p>
            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar