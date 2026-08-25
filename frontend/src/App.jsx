import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SavedInternshipsProvider } from './context/SavedInternshipsContext'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Internships from './pages/Internships'
import InternshipDetails from './pages/InternshipDetails'
import ApplicationForm from './pages/ApplicationForm'
import ApplicationSuccess from './pages/ApplicationSuccess'
import Applications from './pages/Applications'
import Saved from './pages/Saved'
import Logbook from './pages/Logbook'
import Profile from './pages/Profile'
import Login from './pages/Login'

import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <SavedInternshipsProvider>

        <Routes>

          {/* Public page */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected dashboard area */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Internships />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InternshipDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships/:id/apply"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ApplicationForm />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/application-success"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ApplicationSuccess />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Applications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Saved />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/logbook"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Logbook />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

        </Routes>

      </SavedInternshipsProvider>
    </BrowserRouter>
  )
}

export default App