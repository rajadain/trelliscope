import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

export const history = createHistory();

export const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }),
    applyMiddleware(
        routerMiddleware(history),
        logger,
        thunk,
    )
);
