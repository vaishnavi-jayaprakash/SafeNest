export const routeCards = [
  { id: 1, name: 'Route A - Main Road', score: 92, eta: '24 min', risk: 'Low' },
  { id: 2, name: 'Route B - Market Lane', score: 81, eta: '19 min', risk: 'Medium' },
  { id: 3, name: 'Route C - Shortcut', score: 68, eta: '15 min', risk: 'High' },
]

export const heatmapZones = [
  { area: 'Riverside Junction', level: 'High Risk', shade: 'var(--danger)' },
  { area: 'City Center', level: 'Moderate', shade: 'var(--warning)' },
  { area: 'University Road', level: 'Safer Zone', shade: 'var(--success)' },
  { area: 'Metro East', level: 'Moderate', shade: 'var(--warning)' },
]

export const reports = [
  { area: 'Old Bus Stand', issue: 'Poor street lighting', time: '2h ago' },
  { area: 'Park Street', issue: 'Suspicious activity', time: '4h ago' },
  { area: 'Canal Road', issue: 'Harassment report', time: '1 day ago' },
]

export const incidentPoints = [
  {
    id: 'inc-1',
    label: 'Poor lighting',
    severity: 'medium',
    position: [28.6129, 77.2295],
  },
  {
    id: 'inc-2',
    label: 'Harassment report',
    severity: 'high',
    position: [28.6182, 77.2201],
  },
  {
    id: 'inc-3',
    label: 'Suspicious activity',
    severity: 'low',
    position: [28.6059, 77.2355],
  },
]

export const defaultPreferences = {
  lightingWeight: 70,
  crowdWeight: 55,
  policeWeight: 80,
  riskTolerance: 30,
}
