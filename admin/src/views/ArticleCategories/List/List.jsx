import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';

import { Button } from 'UI/Button/Button.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';

const List = ({
  fetchArticleCategories, articleCategories, isLoading, isAllDataAvailable,
}) => {
  useEffect(() => { fetchArticleCategories(); }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && !isAllDataAvailable && 'Nav pievienota neviena rakstu kategorija'}
      {isAllDataAvailable && (
        <ol>
          {articleCategories.map(({ _id, name }) => (
            <li key={_id}>
              <Link to={`/articleCategories/edit/${_id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ol>
      )}
      <Button
        element={Link}
        to="/articleCategories/add"
        theme="primary"
      >
        Pievienot rakstu kategoriju
      </Button>
    </>
  );
};

List.propTypes = {
  articleCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchArticleCategories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
};

const mapState = ({
  articleCategories: { data, isLoading },
}) => ({
  isLoading,
  isAllDataAvailable: checkIfDataAvailable(data),
  articleCategories: data,
});

const mapDispatch = (dispatch) => ({
  fetchArticleCategories: () => dispatch(articleCategoriesFetch()),
});

export const ListConnected = connect(mapState, mapDispatch)(List);
