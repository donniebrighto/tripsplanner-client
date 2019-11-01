import { cityAutocomplete } from './cityAutocomplete';
import { upload } from './uploadImage';
import { tagSuggestions } from './tagSuggestions';
import { submit } from './submit';

const requestCitySuggestion = () => ({
  type: 'REQUEST_CITY_SUGGESTION',
});

const retrieveCitySuggestion = suggestions => ({
  type: 'RETRIEVE_CITY_SUGGESTION',
  suggestions,
});

const fillField = (label, value) => ({
  type: 'FILL_FIELD',
  label,
  value,
});

const storeCityData = (name, locationId, flag) => ({
  type: 'FILL_CITY_STORE_LOCATION',
  destination: {
    label: name,
    locationId,
    iso2flag: flag,
  },
});

const requestTagSuggestion = () => ({
  type: 'REQUEST_TAG_SUGGESTION',
});

const retrieveTagSuggestion = available_tags => ({
  type: 'RETRIEVE_TAG_SUGGESTION',
  available_tags,
});

const uploadImage = imageId => ({
  type: 'UPLOAD_IMAGE',
  imageId,
});

export const PLAN_FORM = {
  requestTagSuggestion,
  retrieveTagSuggestion,
  requestCitySuggestion,
  retrieveCitySuggestion,
  storeCityData,
  fillField,
  cityAutocomplete,
  uploadImage,
  upload,
  tagSuggestions,
  submit,
};
