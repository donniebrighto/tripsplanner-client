const initialState = {

};

function exploreTrips(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_TRIPS':
            return {
                ...state,
                isLoading: true
            };
        case 'RETRIEVE_TRIPS':
            return {
                ...state,
                isLoading: false,
                trips: action.trips
            };
        default:
            return state;
    }
}

export default exploreTrips;