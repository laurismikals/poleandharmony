import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ajax } from 'HELPERS/ajax.js';
import { articleCategoriesLoad } from 'REDUCERS/articleCategories.js';

export const Select = ({
  articleCategories, loadArticleCategories, value, onChange,
}) => {
  useEffect(() => {
    ajax('/articleCategories')
      .then(res => loadArticleCategories(res));
  }, []);

  return (
    <>
      <label htmlFor="articleCategories">Rakstu kategorija</label>
      <select
        className="form-control"
        id="articleCategories"
        name="articleCategory"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {articleCategories.map(({ _id, name }) => (
          <option key={_id} value={_id}>{name}</option>
        ))}
      </select>
    </>
  );
};

const mapState = ({ articleCategories: { data } }) => ({ articleCategories: data });
const mapDispatch = (dispatch) => ({
  loadArticleCategories: (payload) => dispatch(articleCategoriesLoad(payload)),
});

export const SelectArticleCategories = connect(mapState, mapDispatch)(Select);
