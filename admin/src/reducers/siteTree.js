import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'siteTree';
const FETCH = `${NAMESPACE}/FETCH`;
const LOAD = `${NAMESPACE}/LOAD`;

export const siteTreeFetch = () => ({ type: FETCH });
export const siteTreeLoad = (payload) => ({ type: LOAD, payload });

const initialState = {
  data: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: return state;
  }
}

const siteTreeFetcher = () => ajax('/sitetree');

function* siteTreeFetchSaga() {
  try {
    const response = yield call(siteTreeFetcher);
    yield put(siteTreeLoad(response))
  } catch(e) {

  }
}

export function* siteTreeSaga() {
  yield takeEvery(FETCH, siteTreeFetchSaga);
}
