import {fetchCurrentUser} from "./fetchCurrentUser";

const requestUserData = () => ({
    type: 'REQUEST_USER_DATA'
});

const retrieveUserData = (currentUser) => ({
    type: 'RETRIEVE_USER_DATA',
    currentUser
});

const logout = () => ({
    type: 'LOG_OUT'
});

export const AUTHENTICATION = {
    requestUserData,
    retrieveUserData,
    fetchCurrentUser,
    logout
};