import { endpoints } from './config';

export function createTrip(trip) {
  const { name, destination, startDate, endDate, tags, imageId } = trip;

  const payload = {
    trip: {
      name,
      destination,
      startDate,
      endDate,
    },
    tagsIds: tags,
    imageId,
  };

  return fetch(endpoints.trip.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(payload),
  });
}

export function getUserTrips() {
  return fetch(endpoints.trip.all, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export function getTripById(id) {
  return fetch(endpoints.trip.base + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export function postMemberToTripAddition(id, email) {
  return fetch(endpoints.trip.addMember(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: email,
  });
}
