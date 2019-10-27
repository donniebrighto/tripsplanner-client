const initialState = {
    suggestion: []
};

function usersSuggestion(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_USER_SUGGESTION':
            return {
                ...state,
                isLoading: true
            };
        case 'RETRIEVE_USER_SUGGESTION':
            return {
                ...state,
                isLoading: false,
                suggestion: action.suggestion
            };
        default:
            return state;
    }
}

export default usersSuggestion;