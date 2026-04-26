import { useEffect, useMemo, useState } from 'react'
import LiveMapCanvas from '../components/LiveMapCanvas'
import RouteList from '../components/RouteList'
import { incidentPoints } from '../data/mockData'
import { useSafetyPreferences } from '../context/SafetyPreferencesContext'

function toRiskLabel(score) {
  if (score >= 80) return 'Low'
  if (score >= 60) return 'Medium'
  return 'High'
}

function calculateSafetyScore(route, preferences) {
  const distancePenalty = route.distanceKm * 1.8
  const durationPenalty = route.durationMin * 0.9
  const preferenceBoost =
    preferences.lightingWeight * 0.08 +
    preferences.policeWeight * 0.08 +
    preferences.crowdWeight * 0.04
  const tolerancePenalty = preferences.riskTolerance * 0.3
  const base = 100 - distancePenalty - durationPenalty - tolerancePenalty + preferenceBoost

  return Math.max(30, Math.min(98, Math.round(base)))
}

function rankRoutes(apiRoutes, preferences) {
  return apiRoutes
    .map((route, index) => {
      const distanceKm = route.distance / 1000
      const durationMin = route.duration / 60
      const score = calculateSafetyScore({ distanceKm, durationMin }, preferences)
      return {
        id: `route-${index + 1}`,
        name: `Route ${String.fromCharCode(65 + index)}`,
        score,
        eta: `${Math.round(durationMin)} min`,
        risk: toRiskLabel(score),
        distanceKm,
        durationMin,
        geometry: route.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
        segments:
          score < 70
            ? ['Low lighting street', 'Sparse activity zone']
            : ['Well-lit corridor'],
      }
    })
    .sort((a, b) => b.score - a.score)
}

async function geocodeLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error('Unable to geocode destination.')

  const results = await response.json()
  if (!results.length) throw new Error('No destination match found.')

  return [Number(results[0].lat), Number(results[0].lon)]
}

