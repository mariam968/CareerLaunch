import { NavLink } from 'react-router-dom'

function Sidebar({ isOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
    }`

  const handleNavigation = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Career<span className="text-blue-600">Launch</span>
          </h1>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <NavLink
            to="/"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">🏠</span>
            <span className="ml-3">Dashboard</span>
          </NavLink>

          <NavLink
            to="/internships"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">🔎</span>
            <span className="ml-3">Internships</span>
          </NavLink>

          <NavLink
            to="/saved"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">❤️</span>
            <span className="ml-3">Saved</span>
          </NavLink>

          <NavLink
            to="/applications"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">📄</span>
            <span className="ml-3">Applications</span>
          </NavLink>

          <NavLink
            to="/logbook"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">📋</span>
            <span className="ml-3">Logbook</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
            onClick={handleNavigation}
          >
            <span className="text-lg">👤</span>
            <span className="ml-3">Profile</span>
          </NavLink>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-400">
            Launch your career 🚀
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar