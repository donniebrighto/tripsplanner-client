import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import citySuggestion from './planForm/citySuggestion';
import tagSuggestion from './planForm/tagSuggestion'
import planForm from './planForm/planForm';
import authentication from "./auth/authentication";
import exploreTrips from "./trips/exploreTrips";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    citySuggestion,
    tagSuggestion,
    planForm,
    authentication,
    exploreTrips
});

export default createRootReducer