import { endpoints } from './config';
import iso3_to_iso2_map from '../../utils/countryCodeMap';

const EMPTY_INPUT_RESULT = [];

function createResourceURLWithParam(param) {
  return `${endpoints.autocomplete}&query=${param}&language=pl`;
}

export function fetchCitiesSuggestion(input) {
  const resourceUrl = createResourceURLWithParam(input);

  return fetch(resourceUrl)
    .then(response => response.json())
    .then(json => {
      let { suggestions } = json;
      // TODO odfiltrować gminy z wyników
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
