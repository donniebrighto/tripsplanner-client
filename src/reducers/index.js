import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import citySuggestion from './planForm/citySuggestion';
import tagSuggestion from './planForm/tagSuggestion';
import planForm from './planForm/planForm';
import authentication from './auth/authentication';
import exploreTrips from './trips/exploreTrips';
import tripDetails from './trips/tripDetails';
import usersSuggestion from './trips/usersSuggestion';
import addMember from './trips/addMember';
import tripDestination from './map/tripDestination';
import explorePlaces from './map/explorePlaces';
import chat from './planning/chat';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    citySuggestion,
    tagSuggestion,
    planForm,
    authentication,
    exploreTrips,
    tripDetails,
    usersSuggestion,
    addMember,
    tripDestination,
    explorePlaces,
    chat,
  });

export default createRootReducer;
