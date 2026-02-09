import * as api from '../api';
import * as types from './action-types';

export const fetchTeams = () => async (dispatch) => {
  dispatch({ type: types.FETCH_TEAMS_REQUEST });
  try {
    const { data } = await api.fetchTeams();
    dispatch({ type: types.FETCH_TEAMS_SUCCESS, payload: data });
    // Auto-select first team if available and none selected?
    // For now, let user select.
  } catch (error) {
    dispatch({ type: types.FETCH_TEAMS_FAILURE, payload: error.message });
  }
};

export const selectTeam = (teamId) => (dispatch) => {
    dispatch({ type: types.SELECT_TEAM, payload: teamId });
    dispatch(fetchMeetings(teamId));
};

export const fetchMeetings = (teamId) => async (dispatch) => {
  dispatch({ type: types.FETCH_MEETINGS_REQUEST });
  try {
    const { data } = await api.fetchMeetings(teamId);
    dispatch({ type: types.FETCH_MEETINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.FETCH_MEETINGS_FAILURE, payload: error.message });
  }
};

export const addMeeting = (meetingData) => async (dispatch) => {
  try {
    const { data } = await api.addMeeting(meetingData);
    dispatch({ type: types.ADD_MEETING_SUCCESS, payload: data });
    // Refresh meetings list
    dispatch(fetchMeetings(meetingData.teamId));
  } catch (error) {
    dispatch({ type: types.ADD_MEETING_FAILURE, payload: error.response?.data || error.message });
    throw error; // Re-throw to let component handle success/failure UI
  }
};
