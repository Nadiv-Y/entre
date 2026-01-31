import { useEffect, useState } from 'react';
import { getGroups, getMeetings } from './services/api';
import type { Group, Meeting } from './types';
import MeetingList from './components/MeetingList';
import AddMeetingForm from './components/AddMeetingForm';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGroups().then(setGroups).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedGroupId) {
      setLoading(true);
      getMeetings(Number(selectedGroupId))
        .then(setMeetings)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setMeetings([]);
    }
  }, [selectedGroupId]);

  const handleAdded = () => {
    setShowAddForm(false);
    if (selectedGroupId) {
      getMeetings(Number(selectedGroupId)).then(setMeetings);
    }
  };

  return (
    <div className="container">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1>Development Hub</h1>
          <p className="text-muted">Manage team schedules and meeting rooms</p>
        </div>
        {selectedGroupId && !showAddForm && (
          <button onClick={() => setShowAddForm(true)} className="btn">
            + New Meeting
          </button>
        )}
      </header>

      <main>
        {!showAddForm ? (
          <>
            <div className="card mb-8">
              <label className="label">Select Development Group</label>
              <select
                value={selectedGroupId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedGroupId(val === "" ? "" : Number(val));
                }}
                className="select"
              >
                <option value="">-- Choose a Team --</option>
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            {selectedGroupId ? (
              <>
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-2xl">
                    Scheduled Meetings-
                    <span className="text-base font-normal text-muted">
                      {meetings.length} upcoming
                    </span>
                  </h2>
                </div>
                {loading ? (
                  <div className="text-center py-12 text-muted">Loading schedule...</div>
                ) : (
                  <MeetingList meetings={meetings} />
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl">
                <p className="text-xl text-muted">Please select a development group to view their schedule</p>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <AddMeetingForm
              groupId={Number(selectedGroupId)}
              onSuccess={handleAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
