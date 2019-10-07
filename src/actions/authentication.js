import {push} from 'connected-react-router';
import {AUTHENTICATION} from "./index";

const LOGIN_ENDPOINT = 'http://localhost:8080/auth/login';
const REGISTRATION_ENDPOINT = 'http://localhost:8080/auth/registration';
const UNAUTHORIZED = 401;

function sendLoginRequest(login, password) {
    return fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });
}

function handleError(status, dispatch) {
    if(status === UNAUTHORIZED) {
        dispatch(AUTHENTICATION.unauthorizedError('Podany login lub hasło są złe'));
    }
}

export function login(login, password) {
    return (dispatch) => {
        dispatch(AUTHENTICATION.requestUserLogin());
        sendLoginRequest(login, password)
            .then(response => {
                const {ok, status} = response;
                if (ok) {
                    return response.json();
                } else {
                    throw status;
                }
            })
            .then(json => {
                if(json.userId) localStorage.setItem("userId", json.userId);
                dispatch(AUTHENTICATION.retrieveUserLoginResponse(json.userId));
                dispatch(push('/'));
            })
            .catch(status => handleError(status, dispatch))
    }
}

function sendRegisterRequest(login, firstName, lastName, password) {

    console.log(JSON.stringify({
        login,
        firstName,
        lastName,
        password
    }));

    return fetch(REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login,
            firstName,
            lastName,
            password
        })
    });
}

export function register(login, firstName, lastName, password) {
    return (dispatch) => {
        dispatch(AUTHENTICATION.requestUserLogin());
        sendRegisterRequest(login, firstName, lastName, password)
            .then(response => {
                const {ok, status} = response;
                if (ok) {
                    return response.json();
                } else {
                    throw status;
                }
            })
            .then(json => {
                if(json.userId) localStorage.setItem("userId", json.userId);
                dispatch(AUTHENTICATION.retrieveUserLoginResponse(json.userId));
                dispatch(push('/'));
            })
            .catch(status => handleError(status, dispatch))
    }
}