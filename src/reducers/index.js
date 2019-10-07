import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import citySuggestion from './citySuggestion';
import planForm from './planForm';
import authentication from "./authentication";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    citiesSuggestions: citySuggestion,
    planForm,
    authentication
});

export default createRootReducer