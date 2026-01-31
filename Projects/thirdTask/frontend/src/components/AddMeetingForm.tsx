import React, { useState } from 'react';
import { addMeeting } from '../services/api';

interface AddMeetingFormProps {
  groupId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const AddMeetingForm: React.FC<AddMeetingFormProps> = ({ groupId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    starting_time: '',
    ending_time: '',
    description: '',
    meeting_room: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addMeeting({
        ...formData,
        production_group: groupId
      });
      onSuccess();
    } catch (err: any) {
      const msg = err.response?.data || err.message || "Failed to add meeting";
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in card">
      <h2 className="text-2xl mb-6">Schedule New Meeting</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="input-group">
        <label className="label">Meeting Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input"
          required
          placeholder="e.g. Sprint Planning"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label className="label">Start Time</label>
          <input
            type="datetime-local"
            name="starting_time"
            value={formData.starting_time}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label className="label">End Time</label>
          <input
            type="datetime-local"
            name="ending_time"
            value={formData.ending_time}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>

      <div className="input-group">
        <label className="label">Room Name</label>
        <input
          type="text"
          name="meeting_room"
          value={formData.meeting_room}
          onChange={handleChange}
          className="input"
          required
          placeholder="e.g. Room 101"
        />
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          className="btn flex-1"
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Schedule Meeting'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn flex-1"
          style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border)' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddMeetingForm;
