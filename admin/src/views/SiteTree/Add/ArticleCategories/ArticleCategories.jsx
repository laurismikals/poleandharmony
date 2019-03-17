import React, { useEffect, useState } from 'react';

export const ArticleCategories = () => {
  const [articleCategories, setArticleCategories] = useState([]);

  useEffect(() => {
    const getArticleCategories = () => fetch(`//api.${process.env.DOMAIN}/article-categories`)
      .then(res => res.json())
      .then(res => setArticleCategories(res));

    getArticleCategories();
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
