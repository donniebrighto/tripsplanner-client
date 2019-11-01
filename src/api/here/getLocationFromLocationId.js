import { endpoints } from './config';

function isResponseViewOk(data) {
  const responseView = data.Response.View;
  if (responseView.length == 0) {
    console.error('NO VIEW FOR LOCATION ID');
    return false;
  } else if (responseView.length > 1) {
    console.warn('MORE THAN ONE VIEW FOR LOCATION ID');
    return true;
  }
  return true;
}

function processResult(data) {
  if (!isResponseViewOk(data)) {
    return {};
  }
  const results = data.Response.View[0].Result;
  if (results.length === 1) {
    const result = results[0];
    const { DisplayPosition } = result.Location;
    return {
      lat: DisplayPosition.Latitude,
      lng: DisplayPosition.Longitude,
    };
  }
  console.warn('too much results for city fetching');
  return {};
}

export function getLocationFromLocationId(locationId) {
  return fetch(`${endpoints.geocoder}&locationId=${locationId}`)
    .then(response => response.json())
    .then(data => processResult(data));
}
