const initialState = {
    login: '',
    password: '',
    userId: null,
    isLoading: false,
    userAuthenticated: false
};

function authentication(state = initialState, action) {
    switch (action.type) {
        case 'FILL_USERNAME':
            return {
                ...state,
                login: action.login
            };
        case 'FILL_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName
            };
        case 'FILL_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName
            };
        case 'FILL_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'REQUEST_REGISTRATION':
            return {
                ...state,
                isLoading: true
            };
        case 'REQUEST_LOGIN':
            return {
                ...state,
                isLoading: true
            };
        case 'RETRIEVE_USER_ID':
            return {
                ...state,
                isLoading: false,
                userId: action.userId
            };
        default:
            return state;
    }
}

export default authentication;