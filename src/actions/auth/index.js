import { push } from 'connected-react-router';
import { local } from '../../config/endpoints';
import client from '../client';

const requestUserData = () => ({
  type: 'REQUEST_USER_DATA',
});

const retrieveUserData = ({ currentUser, futureTrips }) => ({
  type: 'RETRIEVE_USER_DATA',
  currentUser,
  futureTrips,
});

function fetchCurrentUser() {
  return async dispatch => {
    dispatch(requestUserData());
    try {
      const response = await client().get(local.user.me);
      const { data } = response;
      dispatch(retrieveUserData(data));
    } catch (e) {
      console.log(e);
    }
  };
}

const logout = () => {
  return dispatch => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOG_OUT' });
    dispatch(push('/'));
  };
};

export const AUTHENTICATION = {
  fetchCurrentUser,
  logout,
};
