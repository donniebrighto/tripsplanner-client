import { fetchCitiesSuggestion } from '../../api/here/fetchCitiesSuggestion';
import { PLAN_FORM } from './creators';

export function cityAutocomplete(input) {
  return dispatch => {
    dispatch(PLAN_FORM.requestCitySuggestion());
    fetchCitiesSuggestion(input).then(suggestions => {
      dispatch(PLAN_FORM.retrieveCitySuggestion(suggestions));
    });
  };
}
