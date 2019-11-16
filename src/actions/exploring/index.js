import client from '../client';
import { local } from '../../config/endpoints';

const requestTrips = () => ({
  type: 'REQUEST_TRIPS',
});

const retrieveTrips = trips => ({
  type: 'RETRIEVE_TRIPS',
  trips,
});

export const fetchTrips = () => async dispatch => {
  dispatch(requestTrips);
  try {
    const response = await client().get(local.trip.all);
    const { data } = response;
    dispatch(retrieveTrips(data));
  } catch (err) {
    console.log(err);
  }
};

// just for hot reloading trips in exploring view after creating one
export const resetTrips = () => ({
  type: 'RESET_TRIPS',
});

export const EXPLORING = {
  fetchTrips,
};
