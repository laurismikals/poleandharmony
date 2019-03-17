import React, { useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

import { ajax } from 'ASSETS/js/helpers/ajax.js';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => ajax('/articles')
    .then(res => setArticles(res));

  useEffect(() => { getArticles(); }, []);

  const deleteSiteTreeItem = (id) => {
    ajax(`/articles/delete/${id}`, { method: 'POST' })
      .then(() => getArticles());
  };

  return (
    <>
      <h1>Raksti</h1>
      {!!articles.length && (
        <ol>
          {articles.map(({ _id, title }) => (
            <li key={_id}>
              <Link
                to={`/articles_edit/${_id}`}
              >
                {title}
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteSiteTreeItem(_id)}
              >
                Izdzēst
              </button>
            </li>
          ))}
        </ol>
      )}
      <Link
        to="/articles_add"
        className="btn btn-primary"
      >
        Pievienot jaunu rakstu
      </Link>
    </>
  );
};

export default Articles;
