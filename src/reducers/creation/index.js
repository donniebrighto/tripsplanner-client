import { combineReducers } from 'redux';
import cityAutocompleteReducer from './cityAutocompleteReducer';
import tripCreationFormReducer from './tripCreationFormReducer';
import tagAutocompleteReducer from './tagAutocompleteReducer';

export default combineReducers({
  cityAutocomplete: cityAutocompleteReducer,
  tripCreationForm: tripCreationFormReducer,
  tagAutocomplete: tagAutocompleteReducer,
});
