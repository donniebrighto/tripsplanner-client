import client from '../client';
import { local } from '../../config/endpoints';

const requestPlaces = category => ({
  type: 'REQUEST_PLACES',
  category,
});

const retrievePlaces = places => ({
  type: 'RETRIEVE_PLACES',
  places,
});

export const fetchPlaces = category => async dispatch => {
  dispatch(requestPlaces(category));
  try {
    const response = await client().get(local.google.nearby, {
      params: {
        language: 'pl',
        type: category,
        location: localStorage.getItem('coordinates'),
        radius: local.google.default_radius,
      },
    });
    const { data } = response;
    const places = data.results;
    dispatch(retrievePlaces(places));
  } catch (e) {
    console.log(e);
  }
};

export const PLACES_SEARCH = {
  fetchPlaces,
};
