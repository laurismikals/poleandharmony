import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { ajax } from 'HELPERS/ajax.js';
import { articleCategoriesLoad } from 'REDUCERS/articleCategories.js';

const List = ({
  loadArticleCategories, articleCategories,
}) => {
  useEffect(() => {
    ajax('/articleCategories')
      .then(res => loadArticleCategories(res));
  }, []);

  return (
    <>
      <ol>
        {articleCategories.map(({ _id, name }) => (
          <li key={_id}>{name}</li>
        ))}
      </ol>
      <Link
        to="/articleCategories/add"
        className="btn btn-primary"
      >
        Pievienot rakstu kategoriju
      </Link>
    </>
  );
};

List.propTypes = {
  articleCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loadArticleCategories: PropTypes.func.isRequired,
};

const mapState = ({
  articleCategories: { data },
}) => ({
  articleCategories: data,
});

const mapDispatch = (dispatch) => ({
  loadArticleCategories: (payload) => dispatch(articleCategoriesLoad(payload)),
});

export const ListConnected = connect(mapState, mapDispatch)(List);
