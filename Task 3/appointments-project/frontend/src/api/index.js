import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchTeams = () => API.get('/teams');
export const fetchMeetings = (teamId) => API.get(`/meetings/${teamId}`);
export const addMeeting = (meetingData) => API.post('/meetings', meetingData);
