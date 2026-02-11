import { useEffect, useState } from 'react';
import { getGroups, getMeetings } from './services/api';
import type { Group, Meeting } from './types';
import MeetingList from './components/MeetingList';
import AddMeetingForm from './components/AddMeetingForm';


function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);


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


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAdded = () => {
    setIsFormOpen(false);
    setNotification('Meeting scheduled successfully!');
    if (selectedGroupId) {
      setLoading(true);
      getMeetings(Number(selectedGroupId))
        .then(setMeetings)
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container min-h-screen flex flex-col">
      <header className="py-8 mb-8 border-b border-[var(--border)]">
        <div className="flex justify-between items-center">
          <div>
            <h1>Development Hub</h1>
            <p className="text-muted">Manage team schedules and meeting rooms</p>
          </div>
          {selectedGroupId && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <span>+</span> New Meeting
            </button>
          )}
        </div>
      </header>

      <main className="flex-1">
        {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-fade-in z-50">
            {notification}
          </div>
        )}
        <div className="card mb-8 max-w-xl">
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
          <div className="space-y-6">



            <div className="flex justify-between items-end">
              <h2 className="text-2xl">
                Scheduled Meetings
                <span className="ml-3 text-base font-normal text-muted bg-[var(--bg-card)] px-2 py-1 rounded-full border border-[var(--border)]">
                  {meetings.length}
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card h-48 animate-pulse bg-[var(--bg-card)]/50"></div>
                ))}
              </div>
            ) : (
              <MeetingList meetings={meetings} />
            )}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-card)]/30">
            <p className="text-xl text-muted font-light">Please select a development group to view their schedule</p>
          </div>
        )}
      </main>
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="modal-box w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Schedule New Meeting</h2>
            <AddMeetingForm
              groupId={Number(selectedGroupId)}
              onSuccess={handleAdded}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
