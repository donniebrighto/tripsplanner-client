const initialState = {
    isLoading: false,
    userAuthenticated: false
};

function authentication(state = initialState, action) {
    switch (action.type) {
        case "REQUEST_USER_DATA":
            return {
                ...state,
                isLoading: true,
                userAuthenticated: true
            };
        case "RETRIEVE_USER_DATA":
            return {
                ...state,
                isLoading: false,
                currentUser: action.currentUser
            };
        case "LOG_OUT":
            return {
                ...state,
                userAuthenticated: false
            };
        default:
            return state;
    }
}

export default authentication;