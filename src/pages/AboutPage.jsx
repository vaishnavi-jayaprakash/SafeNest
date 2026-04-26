function AboutPage() {
  return (
    <section className="page">
      <div className="card">
        <h2>About & trust</h2>
        <p className="muted">
          SafeNest combines public safety datasets, user reports, and contextual
          signals such as time of day and route activity to estimate risk levels.
        </p>
        <div className="grid three-col">
          <article>
            <h3>Data sources</h3>
            <p>
              Public crime records, community submissions, and density indicators
              build the safety heatmap and route confidence score.
            </p>
          </article>
          <article>
            <h3>Scoring method</h3>
            <p>
              The AI scoring engine recalculates routes continuously, balancing
              user safety preference with journey efficiency.
            </p>
          </article>
          <article>
            <h3>Limitations</h3>
            <p>
              Safety predictions are advisory and should be combined with
              personal judgment and local emergency protocols.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
