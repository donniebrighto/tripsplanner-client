import {combineReducers} from "redux";
import citySuggestion from './citySuggestion';
import planForm from './planForm';

export default combineReducers({
    citiesSuggestions: citySuggestion,
    planForm
})