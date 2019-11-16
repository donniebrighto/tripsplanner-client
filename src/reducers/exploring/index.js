import { combineReducers } from 'redux';
import tripsExplorationReducer from './tripsExplorationReducer';

export default combineReducers({
  tripsExploration: tripsExplorationReducer,
});
