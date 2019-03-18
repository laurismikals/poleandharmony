import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ajax } from 'HELPERS/ajax.js';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';

const contentTypes = [
  'articles',
  'html',
  'contacts',
  'calendar',
];

export const Edit = ({ id }) => {
  const [page, setPage] = useState(null);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');

  useEffect(() => {
    ajax(`/sitetree/${id}`)
      .then(res => setPage(res));
  }, []);

  useEffect(() => {
    if (page) {
      setType(page.type);
      setName(page.name);
    }
  }, [page]);

  const submitHandler = (e) => {
    e.preventDefault();

    ajax(`/sitetree/edit/${id}`, {
      method: 'POST',
      body: JSON.stringify({ index: page.index, type, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => console.log('res', res));

    if (type === 'articles') {
      ajax(`/articleCategories/edit/${articleCategory}`, {
        method: 'POST',
        body: JSON.stringify({ siteTreeId: id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => console.log(res));
    }
  };

  const deleteSiteTreeItem = () => {
    ajax(`/sitetree/delete/${id}`, {
      method: 'POST',
    })
      .then(res => console.log('res', res));
  };

  return page && (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="contentType">Satura tips</label>
      <select
        className="form-control"
        name="type"
        id="contentType"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        {contentTypes.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <label htmlFor="name">Nosaukums</label>
      <input
        className="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="Nosaukums"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {type === 'articles' && (
        <SelectArticleCategories
          value={articleCategory}
          onChange={setArticleCategory}
        />
      )}
      <button
        className="btn btn-primary"
        type="submit"
      >
        Saglabāt
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => deleteSiteTreeItem(id)}
      >
        Izdzēst
      </button>
    </form>
  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
