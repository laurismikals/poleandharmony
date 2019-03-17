import React, { useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => fetch(`//api.${process.env.DOMAIN}/articles`)
    .then(res => res.json())
    .then(res => setArticles(res));

  useEffect(() => { getArticles(); }, []);

  const deleteSiteTreeItem = (id) => {
    fetch(`//api.${process.env.DOMAIN}/articles/delete/${id}`, { method: 'POST' })
      .then(() => getArticles());
  };

  return (
    <>
      <h1>Lapas koks</h1>
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
        to="/articlesAdd"
        className="btn btn-primary"
      >
        Pievienot jaunu rakstu
      </Link>
    </>
  );
};

export default Articles;
