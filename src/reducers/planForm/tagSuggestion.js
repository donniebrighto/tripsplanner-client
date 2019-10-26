const initialState = {
    available_tags: [],
    isLoading: false
};

function tagSuggestion(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_TAG_SUGGESTION':
            return {
                ...state,
                isLoading: true
            };
        case 'RETRIEVE_TAG_SUGGESTION':
            return {
                ...state,
                isLoading: false,
                available_tags: action.available_tags
            };
        default:
            return state;
    }
}

export default tagSuggestion;