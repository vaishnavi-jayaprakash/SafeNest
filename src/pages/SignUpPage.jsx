function SignupPage() {
    return (
      <section className="page login-page">
        <div className="card login-card">
          <p className="eyebrow">SafeNest access</p>
          <h1>Create account</h1>
          <p className="lead">
            Join SafeNest to access safe route tracking and emergency tools.
          </p>
  
          <form className="auth-form">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
  
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
  
            <label>
              Password
              <input type="password" placeholder="Create a password" />
            </label>
  
            <button type="submit">Sign up</button>
          </form>
  
          <p className="tiny">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </section>
    )
  }
  
  export default SignupPage