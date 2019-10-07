import {endpoints} from "./config";

export function requestSignin(login, password) {
    return fetch(endpoints.auth.signin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    });
}