import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography 
} from '@mui/material';

const MeetingList = ({ meetings }) => {
  if (meetings.length === 0) {
    return <Typography variant="body1" sx={{ mt: 2 }}>No meetings scheduled for this team.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="meetings table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Start Time</strong></TableCell>
            <TableCell><strong>End Time</strong></TableCell>
            <TableCell><strong>Duration</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Room</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {meetings.map((meeting) => {
              const start = new Date(meeting.startTime);
              const end = new Date(meeting.endTime);
              const diffMs = end - start;
              const diffMins = Math.floor(diffMs / 60000);
              const hours = Math.floor(diffMins / 60);
              const mins = diffMins % 60;
              const duration = `${hours > 0 ? `${hours}h ` : ''}${mins}m`;

              return (
              <TableRow
                key={meeting.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{start.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                <TableCell>{end.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                <TableCell>{duration}</TableCell>
                <TableCell>{meeting.description}</TableCell>
                <TableCell>{meeting.room}</TableCell>
              </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingList;
