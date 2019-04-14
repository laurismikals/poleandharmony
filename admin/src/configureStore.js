import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import 'regenerator-runtime/runtime';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';

import * as reducers from './reducers/index.js';
import rootSaga from './rootSaga.js';

const routesMap = {
  HOME: '/',
  ARTICLE_CATEGORIES: '/articleCategories/:action?/:id?',
  ARTICLES: '/articles/:action?/:id?',
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

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ ...reducers, location: reducer });
const middlewares = composeEnhancers(
  applyMiddleware(middleware, sagaMiddleware)
);
const enhancers = compose(enhancer, middlewares);

export const store = createStore(
  rootReducer,
  enhancers
);

sagaMiddleware.run(rootSaga);
