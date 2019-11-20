import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import destinationGeocodingReducer from './destinationGeocodingReducer';
import placesSearchReducer from './placesSearchReducer';
import websocketsContextReducer from './websocketsContextReducer';
import memberAdditionReducer from './memberAdditionReducer';
import tripPlanningReducer from './tripPlanningReducer';
import placesAutosuggestionReducer from './placesAutosuggestionReducer';

export default combineReducers({
  chat: chatReducer,
  destinationGeocoding: destinationGeocodingReducer,
  memberAddition: memberAdditionReducer,
  placesSearch: placesSearchReducer,
  placesAutosuggestion: placesAutosuggestionReducer,
  tripPlanning: tripPlanningReducer,
  websocketsContext: websocketsContextReducer,
});
