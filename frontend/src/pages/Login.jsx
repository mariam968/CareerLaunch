import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `${API_URL}/api/accounts/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.detail ||
            'Invalid username or password.'
        )
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email || '')
      localStorage.setItem('userType', 'student')

      navigate('/dashboard')
    } catch (err) {
      console.error(err)

      setError(
        err.message ||
          'Unable to log in. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-center sm:min-h-[calc(100vh-5rem)]">

        {/* CareerLaunch Header */}
        <div className="mb-6 text-center sm:mb-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-2xl">
            CL
          </div>

          <h1 className="mt-4 break-words text-2xl font-bold tracking-tight text-slate-900 sm:mt-5 sm:text-3xl">
            Career<span className="text-blue-600">Launch</span>
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Find internships. Build experience. Launch your career.
          </p>

        </div>

        {/* Login Card */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                👋
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Welcome back
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Log in to your CareerLaunch account.
                </p>
              </div>

            </div>

          </div>

          <div className="p-5 sm:p-8">

            {/* Account Type */}
            <div className="mb-6">

              <p className="mb-3 text-sm font-semibold text-slate-700">
                Logging in as
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">

                {/* Student */}
                <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-3 text-center">
                  <div className="text-xl">
                    🎓
                  </div>

                  <p className="mt-1 text-sm font-semibold text-blue-700">
                    Student
                  </p>
                </div>

                {/* Employer */}
                <button
                  type="button"
                  onClick={() => navigate('/employer/login')}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-xl">
                    🏢
                  </div>

                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Employer
                  </p>
                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                    !
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-800">
                      Login unsuccessful
                    </p>

                    <p className="mt-1 break-words text-sm leading-5 text-red-600">
                      {error}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* Student Login Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Username */}
              <div className="min-w-0">

                <label className="text-sm font-semibold text-slate-700">
                  Username
                </label>

                <div className="relative mt-2">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    👤
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    placeholder="Enter your username"
                    className="w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="min-w-0">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative mt-2">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    🔒
                  </span>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Log In →'}
              </button>

            </form>

            {/* Registration */}
            <div className="mt-7 border-t border-slate-100 pt-6">

              <p className="text-center text-sm text-slate-500">
                Don't have an account?
              </p>

              <div className="mt-4 grid gap-3">

                <Link
                  to="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                >
                  🎓 Create a student account →
                </Link>

                <Link
                  to="/employer/register"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  🏢 Create an employer account →
                </Link>

              </div>

            </div>

          </div>

        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400 sm:mt-6">
          CareerLaunch • Your career journey starts here 🚀
        </p>

      </div>

    </div>
  )
}

export default Login