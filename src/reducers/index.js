import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import citySuggestion from './planForm/citySuggestion';
import planForm from './planForm/planForm';
import authentication from "./auth/authentication";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    citySuggestion,
    planForm,
    authentication
});

export default createRootReducer