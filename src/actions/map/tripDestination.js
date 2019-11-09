import { endpoints } from '../config';
import { requestCityLocation, retrieveCityLocation } from './creators';

export default function fetchCityLocation(locationId) {
  return dispatch => {
    dispatch(requestCityLocation());
    getLocationFromLocationId(locationId).then(location =>
      dispatch(retrieveCityLocation(location))
    );
  };
}

function getLocationFromLocationId(locationId) {
  return fetch(`${endpoints.geocoder}&locationId=${locationId}`)
    .then(response => response.json())
    .then(data => processResult(data));
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

function isResponseViewOk(data) {
  const responseView = data.Response.View;
  if (!responseView.length) {
    console.error('NO VIEW FOR LOCATION ID');
    return false;
  } else if (responseView.length > 1) {
    console.warn('MORE THAN ONE VIEW FOR LOCATION ID');
    return true;
  }
  return true;
}
