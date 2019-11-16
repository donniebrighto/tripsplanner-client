import client from '../client';
import { local } from '../../config/endpoints';

const fillMemberToAdd = member => ({
  type: 'FILL_MEMBER_TO_ADD',
  member,
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

const addMemberToTrip = (id, email) => async dispatch => {
  dispatch(requestMemberAddition());
  try {
    await client().post(local.trip.addMember(id), {
      email,
    });
    dispatch(retrieveMemberAdditionResponse());
  } catch (e) {
    console.log(e);
  }
};

const suggestMembersToAdd = query => async dispatch => {
  dispatch(requestUsersSuggestion());
  try {
    const response = await client().get(local.user.email, {
      params: {
        query: query,
      },
    });
    const data = mapResponseDataToUserDto(response.data);
    dispatch(retrieveUsersSuggestion(data));
  } catch (e) {
    console.log(e);
  }
};

const mapResponseDataToUserDto = data => {
  return data.map(user => ({
    key: user.email,
    text: user.email,
    value: user.email,
    image: { avatar: true, src: user.imageUrl },
  }));
};

export const MEMBER_ADDITION = {
  addMemberToTrip,
  fillMemberToAdd,
  suggestMembersToAdd,
};
