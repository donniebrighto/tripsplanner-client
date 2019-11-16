const initialState = {};

function destinationGeocodingReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CITY_LOCATION':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_CITY_LOCATION':
      return {
        ...state,
        isLoading: false,
        location: action.location,
      };
    default:
      return state;
  }
}

export default destinationGeocodingReducer;
