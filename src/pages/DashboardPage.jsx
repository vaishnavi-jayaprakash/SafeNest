import { useState } from 'react'
import { useSafetyPreferences } from '../context/SafetyPreferencesContext'

function PreferenceSlider({ label, value, onChange }) {
  return (
    <label className="slider-control">
      <span>
        {label}: <strong>{value}</strong>
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  )
}

function DashboardPage() {
  const { preferences, setPreferences } = useSafetyPreferences()
  const [fakeCallActive, setFakeCallActive] = useState(false)
  const fakeCallCountdown = fakeCallActive ? '00:10' : '00:15'

  return (
    <section className="page">
      <div className="grid two-col">
        <div className="card">
          <h2>User dashboard</h2>
          <p className="muted">
            Manage profile, emergency contacts, alert preferences, and travel
            records.
          </p>
          <ul className="details">
            <li>
              <strong>Name:</strong> Aanya Sharma
            </li>
            <li>
              <strong>Primary Contact:</strong> +91 99999 22222
            </li>
            <li>
              <strong>Default Mode:</strong> Max safety
            </li>
            <li>
              <strong>Night Alerts:</strong> Enabled
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>Travel history</h3>
          <ul className="list compact">
            <li>
              <span>Sector 12 → City Library</span>
              <span>Safe score 90</span>
            </li>
            <li>
              <span>Metro East → College Gate</span>
              <span>Safe score 84</span>
            </li>
            <li>
              <span>Central Park → Home</span>
              <span>Safe score 78</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid two-col">
        <div className="card">
          <h3>Personalized safety preferences</h3>
          <p className="muted">
            Route ranking in the Live Map uses these settings in real time.
          </p>
          <div className="slider-group">
            <PreferenceSlider
              label="Street lighting priority"
              value={preferences.lightingWeight}
              onChange={(lightingWeight) =>
                setPreferences((previous) => ({ ...previous, lightingWeight }))
              }
            />
            <PreferenceSlider
              label="Crowd density preference"
              value={preferences.crowdWeight}
              onChange={(crowdWeight) =>
                setPreferences((previous) => ({ ...previous, crowdWeight }))
              }
            />
            <PreferenceSlider
              label="Police proximity priority"
              value={preferences.policeWeight}
              onChange={(policeWeight) =>
                setPreferences((previous) => ({ ...previous, policeWeight }))
              }
            />
            <PreferenceSlider
              label="Risk tolerance"
              value={preferences.riskTolerance}
              onChange={(riskTolerance) =>
                setPreferences((previous) => ({ ...previous, riskTolerance }))
              }
            />
          </div>
        </div>

        <div className="card">
          <h3>Emergency contacts</h3>
          <ul className="list compact">
            <li>
              <span>Mother</span>
              <span>+91 99999 22222</span>
            </li>
            <li>
              <span>Friend - Riya</span>
              <span>+91 90000 12345</span>
            </li>
            <li>
              <span>Sibling - Neha</span>
              <span>+91 98888 44444</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>Call assistance</h3>
        <p className="muted">
          Simulate an incoming call to exit uncomfortable situations discreetly.
        </p>
        <button type="button" onClick={() => setFakeCallActive(true)}>
          Trigger call
        </button>
        <p className="tiny">Quick trigger in: {fakeCallCountdown}</p>
      </div>
    </section>
  )
}

export default DashboardPage
