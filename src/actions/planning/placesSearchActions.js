import axios from 'axios';
import { here } from '../../config/endpoints';

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
    const response = await axios.get(here.explore, {
      params: {
        language: 'pl',
        cat: category,
        at: localStorage.getItem('coordinates'),
      },
    });
    const { data } = response;
    const places = data.results.items;
    dispatch(retrievePlaces(places));
  } catch (e) {
    console.log(e);
  }
};

export const PLACES_SEARCH = {
  fetchPlaces,
};
