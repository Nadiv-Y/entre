import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchTeams, selectTeam, addMeeting } from './redux/actions';
import TeamSelect from './components/TeamSelect';
import MeetingList from './components/MeetingList';
import AddMeetingForm from './components/AddMeetingForm';

function App() {
  const dispatch = useDispatch();
  const { teams, meetings, selectedTeamId, loading, error } = useSelector((state) => ({
    teams: state.teams.teams,
    meetings: state.meetings.meetings,
    selectedTeamId: state.meetings.selectedTeamId,
    loading: state.teams.loading || state.meetings.loading,
    error: state.teams.error || state.meetings.error
  }));

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleTeamSelect = (teamId) => {
    dispatch(selectTeam(teamId));
  };

  const handleAddMeeting = (meetingData) => {
    return dispatch(addMeeting(meetingData));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Appointments Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TeamSelect 
        teams={teams} 
        selectedTeamId={selectedTeamId} 
        onSelect={handleTeamSelect} 
      />

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}

      {selectedTeamId && (
        <>
          <MeetingList meetings={meetings} />
          <AddMeetingForm teamId={selectedTeamId} onAdd={handleAddMeeting} />
        </>
      )}
    </Container>
  );
}

export default App;
