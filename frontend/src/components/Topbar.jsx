function Topbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Page identity */}
      <div>
        <p className="text-sm font-semibold text-slate-700">
          Student Portal
        </p>

        <p className="text-xs text-slate-400">
          Your career journey starts here
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

        {/* Notifications */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-blue-50"
          title="Notifications"
        >
          🔔

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-sm">
            M
          </div>

          {/* User information */}
          <div>
            <p className="text-sm font-semibold text-slate-900">
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