import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'

function Topbar({ onMenuClick }) {
  const navigate = useNavigate()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setNotifications([])
      return
    }

    setLoadingNotifications(true)

    try {
      const response = await fetch(
        `${API_URL}/api/accounts/notifications/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      if (!response.ok) {
        setNotifications([])
        return
      }

      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      setNotifications([])
    } finally {
      setLoadingNotifications(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    try {
      await fetch(
        `${API_URL}/api/accounts/notifications/${notificationId}/read/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      )
    } catch (error) {
      console.error('Failed to mark notification as read.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')

    setShowProfileMenu(false)
    setShowNotifications(false)

    navigate('/login')
  }

  const handleProfileClick = () => {
    setShowProfileMenu(false)
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    setShowProfileMenu(false)
    navigate('/settings')
  }

  const formatDate = (date) => {
    if (!date) {
      return ''
    }

    return new Date(date).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 md:left-64 md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 md:hidden"
          aria-label="Open navigation menu"
        >
          ☰
        </button>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-700">
            Student Portal
          </p>

          <p className="hidden text-xs text-slate-400 sm:block">
            Your career journey starts here
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfileMenu(false)

              if (!showNotifications) {
                fetchNotifications()
              }
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-blue-50"
            title="Notifications"
            aria-label="Notifications"
          >
            🔔

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  Notifications
                </h3>

                {unreadCount > 0 && (
                  <span className="text-xs font-medium text-blue-600">
                    {unreadCount} unread
                  </span>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {loadingNotifications ? (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-slate-500">
                      Loading notifications...
                    </p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <div className="mb-2 text-2xl">
                      🔔
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      No notifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      You're all caught up.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => {
                        if (!notification.is_read) {
                          markAsRead(notification.id)
                        }
                      }}
                      className={`w-full border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 ${
                        !notification.is_read
                          ? 'bg-blue-50/50'
                          : 'bg-white'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          {notification.notification_type === 'application'
                            ? '📩'
                            : notification.notification_type === 'status'
                              ? '📋'
                              : notification.notification_type === 'internship'
                                ? '💼'
                                : '🔔'}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900">
                              {notification.title}
                            </p>

                            {!notification.is_read && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-slate-600">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[11px] text-slate-400">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative border-l border-slate-200 pl-2 sm:pl-4 md:pl-5">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 rounded-lg px-1 py-1.5 transition hover:bg-slate-50 sm:gap-3 sm:px-2"
            aria-label="Open profile menu"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10">
              M
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Mariam
              </p>

              <p className="text-xs text-slate-500">
                Student
              </p>
            </div>

            <span
              className={`hidden text-xs text-slate-400 transition sm:block ${
                showProfileMenu ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    M
                  </div>

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

              <div className="p-2">
                <button
                  type="button"
                  onClick={handleProfileClick}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <span>👤</span>
                  <span>My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={handleSettingsClick}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar