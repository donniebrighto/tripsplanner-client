const initialState = {
  places: [],
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
    default:
      return state;
  }
}

export default placesSearchReducer;
