import client from '../client';
import { local } from '../../config/endpoints';

const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message,
});

const typeMessage = input => ({
  type: 'TYPE_MESSAGE',
  input,
});

const notify = notification => ({
  type: 'NOTIFY',
  notification,
});

const requestTripMessages = () => ({
  type: 'REQUEST_TRIP_MESSAGES',
});

const retrieveTripMessages = messages => ({
  type: 'RETRIEVE_TRIP_MESSAGES',
  messages,
});

const fetchTripMessages = tripId => async dispatch => {
  dispatch(requestTripMessages);
  try {
    const response = await client().get(local.trip.chatMessages(tripId));
    const { data } = response;
    dispatch(retrieveTripMessages(data));
  } catch (err) {
    console.log(err);
  }
};

export const CHAT = {
  addMessage,
  typeMessage,
  notify,
  fetchTripMessages,
};
