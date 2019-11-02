const base_url = 'http://localhost:8080';
const oauth2_redirect_uri = 'http://localhost:3000/oauth2/redirect';

export const requestConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const endpoints = {
  auth: {
    oauth2: `${base_url}/oauth2/authorize/google?redirect_uri=${oauth2_redirect_uri}`,
  },
  user: {
    me: `${base_url}/user/me`,
    email: `${base_url}/user/email`,
  },
  trip: {
    create: `${base_url}/trips/create`,
    all: `${base_url}/trips/all`,
    base: `${base_url}/trips/`,
    past: `${base_url}/trips/past`,
    future: `${base_url}/trips/future`,
    active: `${base_url}/trips/active`,
    addMember: id => `${base_url}/trips/${id}/member`,
  },
  tag: {
    findAll: `${base_url}/trips/tags`,
  },
  image: {
    upload: `${base_url}/image/upload`,
  },
};
