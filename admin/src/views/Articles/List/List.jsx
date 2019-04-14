import React, { useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

import { ajax } from 'ASSETS/js/helpers/ajax.js';

import { Button } from 'UI/Button/Button.jsx';

export const List = () => {
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
      {!!articles.length && (
        <ol>
          {articles.map(({ _id, title }) => (
            <li key={_id}>
              <Link
                to={`/articles/edi/${_id}`}
              >
                {title}
              </Link>
              <Button
                type="button"
                theme="danger"
                onClick={() => deleteSiteTreeItem(_id)}
              >
                Izdzēst
              </Button>
            </li>
          ))}
        </ol>
      )}
      <Button
        element={Link}
        to="/articles/add"
        theme="primary"
      >
        Pievienot jaunu rakstu
      </Button>
    </>
  );
};
