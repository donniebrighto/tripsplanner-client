const initialState = {
  name: '',
  destination: {
    name: '',
  },
  startDate: {},
  endDate: {},
  tags: [],
  owner: '',
  imageId: '',
};

function fillField(action, state) {
  let { label, value } = action;
  let newState = { ...state };
  newState[label] = value;
  return newState;
}

function fillCityStoreLocation(state, { label, locationId, iso2flag }) {
  let newState = { ...state };
  newState['destination'] = {
    label,
    locationId,
    iso2flag,
  };
  return newState;
}

function tripCreationFormReducer(state = initialState, action) {
  switch (action.type) {
    case 'FILL_FIELD':
      return fillField(action, state);
    case 'FILL_CITY_STORE_LOCATION':
      return fillCityStoreLocation(state, action.destination);
    case 'SUBMIT_FORM':
      return;
    case 'UPLOAD_IMAGE':
      return {
        ...state,
        imageId: action.imageId,
      };
    default:
      return state;
  }
}

export default tripCreationFormReducer;
