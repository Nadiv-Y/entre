import React from 'react';
import type { Meeting } from '../types';

import { calculateDuration, formatDate } from '../utils/dateUtils';

interface MeetingListProps {
  meetings: Meeting[];
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  if (meetings.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-card)]/50">
        <p className="text-muted text-lg">No meetings scheduled for this group.</p>
        <p className="text-sm text-gray-500 mt-2">Click "New Meeting" to schedule one.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="card">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-muted uppercase tracking-wider">
              {meeting.meeting_room}
            </span>
            <div className="text-sm font-mono text-muted bg-gray-800 px-2 py-1 rounded">
              {calculateDuration(meeting.starting_time, meeting.ending_time)}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2">{meeting.description}</h3>

          <div className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Start:</span>
              <span className="font-medium text-white">{formatDate(meeting.starting_time)}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>End:</span>
              <span className="font-medium text-white">{formatDate(meeting.ending_time)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingList;
