import { local } from '../../config/endpoints';
import client from '../client';

const requestPossibleDays = () => ({
  type: 'REQUEST_POSSIBLE_DAYS',
});

const retrievePossibleDays = days => ({
  type: 'RETRIEVE_POSSIBLE_DAYS',
  days,
});

const fetchPossibleDays = tripId => async dispatch => {
  dispatch(requestPossibleDays());
  try {
    const response = await client().get(local.trip.days(tripId));
    dispatch(retrievePossibleDays(response.data));
  } catch (e) {
    console.log(e);
  }
};

const setDate = date => ({
  type: 'SET_DATE',
  date,
});

const setStartTime = time => ({
  type: 'SET_TIME',
  label: 'START',
  time,
});

const setEndTime = time => ({
  type: 'SET_TIME',
  label: 'END',
  time,
});

const resetDateAndTime = () => ({
  type: 'RESET_DATE_AND_TIME',
});

export const TRIP_POINTS = {
  fetchPossibleDays,
  setDate,
  setStartTime,
  setEndTime,
  resetDateAndTime,
};
