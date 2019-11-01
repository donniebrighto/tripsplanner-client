const initialState = {};

function tripDetails(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_TRIP_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_TRIP_DETAILS':
      return {
        ...state,
        isLoading: false,
        details: action.details,
      };
    default:
      return state;
  }
}

export default tripDetails;
