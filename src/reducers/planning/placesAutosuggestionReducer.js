const initialState = {
  places: [],
  suggestions: [],
  isLoading: false,
};

function placesAutosuggestionReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_AUTOSUGGESTION':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_AUTOSUGGESTION':
      return {
        ...state,
        isLoading: false,
        suggestions: action.suggestions,
      };
    case 'REQUEST_AUTOSUGGESTION_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_AUTOSUGGESTION_DETAILS':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default placesAutosuggestionReducer;
