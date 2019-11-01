import { AUTHENTICATION } from '../index';
import { requestUserData } from '../../api/local';

export function fetchCurrentUser() {
  return dispatch => {
    dispatch(AUTHENTICATION.requestUserData());
    requestUserData()
      .then(response => response.json())
      .then(data => dispatch(AUTHENTICATION.retrieveUserData(data)));
  };
}
