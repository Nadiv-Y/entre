import axios from 'axios';
import type { NewMeeting } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getGroups = async () => {
  const response = await api.get('/teams');
  return response.data;
};

export const getMeetings = async (groupId: number) => {
  const response = await api.get(`/meetings/${groupId}`);
  return response.data;
};

export const addMeeting = async (meeting: NewMeeting) => {
  const response = await api.post('/meetings', meeting);
  return response.data;
};
