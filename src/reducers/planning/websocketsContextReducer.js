const initialState = {
  stompClient: undefined,
};

const websocketsContextReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_CLIENT':
      return {
        stompClient: action.stompClient,
      };
    case 'UNREGISTER_CLIENT':
      return {};
    default:
      return state;
  }
};

export default websocketsContextReducer;
