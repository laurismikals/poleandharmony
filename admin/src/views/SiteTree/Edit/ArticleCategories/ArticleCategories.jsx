import React, { useEffect, useState } from 'react';

import { ajax } from 'HELPERS/ajax.js';

export const ArticleCategories = () => {
  const [articleCategories, setArticleCategories] = useState([]);

  useEffect(() => {
    ajax('/article-categories')
      .then(res => setArticleCategories(res));
  }, []);

  return articleCategories && (
    <>
      <label htmlFor="articleCategories">Rakstu kategorija</label>
      <select
        className="form-control"
        id="articleCategories"
        name="articleCategory"
      >
        {articleCategories.map(({ _id, category }) => (
          <option key={_id} value={_id}>{category}</option>
        ))}
      </select>
    </>
  );
};
