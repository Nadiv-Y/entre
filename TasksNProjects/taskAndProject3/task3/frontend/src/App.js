import { useEffect, useState } from "react";
import { api } from "./api";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingMeetings, setLoadingMeetings] = useState(false);

  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    description: "",
    room: ""
  });

  useEffect(() => {
    (async () => {
      try {
        setLoadingTeams(true);
        const res = await api.get("/teams");
        setTeams(res.data);
      } catch {
        setError("Failed to load teams");
      } finally {
        setLoadingTeams(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedTeamId) {
      setMeetings([]);
      return;
    }

    (async () => {
      try {
        setLoadingMeetings(true);
        setError("");
        const res = await api.get(`/teams/${selectedTeamId}/meetings`);
        setMeetings(res.data);
      } catch {
        setError("Failed to load meetings");
      } finally {
        setLoadingMeetings(false);
      }
    })();
  }, [selectedTeamId]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedTeamId) {
      setError("Please select a team first");
      return;
    }

    try {
      const res = await api.post("/meetings", {
        team_id: Number(selectedTeamId),
        ...form
      });

      setMeetings(prev => {
        const next = [...prev, res.data];
        next.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        return next;
      });

      setForm({ start_time: "", end_time: "", description: "", room: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add meeting");
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Meetings Manager</h1>
          <p className="subtitle">Manage meetings by development team</p>
        </div>
        <div className="pill">API: localhost:4000</div>
      </header>

      <main className="layout">
        <section className="card">
          <div className="cardTitleRow">
            <h2>Team</h2>
            {loadingTeams && <span className="badge">Loading…</span>}
          </div>

          <label className="label">Choose a team</label>
          <select
            className="select"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            disabled={loadingTeams}
          >
            <option value="">-- Select team --</option>
            {teams.map(t => (
              <option key={t.team_id} value={t.team_id}>
                {t.team_name}
              </option>
            ))}
          </select>

          <div className="hint">
            Tip: pick a team to view its meetings and add new ones.
          </div>
        </section>

        <section className="card">
          <div className="cardTitleRow">
            <h2>Meetings</h2>
            {loadingMeetings && <span className="badge">Loading…</span>}
          </div>

          {!selectedTeamId && (
            <div className="empty">
              <div className="emptyTitle">No team selected</div>
              <div className="emptyText">Select a team to view meetings.</div>
            </div>
          )}

          {selectedTeamId && !loadingMeetings && meetings.length === 0 && (
            <div className="empty">
              <div className="emptyTitle">No meetings yet</div>
              <div className="emptyText">Create the first meeting for this team.</div>
            </div>
          )}

          {meetings.length > 0 && (
            <div className="grid">
              {meetings.map(m => (
                <article key={m.meeting_id} className="meetingCard">
                  <div className="meetingTop">
                    <div className="meetingTitle">{m.description}</div>
                    <div className="roomTag">{m.room}</div>
                  </div>
                  <div className="meetingMeta">
                    <div>
                      <span className="metaLabel">Start</span>
                      <span className="metaValue">{new Date(m.start_time).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="metaLabel">End</span>
                      <span className="metaValue">{new Date(m.end_time).toLocaleString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="card cardWide">
          <div className="cardTitleRow">
            <h2>Add meeting</h2>
            <span className="muted">All fields are required</span>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="field">
                <label className="label">Start time</label>
                <input
                  className="input"
                  type="datetime-local"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label className="label">End time</label>
                <input
                  className="input"
                  type="datetime-local"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field fieldWide">
                <label className="label">Description</label>
                <input
                  className="input"
                  type="text"
                  name="description"
                  placeholder="e.g., Sprint planning"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field fieldWide">
                <label className="label">Room</label>
                <input
                  className="input"
                  type="text"
                  name="room"
                  placeholder="e.g., Blue Room"
                  value={form.room}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="actions">
              <button className="btn" type="submit" disabled={!selectedTeamId}>
                Create meeting
              </button>
              {!selectedTeamId && (
                <span className="muted">Select a team to enable creation</span>
              )}
            </div>

            {error && <div className="alert">{error}</div>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <span className="muted">React + Express + MySQL</span>
      </footer>
    </div>
  );
}

export default App;
