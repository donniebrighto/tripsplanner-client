import { HERE_APP_ID, HERE_APP_CODE } from './keys';

export const here = {
  autocomplete: `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}`,
  geocoder: `http://geocoder.api.here.com/6.2/geocode.json?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}`,
  explore: `https://places.cit.api.here.com/places/v1/discover/explore?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}`,
  autosuggest: `https://places.cit.api.here.com/places/v1/autosuggest?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}`,
};

const base_url = 'http://localhost:8080';
const oauth2_redirect_uri = 'http://localhost:3000/oauth2/redirect';

export const local = {
  auth: {
    oauth2: `${base_url}/oauth2/authorize/google?redirect_uri=${oauth2_redirect_uri}`,
  },
  user: {
    me: `${base_url}/user/me`,
    email: `${base_url}/user/email`,
  },
  trip: {
    concrete: id => `${base_url}/trips/${id}`,
    create: `${base_url}/trips/create`,
    all: `${base_url}/trips/all`,
    base: `${base_url}/trips/`,
    past: `${base_url}/trips/past`,
    future: `${base_url}/trips/future`,
    active: `${base_url}/trips/active`,
    addMember: id => `${base_url}/trips/${id}/member`,
    chatMessages: id => `${base_url}/trips/${id}/chat`,
  },
  tag: {
    findAll: `${base_url}/trips/tags`,
  },
  image: {
    upload: `${base_url}/image/upload`,
  },
  google: {
    nearby: `${base_url}/google/nearby`,
    details: `${base_url}/google/details`,
    autosuggested: `${base_url}/google/autosuggested`,
    photo: (photo_reference, maxHeight) =>
      `${base_url}/google/photo?photoreference=${photo_reference}&maxheight=${maxHeight}`,
    default_radius: 5000,
  },
};
