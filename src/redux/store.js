import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { login, main } from './reducers';

export const history = createHistory();

export const store = createStore(
    combineReducers({
        login,
        main,
        router: routerReducer,
    }),
    applyMiddleware(
        routerMiddleware(history),
        logger,
        thunk,
    )
);
