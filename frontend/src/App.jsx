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

function App() {
  return (
    <BrowserRouter>
      <SavedInternshipsProvider>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/internships"
              element={<Internships />}
            />

            <Route
              path="/internships/:id"
              element={<InternshipDetails />}
            />

            <Route
              path="/internships/:id/apply"
              element={<ApplicationForm />}
            />

            <Route
              path="/application-success"
              element={<ApplicationSuccess />}
            />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/saved"
              element={<Saved />}
            />

            <Route
              path="/logbook"
              element={<Logbook />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Routes>
        </DashboardLayout>
      </SavedInternshipsProvider>
    </BrowserRouter>
  )
}

export default App