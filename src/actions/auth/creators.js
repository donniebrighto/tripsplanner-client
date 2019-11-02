import { fetchCurrentUser } from './fetchCurrentUser';
import { push } from 'connected-react-router';

const requestUserData = () => ({
  type: 'REQUEST_USER_DATA',
});

const retrieveUserData = ({ currentUser, futureTrips }) => ({
  type: 'RETRIEVE_USER_DATA',
  currentUser,
  futureTrips,
});

const logout = () => {
  return dispatch => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOG_OUT' });
    dispatch(push('/'));
  };
};

export const AUTHENTICATION = {
  requestUserData,
  retrieveUserData,
  fetchCurrentUser,
  logout,
};
