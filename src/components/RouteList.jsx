function RouteList({ routes, selectedRouteIndex, onSelectRoute }) {
  return (
    <ul className="list">
      {routes.map((route, index) => (
        <li
          key={route.id}
          className={selectedRouteIndex === index ? 'selected-route' : ''}
        >
          <div>
            <strong>{route.name}</strong>
            <p>
              {route.eta} · {route.risk} risk
            </p>
            {route.segments ? (
              <p className="tiny">
                Segment alerts: {route.segments.join(', ')}
              </p>
            ) : null}
          </div>
          <div className="route-actions">
            <span className="score">{route.score}</span>
            {onSelectRoute ? (
              <button type="button" onClick={() => onSelectRoute(index)}>
                Select
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RouteList
