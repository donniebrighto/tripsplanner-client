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





