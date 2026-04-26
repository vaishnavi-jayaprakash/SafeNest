import { useState } from 'react'
import { reports as seedReports } from '../data/mockData'

function ReportingPage() {
  const [reports, setReports] = useState(seedReports)
  const [form, setForm] = useState({
    location: '',
    issue: 'Poor lighting',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!form.location.trim()) return

    const next = {
      area: form.location.trim(),
      issue: form.issue,
      time: 'Just now',
    }
    setReports((previous) => [next, ...previous])
    setForm({ location: '', issue: 'Poor lighting', details: '' })
    setSubmitted(true)
  }

  return (
    <section className="page">
      <div className="grid two-col">
        <div className="card">
          <h2>Community reporting</h2>
          <p className="muted">
            Reports update the safety feed and influence route risk scoring.
          </p>
          <form className="report-form" onSubmit={onSubmit}>
            <label>
              Location
              <input
                type="text"
                placeholder="Enter location"
                value={form.location}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    location: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              Issue type
              <select
                value={form.issue}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    issue: event.target.value,
                  }))
                }
              >
                <option>Poor lighting</option>
                <option>Harassment</option>
                <option>Suspicious activity</option>
                <option>Unsafe transport point</option>
              </select>
            </label>
            <label>
              Details
              <textarea
                rows="4"
                placeholder="Describe what happened..."
                value={form.details}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    details: event.target.value,
                  }))
                }
              />
            </label>
            <button type="submit">Submit report</button>
          </form>
          {submitted ? (
            <p className="tiny">
              Report submitted. New incidents are now visible in the community feed.
            </p>
          ) : null}
        </div>

        <div className="card">
          <h3>Recent verified reports</h3>
          <ul className="list">
            {reports.map((report) => (
              <li key={report.area + report.time}>
                <div>
                  <strong>{report.area}</strong>
                  <p>{report.issue}</p>
                </div>
                <span className="muted">{report.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ReportingPage
