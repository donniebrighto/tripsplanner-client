const initialState = {
    name: '',
    city: '',
    locationId: '',
    startDate: {},
    endDate: {},
    chosen_tags: [],
    available_tags: [
        {
            text: "chillout",
            key: "chillout",
            value: "chillout",
        },
        {
            text: "zwiedzanie",
            key: "zwiedzanie",
            value: "zwiedzanie",
        },
        {
            text: "życie nocne",
            key: "życie nocne",
            value: "życie nocne",
        },
        {
            text: "romantyczny wyjazd we dwoje",
            key: "romantyczny wyjazd we dwoje",
            value: "romantyczny wyjazd we dwoje",
        },
        {
            text: "trip ze znajomymi",
            key: "trip ze znajomymi",
            value: "trip ze znajomymi",
        },
        {
            text: "rodzinne wakacje",
            key: "rodzinne wakacje",
            value: "rodzinne wakacje",
        },
        {
            text: "miasto",
            key: "miasto",
            value: "miasto",
        },
        {
            text: "plażowanie",
            key: "plażowanie",
            value: "plażowanie",
        },
        {
            text: "aktywny wypoczynek",
            key: "aktywny wypoczynek",
            value: "aktywny wypoczynek",
        }
    ]
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