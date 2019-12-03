const initialState = {
  pointsByDay: [],
  added: [],
  removed: [],
};

function getPointsByDay(day, pointsByDay) {
  return pointsByDay.find(points => points.day == day);
}

function acceptPoint(added, tripPoint) {
  return added.filter(
    point => JSON.stringify(point.tripPoint) != JSON.stringify(tripPoint)
  );
}

function planReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_POINTS_BY_DAY':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_POINTS_BY_DAY':
      return {
        ...state,
        isLoading: false,
        pointsByDay: action.pointsByDay,
      };
    case 'REQUEST_POINTS_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_POINTS_DETAILS':
      return {
        ...state,
        isLoading: false,
        content: action.content,
      };
    case 'ADD_TRIP_POINT':
      return {
        ...state,
        added: [...state.added, action.point],
      };
    case 'ACCEPT_ADDED_POINT':
      return {
        ...state,
        added: acceptPoint(state.added, action.tripPoint),
      };
    case 'REMOVE_TRIP_POINT':
      action.point.tripPoint.author.name = action.username;
      return {
        ...state,
        removed: [...state.removed, action.point],
      };
    case 'ACCEPT_REMOVED_POINT':
      return {
        ...state,
        removed: acceptPoint(state.removed, action.tripPoint),
      };
    case 'UPDATE_DAY_POINTS':
      return {
        ...state,
        points: getPointsByDay(state.day, state.pointsByDay),
      };
    case 'SET_DAY':
      return {
        ...state,
        day: action.day,
        points: getPointsByDay(action.day, state.pointsByDay),
      };
    default:
      return state;
  }
}

export default planReducer;
