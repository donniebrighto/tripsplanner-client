import { TRIPS } from './creators';
import { postMemberToTripAddition } from '../../api/local';
import { getUsersByEmailSubstring } from '../../api/local/user';

export function addMemberToTrip(id, email) {
  return dispatch => {
    dispatch(TRIPS.requestMemberAddition());
    postMemberToTripAddition(id, email)
      .then(response => response.json())
      .then(data => dispatch(TRIPS.retrieveMemberAdditionResponse()));
  };
}

export function suggestMembersToAdd(query) {
  return dispatch => {
    dispatch(TRIPS.requestUsersSuggestion());
    getUsersByEmailSubstring(query)
      .then(response => response.json())
      .then(data => {
        return data.map(user => ({
          key: user.email,
          text: user.email,
          value: user.email,
          image: { avatar: true, src: user.imageUrl },
        }));
      })
      .then(suggestion => dispatch(TRIPS.retrieveUsersSuggestion(suggestion)));
  };
}
