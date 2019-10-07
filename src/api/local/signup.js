import {endpoints} from "./config";

export function requestSignup(login, firstName, lastName, password) {
    return fetch(endpoints.auth.signup, {
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