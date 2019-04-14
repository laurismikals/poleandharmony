import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'articleCategories';
const FETCH = `${NAMESPACE}/FETCH`;
const ADD = `${NAMESPACE}/ADD`;
const EDIT = `${NAMESPACE}/EDIT`;
const DELETE = `${NAMESPACE}/DELETE`;
const LOAD = `${NAMESPACE}/LOAD`;
const ERROR = `${NAMESPACE}/ERROR`;

export const articleCategoriesFetch = () => ({ type: FETCH });
export const articleCategoriesAdd = (payload) => ({ type: ADD, payload });
export const articleCategoriesEdit = (payload) => ({ type: EDIT, payload });
export const articleCategoriesDelete = (payload) => ({ type: DELETE, payload });
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

const articleCategoriesAdder = (body) => ajax('/articleCategories/add', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

function* articleCategoriesAddSaga(action) {
  try {
    const response = yield call(articleCategoriesAdder, action.payload);
    console.log('response', response);
    // yield put(articleCategoriesLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articleCategoriesError(e));
  }
}

export function* articleCategoriesSaga() {
  yield takeEvery(FETCH, articleCategoriesFetchSaga);
  yield takeEvery(ADD, articleCategoriesAddSaga);
}
