import { PLAN_FORM } from './creators';
import { fetchTags } from '../../api/local/tags';

export function tagSuggestions() {
  return dispatch => {
    dispatch(PLAN_FORM.requestTagSuggestion());
    fetchTags()
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data.map((tag, key) => ({
          key,
          text: tag.value,
          value: tag.id,
        }));
      })
      .then(tags => dispatch(PLAN_FORM.retrieveTagSuggestion(tags)));
  };
}
