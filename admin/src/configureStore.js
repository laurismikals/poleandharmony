import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { connectRoutes } from 'redux-first-router';

import * as reducers from './reducers/index.js';

const routesMap = {
  ARTICLE_ADD: '/admin/article_add/',
  HOME: '/admin/',
  MAILBOX: '/admin/mailbox',
  PAGE_ADD: '/admin/page_add',
  SITETREE_ADD: '/admin/sitetree_add',
  SITETREE: '/admin/sitetree',
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
