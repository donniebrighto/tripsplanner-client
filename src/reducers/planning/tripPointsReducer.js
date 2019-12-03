const initialState = {
  tripPoints: [],
  days: [],
  date: undefined,
  startTime: undefined,
  endTime: undefined,
};

const tripPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_POSSIBLE_DAYS':
      return {
        ...state,
      };
    case 'RETRIEVE_POSSIBLE_DAYS':
      return {
        ...state,
        days: action.days,
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.date,
      };
    case 'SET_TIME':
      if (action.label === 'END') {
        return {
          ...state,
          endTime: action.time,
        };
      }
      return {
        ...state,
        startTime: action.time,
      };
    case 'RESET_DATE_AND_TIME':
      return {
        ...state,
        date: undefined,
        startTime: undefined,
        endTime: undefined,
      };
    default:
      return state;
  }
};

export default tripPointsReducer;
