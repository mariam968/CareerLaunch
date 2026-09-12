import { NavLink } from 'react-router-dom'

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
    }`

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Career<span className="text-blue-600">Launch</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        {/* Dashboard */}
        <NavLink
          to="/"
          className={linkClass}
        >
          <span className="text-lg">🏠</span>
          <span className="ml-3">Dashboard</span>
        </NavLink>

        {/* Internships */}
        <NavLink
          to="/internships"
          className={linkClass}
        >
          <span className="text-lg">🔎</span>
          <span className="ml-3">Internships</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={linkClass}
        >
          <span className="text-lg">❤️</span>
          <span className="ml-3">Saved</span>
        </NavLink>

        {/* Applications */}
        <NavLink
          to="/applications"
          className={linkClass}
        >
          <span className="text-lg">📄</span>
          <span className="ml-3">Applications</span>
        </NavLink>

        {/* Logbook */}
        <NavLink
          to="/logbook"
          className={linkClass}
        >
          <span className="text-lg">📋</span>
          <span className="ml-3">Logbook</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={linkClass}
        >
          <span className="text-lg">👤</span>
          <span className="ml-3">Profile</span>
        </NavLink>

      </nav>

      {/* Bottom branding */}
      <div className="border-t border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-400">
          Launch your career 🚀
        </p>
      </div>

    </aside>
  )
}

export default Sidebar