import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'

function Settings() {
  const navigate = useNavigate()

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      setError('You are not logged in.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/api/accounts/change-password/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || 'Failed to change password.')
        return
      }

      setMessage(data.detail || 'Password changed successfully.')

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowPasswordForm(false)
    } catch (err) {
      setError('Unable to connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your CareerLaunch account settings.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your personal account information.
            </p>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              My Profile
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Receive updates about your applications and internships.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setNotificationsEnabled(!notificationsEnabled)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  notificationsEnabled
                    ? 'bg-blue-600'
                    : 'bg-slate-300'
                }`}
                aria-label="Toggle notifications"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    notificationsEnabled
                      ? 'left-6'
                      : 'left-1'
                  }`}
                />
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Notifications are{' '}
              <span
                className={
                  notificationsEnabled
                    ? 'text-blue-600'
                    : 'text-slate-400'
                }
              >
                {notificationsEnabled ? 'ON' : 'OFF'}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Security
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep your CareerLaunch account secure.
            </p>

            {!showPasswordForm && (
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(true)
                  setMessage('')
                  setError('')
                }}
                className="mt-5 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Change Password
              </button>
            )}

            {showPasswordForm && (
              <form
                onSubmit={handleChangePassword}
                className="mt-5 max-w-lg space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    minLength={8}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? 'Changing Password...'
                      : 'Change Password'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false)
                      setCurrentPassword('')
                      setNewPassword('')
                      setConfirmPassword('')
                      setError('')
                    }}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings