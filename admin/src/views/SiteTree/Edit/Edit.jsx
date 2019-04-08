import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ajax } from 'HELPERS/ajax.js';

import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';
import { siteTreeFetch } from 'REDUCERS/siteTree.js';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';

const contentTypes = [
  'articles',
  'html',
  'contacts',
  'calendar',
];

export const Edit = ({
  id, articleCategories, fetchData, isAllDataAvailable, ...restProps
}) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setArticleCategory(restProps.articleCategory);
  }, [restProps.articleCategory]);

  useEffect(() => {
    if (isAllDataAvailable) {
      setType(restProps.siteTreeItem.type);
      setName(restProps.siteTreeItem.name);
    }
  }, [restProps.siteTreeItem]);

  const submitHandler = (e) => {
    e.preventDefault();

    ajax(`/sitetree/edit/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        index: restProps.siteTreeItem.index,
        type,
        name,
        articleCategory,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const deleteSiteTreeItem = () => {
    ajax(`/sitetree/delete/${id}`, {
      method: 'POST',
    });
  };

  return isAllDataAvailable && (
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

const getSiteTreeItem = (siteTree, id) => siteTree.filter(({ _id: ID }) => ID === id)[0];
const getArticleCategory = (articleCategories, id) => (
  articleCategories.filter(item => item.siteTreeId === id)[0]?._id
);

const mapState = ({ articleCategories, siteTree }, { id }) => {
  const isAllDataAvailable = !!articleCategories.data.length && !!siteTree.data.length;

  return {
    isAllDataAvailable,
    siteTreeItem: getSiteTreeItem(siteTree.data, id),
    articleCategory: getArticleCategory(articleCategories.data, id),
  };
};

const mapDispatch = (dispatch) => ({
  fetchData: () => {
    dispatch(siteTreeFetch());
    dispatch(articleCategoriesFetch());
  },
});

export const EditConnected = connect(mapState, mapDispatch)(Edit);
