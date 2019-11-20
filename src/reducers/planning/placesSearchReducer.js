const initialState = {
  places: [],
  isLoading: false,
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
    case 'REQUEST_PLACE_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_PLACE_DETAILS':
      return {
        ...state,
        details: action.details,
        isLoading: false,
      };
    case 'REQUEST_PLACE_PHOTO':
      return {
        ...state,
        photoLoading: true,
      };
    case 'RETRIEVE_PLACE_PHOTO':
      return {
        ...state,
        details: { ...state.details, photo: action.photo },
        photoLoading: false,
      };
    default:
      return state;
  }
}

export default placesSearchReducer;
