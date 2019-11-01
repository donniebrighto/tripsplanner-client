const initialState = {
  suggestions: [],
  isLoading: false,
};

function citySuggestion(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CITY_SUGGESTION':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_CITY_SUGGESTION':
      return {
        ...state,
        isLoading: false,
        suggestions: action.suggestions,
      };
    default:
      return state;
  }
}

export default citySuggestion;
