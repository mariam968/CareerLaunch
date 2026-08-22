import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InternshipDetails from './pages/InternshipDetails'
import DashboardLayout from './layouts/DashboardLayout'
import ApplicationSuccess from './pages/ApplicationSuccess'
import Dashboard from './pages/Dashboard'
import Internships from './pages/Internships'
import Saved from './pages/Saved'
import Applications from './pages/Applications'
import Logbook from './pages/Logbook'
import Profile from './pages/Profile'
import ApplicationForm from './pages/ApplicationForm'

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
  <Route path="/application-success" element={<ApplicationSuccess />}
  />
  <Route path="/" element={<Dashboard />} />
  <Route path="/internships" element={<Internships />} />
  <Route
    path="/internships/:id"
    element={<InternshipDetails />}
  />
  <Route
  path="/internships/:id/apply"
  element={<ApplicationForm />}
/>
  <Route path="/saved" element={<Saved />} />
  <Route path="/applications" element={<Applications />} />
  <Route path="/logbook" element={<Logbook />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App