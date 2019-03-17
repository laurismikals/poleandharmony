import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { connectRoutes } from 'redux-first-router';

import * as reducers from './reducers/index.js';

const routesMap = {
  HOME: '/',
  ARTICLES: '/articles',
  ARTICLES_ADD: '/articles_add',
  MAILBOX: '/mailbox',
  SITETREE: '/sitetree/:action?/:id?',
  USER: '/user/:id',
};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const { reducer, middleware, enhancer } = connectRoutes(routesMap);

const rootReducer = combineReducers({ ...reducers, location: reducer });
const middlewares = composeEnhancers(applyMiddleware(middleware));
const enhancers = compose(enhancer, middlewares);

export const store = createStore(
  rootReducer,
  enhancers,
);
