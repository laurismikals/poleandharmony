import { takeEvery, call, put } from 'redux-saga/effects';

import { ajax } from 'HELPERS/ajax.js';

const NAMESPACE = 'articleCategories';
const FETCH = `${NAMESPACE}/FETCH`;
const LOAD = `${NAMESPACE}/LOAD`;

export const articleCategoriesFetch = () => ({ type: FETCH });
export const articleCategoriesLoad = (payload) => ({ type: LOAD, payload });

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
};

const articleCategoriesFetcher = () => ajax('/articleCategories');

function* articleCategoriesFetchSaga() {
  try {
    const response = yield call(articleCategoriesFetcher);
    yield put(articleCategoriesLoad(response));
  } catch (e) {
    console.error('Error: ', e);
  }
}

export function* articleCategoriesSaga() {
  yield takeEvery(FETCH, articleCategoriesFetchSaga);
}
