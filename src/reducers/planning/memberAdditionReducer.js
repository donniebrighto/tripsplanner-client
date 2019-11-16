const initialState = {
  suggestion: [],
};

function memberAdditionReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER_SUGGESTION':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_USER_SUGGESTION':
      return {
        ...state,
        isLoading: false,
        suggestion: action.suggestion,
      };
    case 'FILL_MEMBER_TO_ADD':
      return {
        ...state,
        member: action.member,
        success: false,
      };
    case 'REQUEST_MEMBER_ADDITION':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_MEMBER_ADDITION_RESPONSE':
      return {
        ...state,
        isLoading: false,
        member: '',
        success: true,
      };
    default:
      return state;
  }
}

export default memberAdditionReducer;
