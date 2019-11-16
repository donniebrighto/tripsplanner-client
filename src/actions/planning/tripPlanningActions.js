import client from '../client';
import { local } from '../../config/endpoints';

const requestTripDetails = () => ({
  type: 'REQUEST_TRIP_DETAILS',
});

const retrieveTripDetails = details => ({
  type: 'RETRIEVE_TRIP_DETAILS',
  details,
});

export const fetchTripDetails = id => async dispatch => {
  dispatch(requestTripDetails());
  try {
    const response = await client().get(local.trip.concrete(id));
    const { data } = response;
    dispatch(retrieveTripDetails(data));
  } catch (e) {
    console.log(e);
  }
};
