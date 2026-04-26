import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.jsx'
import { SafetyPreferencesProvider } from './context/SafetyPreferencesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SafetyPreferencesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SafetyPreferencesProvider>
  </StrictMode>,
)
