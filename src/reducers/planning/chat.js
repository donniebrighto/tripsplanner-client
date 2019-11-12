const initialState = {
  messages: [],
  input: '',
};

function chat(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'REQUEST_TRIP_MESSAGES':
      return {
        ...state,
        isLoading: true
      };
    case 'RETRIEVE_TRIP_MESSAGES':
      return {
        ...state,
        isLoading: false,
        messages: action.messages
      };
    case 'TYPE_MESSAGE':
      return {
        ...state,
        input: action.input,
      };
    default:
      return state;
  }
}

export default chat;





