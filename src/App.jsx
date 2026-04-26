import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LiveMapPage from './pages/LiveMapPage'
import ReportingPage from './pages/ReportingPage'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <div className="content-wrap">
        <Navbar />
        <main>
          <div className="page-container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
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
