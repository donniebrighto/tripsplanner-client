import axios from 'axios';
import { here, local } from '../../config/endpoints';
import client from '../client';
import { tripPlanningUrl } from '../../config/routes';
import { push } from 'connected-react-router';
import { PLACES_SEARCH } from './placesSearchActions';

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

const requestAutosuggestionDetails = () => ({
  type: 'REQUEST_AUTOSUGGESTION_DETAILS',
});

const retrieveAutosuggestionDetails = suggestions => ({
  type: 'RETRIEVE_AUTOSUGGESTION_DETAILS',
  suggestions,
});

function distance(location, { geometry }) {
  const position = location.split(',');
  let lat1 = position[0],
    lng1 = position[1];
  let lat2 = geometry.location.lat,
    lng2 = geometry.location.lng;
  const a = Math.abs(parseInt(lat1) - parseInt(lat2));
  const b = Math.abs(parseInt(lng1) - parseInt(lng2));
  return Math.sqrt(a ** 2 + b ** 2);
}

const fetchAutosuggestionDetails = (id, query, location) => async dispatch => {
  dispatch(requestAutosuggestionDetails());
  try {
    const response = await client().get(local.google.autosuggested, {
      params: {
        name: query,
        location,
        language: 'pl',
      },
    });
    console.log(response.data.results);
    const results = response.data.results.sort(res => distance(location, res));
    console.log(results);
    const result = response.data.results[0];
    dispatch(retrieveAutosuggestionDetails());
    const { place_id, photos } = result;
    dispatch(
      push(
        `${tripPlanningUrl(id)}/search/${place_id}/${
          photos && photos.length ? photos[0].photo_reference : ''
        }`
      )
    );
    dispatch(PLACES_SEARCH.fetchPlaceDetails(place_id));
  } catch (e) {
    console.log(e);
  }
};

export const PLACES_AUTOSUGGESTIONS = {
  fetchAutosuggestions,
  fetchAutosuggestionDetails,
};
