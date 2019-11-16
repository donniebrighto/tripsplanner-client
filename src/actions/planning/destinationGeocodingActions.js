import axios from 'axios';
import { here } from '../../config/endpoints';

const requestCityLocation = () => ({
  type: 'REQUEST_CITY_LOCATION',
});

const retrieveCityLocation = location => ({
  type: 'RETRIEVE_CITY_LOCATION',
  location,
});

export const geocodeCityFromLocationId = locationId => async dispatch => {
  dispatch(requestCityLocation());
  try {
    const response = await axios.get(here.geocoder, {
      params: {
        locationId: locationId,
      },
    });
    const data = processResult(response.data);
    dispatch(retrieveCityLocation(data));
  } catch (e) {
    console.log(e);
  }
};

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
