import { endpoints } from './config';

export function fetchTags() {
  return fetch(endpoints.tag.findAll, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
