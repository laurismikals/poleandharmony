import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';

const DEFAULT_VALUE = '';

export const Select = ({
  articleCategories, fetchArticleCategories, value, onChange,
  isLoading, isAllDataAvailable,
}) => {
  useEffect(() => {
    fetchArticleCategories();
  }, []);

  return (
    <>
      <label htmlFor="articleCategories">
        Rakstu kategorija
      </label>
      {isLoading && 'Loading...'}
      {!isLoading && !isAllDataAvailable && (
        <>
          <br />
          No article categories found.
          <Link
            to="/articleCategories/add"
            className="btn btn-primary"
          >
            Pievienot rakstu kategoriju
          </Link>
          <br />
        </>
      )}
      {!isLoading && isAllDataAvailable && (
        <select
          className="form-control"
          id="articleCategories"
          name="articleCategory"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option disabled value={DEFAULT_VALUE}>
            Rakstu kategorija
          </option>
          {articleCategories.map(({ _id, name }) => (
            <option key={_id} value={_id}>{name}</option>
          ))}
        </select>
      )}
    </>
  );
};

Select.propTypes = {
  isAllDataAvailable: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  articleCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  fetchArticleCategories: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  value: DEFAULT_VALUE,
};


const mapState = ({ articleCategories: { data, isLoading } }) => ({
  articleCategories: data,
  isLoading,
  isAllDataAvailable: checkIfDataAvailable(data),
});
const mapDispatch = (dispatch) => ({
  fetchArticleCategories: () => dispatch(articleCategoriesFetch()),
});

export const SelectArticleCategories = connect(mapState, mapDispatch)(Select);
