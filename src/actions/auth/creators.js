import {signup} from "./signup";
import {signin} from "./signin";

const fillField = (label, value) => ({
    type: 'FILL_FIELD',
    label,
    value
});

const requestUserLogin = () => ({
    type: 'REQUEST_LOGIN'
});

const retrieveUserLoginResponse = (userId) => ({
    type: 'RETRIEVE_USER_ID',
    userId
});

export const AUTHENTICATION = {
    fillField,
    requestUserLogin,
    retrieveUserLoginResponse,
    signin,
    signup
};