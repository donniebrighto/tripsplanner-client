import axios from 'axios';

import { fetchUserTrips } from './fetchUserTrips';
import { fetchTripDetails } from './fetchTripDetails';
import { addMemberToTrip, suggestMembersToAdd } from './addMember';
import { endpoints, requestConfig } from '../../api/local/config';

const requestTripDetails = () => ({
  type: 'REQUEST_TRIP_DETAILS',
});

const retrieveTripDetails = details => ({
  type: 'RETRIEVE_TRIP_DETAILS',
  details,
});

const requestMemberAddition = () => ({
  type: 'REQUEST_MEMBER_ADDITION',
});

const retrieveMemberAdditionResponse = () => ({
  type: 'RETRIEVE_MEMBER_ADDITION_RESPONSE',
});

const requestUsersSuggestion = () => ({
  type: 'REQUEST_USER_SUGGESTION',
});

const retrieveUsersSuggestion = suggestion => ({
  type: 'RETRIEVE_USER_SUGGESTION',
  suggestion,
});

const fillMemberToAdd = member => ({
  type: 'FILL_MEMBER_TO_ADD',
  member,
});

const requestTrips = () => ({
  type: 'REQUEST_TRIPS',
});

const retrieveTrips = trips => ({
  type: 'RETRIEVE_TRIPS',
  trips,
});

const fetchTrips = () => async dispatch => {
  dispatch(requestTrips);
  try {
    const response = await axios.get(endpoints.trip.all, requestConfig());
    dispatch(retrieveTrips(response.data));
  } catch (err) {
    console.log(err);
    // TODO - Alarm - dodam wszędzie przy okazji alarmów z użytkownikami
  }
};

const resetTrips = () => ({
  type: 'RESET_TRIPS',
});

export const TRIPS = {
  fetchTrips,
  resetTrips,
  requestTripDetails,
  retrieveTripDetails,
  fetchTripDetails,
  requestMemberAddition,
  retrieveMemberAdditionResponse,
  requestUsersSuggestion,
  retrieveUsersSuggestion,
  suggestMembersToAdd,
  addMemberToTrip,
  fillMemberToAdd,
};
