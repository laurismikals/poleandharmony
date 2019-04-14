import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'siteTree';
const FETCH = `${NAMESPACE}/FETCH`;
const ADD = `${NAMESPACE}/ADD`;
const EDIT = `${NAMESPACE}/EDIT`;
const LOAD = `${NAMESPACE}/LOAD`;
const ERROR = `${NAMESPACE}/ERROR`;

export const siteTreeFetch = () => ({ type: FETCH });
export const siteTreeAdd = (payload) => ({ type: ADD, payload });
export const siteTreeEdit = (payload) => ({ type: EDIT, payload });
export const siteTreeLoad = (payload) => ({ type: LOAD, payload });
export const siteTreeError = (payload) => ({ type: ERROR, payload });

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
    case EDIT: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case LOAD: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: return state;
  }
};

const siteTreeFetcher = () => ajax('/sitetree');

function* siteTreeFetchSaga() {
  try {
    const response = yield call(siteTreeFetcher);
    yield put(siteTreeLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield  put(siteTreeError(e));
  }
}

const siteTreeAdder = (data) => ajax('/sitetree/add', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
});

function* siteTreeAddSaga(action) {
  try {
    const response = yield call(siteTreeAdder, action.payload);
    console.log('response', response);
    // yield put(siteTreeLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield  put(siteTreeError(e));
  }
}

const siteTreeEditor = ({ id, body }) => {
  console.log('id, body', id, body);
  ajax(`/sitetree/edit/${id}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
};

function* siteTreeEditSaga(action) {
  try {
    const response = yield call(siteTreeEditor, action.payload);
    console.log('response', response);
    // yield put(siteTreeLoad(response));
  } catch (e) {
    console.error('Error: ', e);
    yield  put(siteTreeError(e));
  }
}

export function* siteTreeSaga() {
  yield takeEvery(FETCH, siteTreeFetchSaga);
  yield takeEvery(ADD, siteTreeAddSaga);
  yield takeEvery(EDIT, siteTreeEditSaga);
}
