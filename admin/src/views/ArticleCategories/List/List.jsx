import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { ajax } from 'HELPERS/ajax.js';
import { articleCategoriesLoad } from 'REDUCERS/articleCategories.js';

import { Button } from 'UI/Button/Button.jsx';

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
