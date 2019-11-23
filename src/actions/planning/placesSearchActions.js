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

const cachedPlaces = [
  {
    place_id: 'ChIJt3QO4tfpD0cRGn3pBQc7SDc',
    name: 'Panorama Racławicka',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
    geometry: {
      location: {
        lat: '51.1101287',
        lng: '17.0443431',
      },
    },
    rating: '4.5',
    vicinity: 'Jana Ewangelisty Purkyniego 11, Wrocław',
    user_ratings_total: 11169,
    types: [
      'museum',
      'tourist_attraction',
      'point_of_interest',
      'establishment',
    ],
    price_level: -1,
    photos: [
      {
        photo_reference:
          'CmRaAAAAc6JFcqtDhsVoBNVlERE1b16cx9c4I5ze_dDzBETyGw1SuM-EzGuOxi8pFtHju5wwU4AvclC3chHQIerpDZpR-lMxPRHSIsaf4h0nt3E6CeTxo3-QR5HfH6wAMvL5IDoWEhAyluFGCxckr3MPx3YmgSxuGhRSlCloNN_aKObxCO3eXqN0EfK4sA',
      },
    ],
  },
  {
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png',
    name: 'Muzeum Sztuki Mieszczańskej',
    place_id: 'ChIJZbdqsXXCD0cRaN5OXkzLH5o',
    price_level: -1,
    rating: '4.7',
    geometry: {
      location: {
        lat: '51.1095529',
        lng: '17.0321067',
      },
    },
    vicinity: 'Jana Ewangelisty Purkyniego 11, Wrocław',
    user_ratings_total: 3330,
    types: [
      'museum',
      'tourist_attraction',
      'point_of_interest',
      'establishment',
    ],
  },
];

const fetchPlaces = category => async dispatch => {
  dispatch(requestPlaces(category));
  try {
    // const response = await client().get(local.google.nearby, {
    //   params: {
    //     language: 'pl',
    //     type: category,
    //     location: localStorage.getItem('coordinates'),
    //     radius: local.google.default_radius,
    //   },
    // });
    // const { data } = response;
    // console.log(data);
    // const places = data.results;
    dispatch(retrievePlaces(cachedPlaces));
  } catch (e) {
    console.log(e);
  }
};

const requestPlaceDetails = () => ({
  type: 'REQUEST_PLACE_DETAILS',
});

const retrievePlaceDetails = details => ({
  type: 'RETRIEVE_PLACE_DETAILS',
  details,
});

const details = {
  name: 'Test',
  rating: '4.5',
  vicinity: 'ul. Kluczborska 37, Wrocław',
  international_phone_number: '+ 48 502 925 686',
  website: 'https://wawrzyniak.info',
  opening_hours: {
    weekday_text: [
      'poniedziałek: 09:00–17:30',
      'wtorek: 09:00–17:30',
      'środa: 09:00–17:30',
      'czwartek: 09:00–17:30',
      'piątek: 09:00–17:00',
      'sobota: Zamknięte',
      'niedziela: Zamknięte',
    ],
  },
  url: 'https://wawrzyniak.info',
};

const fetchPlaceDetails = place_id => async dispatch => {
  dispatch(requestPlaceDetails());
  try {
    const detailsResponse = await client().get(local.google.details, {
      params: {
        place_id,
        language: 'pl',
        fields:
          'name,rating,opening_hours/weekday_text,geometry/location,vicinity,international_phone_number,website,url',
      },
    });
    dispatch(retrievePlaceDetails(detailsResponse.data.result));
  } catch (e) {
    console.log(e);
  }
};

export const PLACES_SEARCH = {
  fetchPlaces,
  fetchPlaceDetails,
};
