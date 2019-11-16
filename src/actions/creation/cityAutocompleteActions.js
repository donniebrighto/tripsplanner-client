import iso3_to_iso2_map from '../../utils/countryCodeMap';
import { here } from '../../config/endpoints';

const requestCitySuggestion = () => ({
  type: 'REQUEST_CITY_SUGGESTION',
});

const retrieveCitySuggestion = suggestions => ({
  type: 'RETRIEVE_CITY_SUGGESTION',
  suggestions,
});

export function cityAutocomplete(input) {
  return dispatch => {
    dispatch(requestCitySuggestion());
    fetchCitiesSuggestion(input).then(suggestions => {
      dispatch(retrieveCitySuggestion(suggestions));
    });
  };
}

const EMPTY_INPUT_RESULT = [];

function createResourceURLWithParam(param) {
  return `${here.autocomplete}&query=${param}&language=pl`;
}

function fetchCitiesSuggestion(input) {
  const resourceUrl = createResourceURLWithParam(input);

  return fetch(resourceUrl)
    .then(response => response.json())
    .then(json => {
      let { suggestions } = json;

      if (suggestions) {
        return suggestions.filter(element => element.matchLevel === 'city');
      }

      return EMPTY_INPUT_RESULT;
    })
    .then(result => {
      return result.map((value, key) => {
        const { city, country } = value.address;
        const text = city + ', ' + country;
        return {
          key: value.locationId,
          text,
          value: key,
          flag: iso3_to_iso2_map[value.countryCode],
        };
      });
    });
}