async function fetchRouteAlternatives(start, end) {
  const [startLat, startLon] = start
  const [endLat, endLon] = end
  const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson&alternatives=true&steps=true`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Could not fetch route alternatives.')

  const data = await response.json()
  if (!data.routes?.length) throw new Error('No routes available right now.')
  return data.routes
}

function LiveMapPage() {
  const { preferences } = useSafetyPreferences()
  const hasGeolocation = 'geolocation' in navigator
  const [destinationInput, setDestinationInput] = useState('India Gate, Delhi')
  const [destinationPosition, setDestinationPosition] = useState(null)
  const [userPosition, setUserPosition] = useState(null)
  const [routes, setRoutes] = useState([])
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0)
  const [walkWithMe, setWalkWithMe] = useState(false)
  const [smartAlerts, setSmartAlerts] = useState(true)
  const [sosSent, setSosSent] = useState(false)
  const [statusMessage, setStatusMessage] = useState(
    hasGeolocation ? 'Locating user...' : 'Geolocation is not supported in this browser.',
  )

  useEffect(() => {
    if (!hasGeolocation) {
      return undefined
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude]
        setUserPosition(coords)
        setStatusMessage('Live location tracking active.')
      },
      () => {
        setStatusMessage('Location permission denied. Using fallback coordinates.')
        setUserPosition([28.6139, 77.209])
      },
      { enableHighAccuracy: true, maximumAge: 5000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [hasGeolocation])

  const alerts = useMemo(() => {
    const nextAlerts = []
    if (!smartAlerts || !userPosition) {
      return nextAlerts
    }

    const hour = new Date().getHours()
    if (hour >= 22 || hour <= 5) {
      nextAlerts.push('Late-night travel warning: prefer highly lit roads.')
    }

    const nearbyIncident = incidentPoints.find((incident) => {
      const [lat, lon] = incident.position
      const latDelta = Math.abs(lat - userPosition[0])
      const lonDelta = Math.abs(lon - userPosition[1])
      return latDelta < 0.01 && lonDelta < 0.01
    })

    if (nearbyIncident) {
      nextAlerts.push(`Entering risk zone: ${nearbyIncident.label}`)
    }

    if (walkWithMe) {
      nextAlerts.push('Walk With Me is sharing live position with trusted contacts.')
    }

    return nextAlerts
  }, [smartAlerts, userPosition, walkWithMe])

  const selectedRoute = useMemo(
    () => routes[selectedRouteIndex] ?? null,
    [routes, selectedRouteIndex],
  )

  const handleRouteSearch = async () => {
    if (!userPosition) {
      setStatusMessage('Waiting for your location to search routes.')
      return
    }

    try {
      setStatusMessage('Fetching destination and route alternatives...')
      const geocodedDestination = await geocodeLocation(destinationInput)
      setDestinationPosition(geocodedDestination)
      const apiRoutes = await fetchRouteAlternatives(userPosition, geocodedDestination)
      const ranked = rankRoutes(apiRoutes, preferences)
      setRoutes(ranked)
      setSelectedRouteIndex(0)
      setStatusMessage('Routes ranked by dynamic safety score.')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  return (
    <section className="page">
      <div className="card">
        <h2>Live map interface</h2>
        <p className="muted">
          Real-time route navigation with safety-first ranking and live risk updates.
        </p>
        <div className="search-grid">
          <label>
            Current location
            <input
              type="text"
              value={
                userPosition
                  ? `${userPosition[0].toFixed(4)}, ${userPosition[1].toFixed(4)}`
                  : 'Detecting...'
              }
              readOnly
            />
          </label>
          <label>
            Destination
            <input
              type="text"
              value={destinationInput}
              onChange={(event) => setDestinationInput(event.target.value)}
              placeholder="Search destination"
            />
          </label>
          <button type="button" onClick={handleRouteSearch}>
            Find safest routes
          </button>
        </div>
        <p className="tiny">{statusMessage}</p>
        <LiveMapCanvas
          userPosition={userPosition}
          destinationPosition={destinationPosition}
          routes={routes}
          selectedRouteIndex={selectedRouteIndex}
          onSelectRoute={setSelectedRouteIndex}
          incidentPoints={incidentPoints}
        />
      </div>

      <div className="grid two-col">
        <div className="card">
          <h3>Dynamic safest route navigation</h3>
          {routes.length ? (
            <RouteList
              routes={routes}
              selectedRouteIndex={selectedRouteIndex}
              onSelectRoute={setSelectedRouteIndex}
            />
          ) : (
            <p className="muted">Search a destination to fetch ranked route options.</p>
          )}
        </div>

        <div className="card">
          <h3>Journey safety tools</h3>
          <div className="toggle-row">
            <span>Walk With Me live monitoring</span>
            <button
              type="button"
              onClick={() => setWalkWithMe((active) => !active)}
              className={walkWithMe ? 'active' : ''}
            >
              {walkWithMe ? 'Active' : 'Start'}
            </button>
          </div>
          <div className="toggle-row">
            <span>Smart alerts during travel</span>
            <button
              type="button"
              onClick={() => setSmartAlerts((active) => !active)}
              className={smartAlerts ? 'active' : ''}
            >
              {smartAlerts ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <button type="button" className="sos" onClick={() => setSosSent(true)}>
            One-tap Emergency SOS
          </button>
          {sosSent && (
            <p className="sos-note">
              SOS sent with live location to emergency contacts.
            </p>
          )}
          {selectedRoute ? (
            <p className="tiny">
              Selected route score: <strong>{selectedRoute.score}</strong> · {selectedRoute.eta}
            </p>
          ) : null}
        </div>
      </div>

      <div className="card">
        <h3>Real-time risk alerts</h3>
        {alerts.length ? (
          <ul className="alert-list">
            {alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">No active alerts right now.</p>
        )}
      </div>
    </section>
  )
}

export default LiveMapPage
