import axios from 'axios';
import { endpoints, requestConfig } from '../../api/local/config';

const registerClient = stompClient => ({
  type: 'REGISTER_CLIENT',
  stompClient,
});
const unregisterClient = () => ({
  type: 'UNREGISTER_CLIENT',
});
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
    const response = await axios.get(
      endpoints.trip.chatMessages(tripId),
      requestConfig()
    );
    dispatch(retrieveTripMessages(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const REALTIME = {
  registerClient,
  unregisterClient,
  addMessage,
  typeMessage,
  notify,
  fetchTripMessages
};
