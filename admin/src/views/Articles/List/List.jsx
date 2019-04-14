import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { Button } from 'UI/Button/Button.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';

import { articlesFetch, articlesDelete } from 'REDUCERS/articles.js';

export const List = ({
  getArticle, deleteArticle, articles, isLoading, isAllDataAvailable,
}) => {
  useEffect(() => { getArticle(); }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && !isAllDataAvailable && 'Nav pievienots neviens raksts'}
      {isAllDataAvailable && (
        <ol>
          {articles.map(({ _id, title }) => (
            <li key={_id}>
              <Link
                to={`/articles/edit/${_id}`}
              >
                {title}
              </Link>
              <Button
                type="button"
                theme="danger"
                onClick={() => deleteArticle(_id)}
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

List.propTypes = {
  getArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
};

const mapState = ({ articles: { data, isLoading } }) => ({
  articles: data,
  isLoading,
  isAllDataAvailable: checkIfDataAvailable(data),
});

const mapDispatch = (dispatch) => ({
  getArticle: () => dispatch(articlesFetch()),
  deleteArticle: (payload) => dispatch(articlesDelete(payload)),
});

export const ListConnected = connect(mapState, mapDispatch)(List);
