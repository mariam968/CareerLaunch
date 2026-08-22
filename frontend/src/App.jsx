import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InternshipDetails from './pages/InternshipDetails'
import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Internships from './pages/Internships'
import Saved from './pages/Saved'
import Applications from './pages/Applications'
import Logbook from './pages/Logbook'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/internships" element={<Internships />} />
  <Route
    path="/internships/:id"
    element={<InternshipDetails />}
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