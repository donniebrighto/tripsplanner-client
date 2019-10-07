import {applyMiddleware, createStore} from "redux";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {createBrowserHistory} from "history";
import {routerMiddleware} from "connected-react-router";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const logger = createLogger();
const router = routerMiddleware(history);

export default createStore(
    createRootReducer(history),
    {},
    applyMiddleware(
        logger,
        thunk,
        router
    )
);