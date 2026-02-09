import * as types from './action-types';
import { combineReducers } from 'redux';

const teamsReducer = (state = { teams: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_TEAMS_SUCCESS:
      return { ...state, loading: false, teams: action.payload };
    case types.FETCH_TEAMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const meetingsReducer = (state = { meetings: [], loading: false, error: null, selectedTeamId: '' }, action) => {
  switch (action.type) {
    case types.SELECT_TEAM:
      return { ...state, selectedTeamId: action.payload };
    case types.FETCH_MEETINGS_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_MEETINGS_SUCCESS:
      return { ...state, loading: false, meetings: action.payload };
    case types.FETCH_MEETINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.ADD_MEETING_SUCCESS:
       // We re-fetch meetings after add, so we might not need to append here, but for optimism we could.
       // For this implementation, we rely on the re-fetch in the action.
       return state;
    case types.ADD_MEETING_FAILURE:
       return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  teams: teamsReducer,
  meetings: meetingsReducer,
});
