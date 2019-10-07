import LABELS from './labels';

const initialState = {
    [LABELS.USERNAME]: '',
    [LABELS.PASSWORD]: '',
    [LABELS.FIRST_NAME]: '',
    [LABELS.LAST_NAME]: '',
    userId: null,
    isLoading: false,
    userAuthenticated: false
};

function fillField(action, state) {
    let {label, value} = action;
    let newState = {...state};
    newState[label] = value;
    return newState;
}

function authentication(state = initialState, action) {
    switch (action.type) {
        case 'FILL_FIELD':
            return fillField(action, state);
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