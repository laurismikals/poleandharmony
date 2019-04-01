import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';

export const Select = ({
  articleCategories, fetchArticleCategories, value, onChange,
}) => {
  useEffect(() => {
    fetchArticleCategories();
  }, []);

  return (
    <>
      <label htmlFor="articleCategories">
        Rakstu kategorija
      </label>
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

Select.propTypes = {
  articleCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  fetchArticleCategories: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapState = ({ articleCategories: { data } }) => ({ articleCategories: data });
const mapDispatch = (dispatch) => ({
  fetchArticleCategories: () => dispatch(articleCategoriesFetch()),
});

export const SelectArticleCategories = connect(mapState, mapDispatch)(Select);
