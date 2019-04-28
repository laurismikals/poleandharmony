import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

import { toastCreate, TOAST_TYPES } from 'REDUCERS/toast.js';

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
    yield call(articleCategoriesAdder, action.payload);
    yield put(toastCreate({ message: 'Rakstu kategorija veiksmīgi pievienota' }));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articleCategoriesError(e));
    yield put(toastCreate({ message: 'Rakstu kategoriju neizdevās pievienot', type: TOAST_TYPES.ERROR }));
  }
}

const articleCategoriesEditor = ({ id, body }) => ajax(`/articleCategories/edit/${id}`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

function* articleCategoriesEditSaga(action) {
  try {
    yield call(articleCategoriesEditor, action.payload);
    yield put(toastCreate({ message: 'Rakstu kategorija veiksmīgi izmainīta' }));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articleCategoriesError(e));
    yield put(toastCreate({ message: 'Rakstu kategoriju neizdevās izmainīt', type: TOAST_TYPES.ERROR }));
  }
}

const articleCategoriesDeleter = (id) => ajax(`/articleCategories/delete/${id}`, { method: 'POST' });

function* articleCategoriesDeleteSaga(action) {
  try {
    yield call(articleCategoriesDeleter, action.payload);
    yield put(toastCreate({ message: 'Rakstu kategorija veiksmīgi izdzēsta' }));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articleCategoriesError(e));
    yield put(toastCreate({ message: 'Rakstu kategoriju neizdevās izdzēst', type: TOAST_TYPES.ERROR }));
  }
}

export function* articleCategoriesSaga() {
  yield takeEvery(FETCH, articleCategoriesFetchSaga);
  yield takeEvery(ADD, articleCategoriesAddSaga);
  yield takeEvery(EDIT, articleCategoriesEditSaga);
  yield takeEvery(DELETE, articleCategoriesDeleteSaga);
}
