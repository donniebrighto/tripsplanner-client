const initialState = {
  places: [],
  suggestions: [],
};

function placesSearchReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PLACES':
      return {
        ...state,
        category: action.category,
      };
    case 'RETRIEVE_PLACES':
      return {
        ...state,
        category: undefined,
        places: action.places,
      };
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
    default:
      return state;
  }
}

export default placesSearchReducer;
