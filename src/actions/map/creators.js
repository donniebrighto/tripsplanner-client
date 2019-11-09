import fetchCityLocation from './tripDestination';
import axios from 'axios';
import { endpoints } from '../config';

export const requestCityLocation = () => ({
  type: 'REQUEST_CITY_LOCATION',
});

export const retrieveCityLocation = location => ({
  type: 'RETRIEVE_CITY_LOCATION',
  location,
});

const requestPlaces = category => ({
  type: 'REQUEST_PLACES',
  category,
});

const retrievePlaces = places => ({
  type: 'RETRIEVE_PLACES',
  places,
});

const fetchPlaces = category => async dispatch => {
  dispatch(requestPlaces(category));
  try {
    const response = await axios.get(endpoints.explore, {
      params: {
        language: 'pl',
        cat: category,
        at: localStorage.getItem('coordinates'),
      },
    });
    dispatch(retrievePlaces(response.data.results.items));
  } catch (e) {
    console.log(e);
  }
};

export const MAP = {
  fetchCityLocation,
  fetchPlaces,
};
