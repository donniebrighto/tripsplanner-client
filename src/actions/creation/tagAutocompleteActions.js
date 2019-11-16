import client from '../client';
import { local } from '../../config/endpoints';

const requestTagSuggestion = () => ({
  type: 'REQUEST_TAG_SUGGESTION',
});

const retrieveTagSuggestion = available_tags => ({
  type: 'RETRIEVE_TAG_SUGGESTION',
  available_tags,
});

export function tagSuggestions() {
  return async dispatch => {
    dispatch(requestTagSuggestion());
    try {
      const response = await client().get(local.tag.findAll);
      const data = response.data.map((tag, key) => ({
        key,
        text: tag.value,
        value: tag.id,
      }));
      dispatch(retrieveTagSuggestion(data));
    } catch (e) {
      console.log(e);
    }
  };
}
