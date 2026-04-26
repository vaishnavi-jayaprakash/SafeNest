import { useEffect, useState } from 'react'
import LiveMapCanvas from '../components/LiveMapCanvas'
import { incidentPoints } from '../data/mockData'

const featureHighlights = [
  'Dynamic safest route navigation',
  'Real-time risk adjustment',
  'Walk With Me live monitoring',
  'One-tap emergency SOS',
  'Route-level safety scoring',
  'Heatmap-informed rerouting',
  'Community incident reporting',
  'Smart in-journey alerts',
  'Call assistance',
  'Personalized safety preferences',
]

function HomePage() {
  const hasGeolocation = 'geolocation' in navigator
  const [userPosition, setUserPosition] = useState(null)
  const [locationMessage, setLocationMessage] = useState(
    hasGeolocation
      ? 'Detecting live location...'
      : 'Geolocation unsupported. Showing default map center.',
  )

  useEffect(() => {
    if (!hasGeolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
        setLocationMessage('Live location preview active.')
      },
      () => {
        setLocationMessage('Location permission denied. Showing default map center.')
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }, [hasGeolocation])

  return (
    <section className="page home">
      <div className="hero-card">
        <p className="eyebrow">Safer navigation for everyday travel</p>
        <h1>Travel smarter with SafeNest</h1>
        <p className="lead">
          Choose routes ranked by safety score, activate live companion tracking,
          and access emergency support tools in one place.
        </p>
        <form className="search-grid">
          <label>
            Start location
            <input type="text" placeholder="Current location" />
          </label>
          <label>
            Destination
            <input type="text" placeholder="Where are you going?" />
          </label>
          <button type="button">Find safest route</button>
        </form>
        <div className="feature-pills">
          {featureHighlights.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
      </div>
      <div className="card map-preview">
        <h2>Live map preview</h2>
        <p className="tiny">{locationMessage}</p>
        <LiveMapCanvas
          userPosition={userPosition}
          destinationPosition={null}
          routes={[]}
          selectedRouteIndex={0}
          onSelectRoute={() => {}}
          incidentPoints={incidentPoints}
        />
      </div>
    </section>
  )
}

export default HomePage
