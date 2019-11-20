import client from '../client';
import { here, local } from '../../config/endpoints';
import axios from 'axios';

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

const requestAutosuggestion = () => ({
  type: 'REQUEST_AUTOSUGGESTION',
});

const retrieveAutosuggestion = suggestions => ({
  type: 'RETRIEVE_AUTOSUGGESTION',
  suggestions,
});

const fetchAutosuggestions = query => async dispatch => {
  dispatch(requestAutosuggestion());
  try {
    const response = await axios.get(here.autosuggest, {
      params: {
        at: localStorage.getItem('coordinates'),
        q: query,
        tf: 'plain',
      },
    });
    let { results } = response.data;
    results = results.filter(res => res.distance < 10000);
    dispatch(retrieveAutosuggestion(results));
  } catch (e) {
    console.log(e);
  }
};

export const PLACES_SEARCH = {
  fetchPlaces,
  fetchAutosuggestions,
};
