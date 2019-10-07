import {fetchCitySuggestions} from "./suggestCities";
import {login, register} from './authentication';

const suggestCities = (input, minCharacters) => ({
    type: 'SUGGEST_CITIES',
    input,
    minCharacters
});

const requestCitySuggestion = () => ({
    type: 'REQUEST_CITY_SUGGESTION'
});

const retrieveCitySuggestion = (suggestions) => ({
    type: 'RETRIEVE_CITY_SUGGESTION',
    suggestions
});

const fillField = (label, value) => ({
    type: 'FILL_FIELD',
    label,
    value
});

const storeCityData = (city, locationId) => ({
    type: 'FILL_CITY_STORE_LOCATION',
    city,
    locationId
});

export const PLAN_FORM = {
    requestCitySuggestion,
    retrieveCitySuggestion,
    suggestCities,
    storeCityData,
    fillField,
    fetchCitySuggestions
};

const fillUsername = (login) => ({
    type: 'FILL_USERNAME',
    login
});

const fillPassword = (password) => ({
    type: 'FILL_PASSWORD',
    password
});

const requestUserLogin = () => ({
    type: 'REQUEST_LOGIN'
});

const retrieveUserLoginResponse = (userId) => ({
    type: 'RETRIEVE_USER_ID',
    userId
});

const fillFirstName = (firstName) => ({
    type: 'FILL_FIRST_NAME',
    firstName
});

const fillLastName = (lastName) => ({
    type: 'FILL_LAST_NAME',
    lastName
});

export const AUTHENTICATION = {
    fillUsername,
    fillPassword,
    fillFirstName,
    fillLastName,
    requestUserLogin,
    retrieveUserLoginResponse,
    login,
    register
};