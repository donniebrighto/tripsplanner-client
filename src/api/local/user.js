import {endpoints} from "./config";

export function requestUserData() {
    return fetch(endpoints.user.me, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}