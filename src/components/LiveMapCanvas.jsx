import { useMemo } from 'react'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const routeColors = ['#2f5be7', '#f1a238', '#1f9d60']

function getSeverityColor(severity) {
  if (severity === 'high') return '#d94444'
  if (severity === 'medium') return '#f1a238'
  return '#1f9d60'
}

function LiveMapCanvas({
  userPosition,
  destinationPosition,
  routes,
  selectedRouteIndex,
  onSelectRoute,
  incidentPoints,
}) {
  const mapCenter = useMemo(() => {
    if (userPosition) return userPosition
    return [28.6139, 77.209]
  }, [userPosition])

  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom className="live-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidentPoints.map((incident) => (
        <Circle
          key={incident.id}
          center={incident.position}
          radius={120}
          pathOptions={{
            color: getSeverityColor(incident.severity),
            fillColor: getSeverityColor(incident.severity),
            fillOpacity: 0.2,
          }}
        >
          <Popup>{incident.label}</Popup>
        </Circle>
      ))}

      {userPosition && (
        <Marker position={userPosition} icon={markerIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {destinationPosition && (
        <Marker position={destinationPosition} icon={markerIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}

      {routes.map((route, index) => (
        <Polyline
          key={route.id}
          positions={route.geometry}
          pathOptions={{
            color: routeColors[index % routeColors.length],
            weight: selectedRouteIndex === index ? 7 : 4,
            opacity: selectedRouteIndex === index ? 1 : 0.5,
          }}
          eventHandlers={{
            click: () => onSelectRoute(index),
          }}
        />
      ))}
    </MapContainer>
  )
}

export default LiveMapCanvas
