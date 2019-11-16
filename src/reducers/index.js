import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authenticationReducer from './auth/authenticationReducer';
import creationReducer from './creation';
import planningReducer from './planning';
import exploringReducer from './exploring';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
    creation: creationReducer,
    planning: planningReducer,
    exploring: exploringReducer,
  });

export default createRootReducer;
