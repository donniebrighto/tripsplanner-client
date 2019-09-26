const initialState = {
    name: '',
    city: '',
    locationId: '',
    startDate: {},
    endDate: {},
    tags: []
};

function fillField(action, state) {
    let {label, value} = action;
    let newState = {...state};
    newState[label] = value;
    return newState;
}

function fillCityStoreLocation(state, action) {
    let newState = {...state};
    newState['city'] = action.city;
    newState['locationId'] = action.locationId;
    return newState;
}

function planForm(state = initialState, action) {
    switch (action.type) {
        case 'FILL_FIELD':
            return fillField(action, state);
        case 'FILL_CITY_STORE_LOCATION':
            return fillCityStoreLocation(state, action);
        case 'SUBMIT_FORM':
            return;
        default:
            return state;
    }
}

export default planForm;