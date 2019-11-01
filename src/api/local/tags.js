import { endpoints } from './config';

export function fetchTags() {
  return fetch(endpoints.tag.base, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
