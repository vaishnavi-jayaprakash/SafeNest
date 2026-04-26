  import { NavLink } from 'react-router-dom'

  function Navbar() {
    return (
      <header className="top-nav">
        <div className="brand">SafeNest</div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/live-map">Live Map</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/about">About & Trust</NavLink>
        </nav>
      </header>
    )
  }

  export default Navbar
