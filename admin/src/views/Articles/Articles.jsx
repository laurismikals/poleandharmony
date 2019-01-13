import React, { Fragment, useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => fetch('/articles')
    .then(res => res.json())
    .then(res => setArticles(res));

  useEffect(() => {
    getArticles();
  }, []);

  const deleteSiteTreeItem = (id) => {
    fetch(`/articles/delete/${id}`, {
      method: 'POST',
    })
      .then(() => getArticles());
  };

  return (
    <Fragment>
      <h1>Lapas koks</h1>
      {!!articles.length && (
        <ol>
          {articles.map(({ _id, title }) => (
            <li key={_id}>
              <Link
                to={`/admin/articles_edit/${_id}`}
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
        to="/admin/articles_add"
        className="btn btn-primary"
      >
        Pievienot jaunu rakstu
      </Link>
    </Fragment>
  );
};

export default Articles;
