import fetchCityLocation from './tripDestination';

export const requestCityLocation = () => ({
  type: 'REQUEST_CITY_LOCATION',
});

export const retrieveCityLocation = location => ({
  type: 'RETRIEVE_CITY_LOCATION',
  location,
});

export const MAP = {
  fetchCityLocation,
};
