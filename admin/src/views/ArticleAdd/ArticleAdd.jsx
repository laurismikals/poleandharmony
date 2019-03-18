import React, { useEffect, useState } from 'react';

const ArticleAdd = () => {
  const [articleCategories, setArticleCategories] = useState([]);

  useEffect(() => {
    const getArticleCategories = () => fetch(`//api.${process.env.DOMAIN}/articleCategories`)
      .then(res => res.json())
      .then(res => setArticleCategories(res));

    getArticleCategories();
  }, []);

  return (
    <>
      <h1>Pievienot rakstu</h1>
      <form method="post" action="/articles/add">
        {articleCategories && (
          <>
            <label htmlFor="articleCategories">Rakstu kategorija</label>
            <select
              className="form-control"
              id="articleCategories"
              name="category"
            >
              {articleCategories.map(({ _id, category }) => (
                <option key={_id} value={_id}>{category}</option>
              ))}
            </select>
          </>
        )}
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Virsraksts"
        />
        <input
          className="form-control"
          type="text"
          name="author"
          placeholder="Autors"
        />
        <textarea
          className="form-control"
          name="body"
          placeholder="Teksts"
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Saglabāt
        </button>
      </form>
      <form method="post" action="/articleCategories/add">
        <input
          className="form-control"
          type="text"
          name="category"
          placeholder="Pievienot jaunu kategoriju"
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Pievienot
        </button>
      </form>
    </>
  );
};

export default ArticleAdd;
