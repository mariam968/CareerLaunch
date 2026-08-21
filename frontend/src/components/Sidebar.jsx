import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-white">
      
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <h1 className="text-xl font-bold text-slate-900">
          Career<span className="text-blue-600">Launch</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">

        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          🏠
          <span className="ml-3">Dashboard</span>
        </NavLink>

        {/* Internships */}
        <NavLink
          to="/internships"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          🔎
          <span className="ml-3">Internships</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          ❤️
          <span className="ml-3">Saved</span>
        </NavLink>

        {/* Applications */}
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          📄
          <span className="ml-3">Applications</span>
        </NavLink>

        {/* Logbook */}
        <NavLink
          to="/logbook"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          📋
          <span className="ml-3">Logbook</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50'
            }`
          }
        >
          👤
          <span className="ml-3">Profile</span>
        </NavLink>

      </nav>
    </aside>
  )
}

export default Sidebar