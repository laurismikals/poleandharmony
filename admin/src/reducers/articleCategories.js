import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'articleCategories';
const FETCH = `${NAMESPACE}/FETCH`;
const LOAD = `${NAMESPACE}/LOAD`;
const ERROR = `${NAMESPACE}/ERROR`;

export const articleCategoriesFetch = () => ({ type: FETCH });
export const articleCategoriesLoad = (payload) => ({ type: LOAD, payload });
export const articleCategoriesError = (payload) => ({ type: ERROR, payload });

const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case LOAD: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    default: return state;
  }
};

const articleCategoriesFetcher = () => ajax('/articleCategories');

function* articleCategoriesFetchSaga() {
  try {
    const response = yield call(articleCategoriesFetcher);
    yield put(articleCategoriesLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articleCategoriesError(e));
  }
}

export function* articleCategoriesSaga() {
  yield takeEvery(FETCH, articleCategoriesFetchSaga);
}
