import iso3_to_iso2_map from '../utils/countryCodeMap';
import {PLAN_FORM} from "./index";

const APP_ID = "FmhcQxXbP2QLaJZ55ipx";
const APP_CODE = "o9Fupk1JS1dCxzd4Q3xh7Q";
const EMPTY_INPUT_RESULT = [];

function createResourceURLWithParam(param) {
    return `http://autocomplete.geocoder.api.here.com/6.2/suggest.json` +
        `?app_id=${APP_ID}` +
        `&app_code=${APP_CODE}` +
        `&query=${param}` +
        `&language=pl`;
}

function fetchSuggestions(input) {
    const resourceUrl = createResourceURLWithParam(input);

    return fetch(resourceUrl)
        .then(response => response.json())
        .then(json => {
            let {suggestions} = json;
            // TODO odfiltrować gminy z wyników
            if (suggestions) {
                return suggestions.filter(element => element.matchLevel === "city");
            }

            return EMPTY_INPUT_RESULT;
        })
        .then(result => {
            return result.map((value) => {
                const {city, country} = value.address;
                const text = city + ', ' + country;
                return {
                    key: value.locationId,
                    text,
                    value: text,
                    flag: iso3_to_iso2_map[value.countryCode]
                }
            });
        });
}

export function fetchCitySuggestions(input) {
    return (dispatch) => {
        dispatch(PLAN_FORM.requestCitySuggestion());
        fetchSuggestions(input)
            .then(suggestions => {
                dispatch(PLAN_FORM.retrieveCitySuggestion(suggestions))
            });
    }
}