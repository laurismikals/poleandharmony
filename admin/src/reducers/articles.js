import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'articles';
const FETCH = `${NAMESPACE}/FETCH`;
const ADD = `${NAMESPACE}/ADD`;
const EDIT = `${NAMESPACE}/EDIT`;
const DELETE = `${NAMESPACE}/DELETE`;
const LOAD = `${NAMESPACE}/LOAD`;
const ERROR = `${NAMESPACE}/ERROR`;

export const articlesFetch = () => ({ type: FETCH });
export const articlesAdd = (payload) => ({ type: ADD, payload });
export const articlesEdit = (payload) => ({ type: EDIT, payload });
export const articlesDelete = (payload) => ({ type: DELETE, payload });
export const articlesLoad = (payload) => ({ type: LOAD, payload });
export const articlesError = (payload) => ({ type: ERROR, payload });

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
    case ADD: {
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

const articlesFetcher = () => ajax('/articles');

function* articlesFetchSaga() {
  try {
    const response = yield call(articlesFetcher);
    yield put(articlesLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield put(articlesError(e));
  }
}

const articlesAdder = (body) => ajax('/articles/add', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

function* articlesAddSaga(action) {
  try {
    yield call(articlesAdder, action.payload);
  } catch (e) {
    console.error('Error: ', e);
    yield put(articlesError(e));
  }
}

const articlesEditor = ({ id, body }) => ajax(`/articles/edit/${id}`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
});

function* articlesEditSaga(action) {
  try {
    yield call(articlesEditor, action.payload);
  } catch (e) {
    console.error('Error: ', e);
    yield put(articlesError(e));
  }
}

export function* articlesSaga() {
  yield takeEvery(FETCH, articlesFetchSaga);
  yield takeEvery(ADD, articlesAddSaga);
  yield takeEvery(EDIT, articlesEditSaga);
}
