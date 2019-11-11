const initialState = {
  notifications: [],
};

function mergeMemberWithStatus(state, action) {
  if (state.details) {
    const memberships = getMembershipsWithConnectionStatuses(state, [action.notification]);
    return {
      ...state,
      details: {
        ...state.details,
        memberships,
      },
    };
  }
  return {
    ...state,
    notifications: [...state.notifications, action.notification],
  };
}

function getMembershipsWithConnectionStatuses({details}, notifications) {
  const { memberships } = details;
  notifications.forEach(ntf => {
    const {sender, connected, lastVisit} = ntf;
    const index = memberships.findIndex(
      membership => membership.user.email === sender.email
    );
    memberships[index] = { ...memberships[index], online: connected, lastVisit };
  });
  return memberships;
}

function mergeWithNotificationsIfNeeded(state, action) {
  if (state.notifications.length) {
    const {details} = action;
    details.memberships = getMembershipsWithConnectionStatuses(action, state.notifications);
    return {
      ...state,
      isLoading: false,
      details
    }
  }
  return {
    ...state,
    isLoading: false,
    details: action.details,
  };
}

function tripDetails(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_TRIP_DETAILS':
      return {
        ...state,
        isLoading: true,
      };
    case 'RETRIEVE_TRIP_DETAILS':
      return mergeWithNotificationsIfNeeded(state, action);
    case 'NOTIFY':
      return mergeMemberWithStatus(state, action);
    default:
      return state;
  }
}

export default tripDetails;
