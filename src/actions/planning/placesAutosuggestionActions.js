import axios from 'axios';
import { here } from '../../config/endpoints';

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

export const PLACES_AUTOSUGGESTIONS = {
  fetchAutosuggestions,
};
