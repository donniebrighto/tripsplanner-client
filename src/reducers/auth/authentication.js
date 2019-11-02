const initialState = {
  isLoading: false,
  userAuthenticated: false,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_DATA':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_USER_DATA':
      return {
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
      };
    case 'LOG_OUT':
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}

export default authentication;
