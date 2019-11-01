import { endpoints } from './config';

export function requestUserData() {
  return fetch(endpoints.user.me, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export function getUsersByEmailSubstring(queryString) {
  return fetch(`${endpoints.user.email}?query=${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
