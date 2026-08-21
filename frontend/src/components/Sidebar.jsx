function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200">
      <div className="flex h-16 items-center px-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">
          Career<span className="text-blue-600">Launch</span>
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        <a
          href="#"
          className="flex items-center rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600"
        >
          🏠
          <span className="ml-3">Dashboard</span>
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          🔎
          <span className="ml-3">Internships</span>
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          ❤️
          <span className="ml-3">Saved</span>
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          📄
          <span className="ml-3">Applications</span>
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          📋
          <span className="ml-3">Logbook</span>
        </a>

        <a
          href="#"
          className="flex items-center rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          👤
          <span className="ml-3">Profile</span>
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar