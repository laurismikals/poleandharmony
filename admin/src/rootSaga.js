import { all } from 'redux-saga/effects';

import { articleCategoriesSaga } from 'REDUCERS/articleCategories.js';

export default function* rootSaga() {
  yield all([
    articleCategoriesSaga(),
  ]);
}
