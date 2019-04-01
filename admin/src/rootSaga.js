import { all } from 'redux-saga/effects';

import { articleCategoriesSaga } from 'REDUCERS/articleCategories.js';
import { siteTreeSaga } from 'REDUCERS/siteTree.js';

export default function* rootSaga() {
  yield all([
    articleCategoriesSaga(),
    siteTreeSaga(),
  ]);
}
