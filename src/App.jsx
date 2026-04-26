import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LiveMapPage from './pages/LiveMapPage'
import ReportingPage from './pages/ReportingPage'
import SignupPage from './pages/SignUpPage'
import './App.css'

function App() {
  const location = useLocation()

  const hideNavbarRoutes = ['/login', '/signup']
  const hideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <div className="app-shell">
      <div className="content-wrap">
        {!hideNavbar && <Navbar />}   

        <main>
          <div className="page-container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/live-map" element={<LiveMapPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/report" element={<ReportingPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App