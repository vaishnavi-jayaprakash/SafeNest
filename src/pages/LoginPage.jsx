import { Link } from 'react-router-dom'
function LoginPage() {
  return (
    <section className="page login-page">
      <div className="card login-card">
        <p className="eyebrow">SafeNest access</p>
        <h1>Welcome back</h1>
        <p className="lead">
          Sign in to continue safe route tracking, emergency support, and travel
          monitoring.
        </p>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter your password" />
          </label>

          <div className="auth-row">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button type="button" className="link-btn">
              Forgot password?
            </button>
          </div>
          

          <button type="submit">Sign in</button>
          <p className="auth-switch">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
