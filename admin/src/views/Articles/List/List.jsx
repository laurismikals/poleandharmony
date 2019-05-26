import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';
import { checkIfLoading } from 'HELPERS/checkIfLoading.js';

import { Button } from 'UI/Button/Button.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';
import { Table } from 'UI/Table/Table.jsx';

import { articlesFetch, articlesDelete } from 'REDUCERS/articles.js';

export const List = ({
  fetchArticles, deleteArticle,
  articles, isLoading, isAllDataAvailable,
}) => {
  useEffect(() => { fetchArticles(); }, []);

  return (
    <ElementSpacer column>
      <Button
        element={Link}
        to="/articles/add"
        theme="primary"
      >
        Pievienot jaunu rakstu
      </Button>
      {isLoading && <Loading />}
      {!isLoading && !isAllDataAvailable && 'Nav pievienots neviens raksts'}
      {isAllDataAvailable && (
        <Table>
          <thead>
            <tr>
              <th>Virsraksts</th>
              <th>Kategorija</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {articles.map(({ _id, title, categoryInfo }) => (
              <tr key={_id}>
                <td>
                  <Link
                    to={`/articles/edit/${_id}`}
                  >
                    {title}
                  </Link>
                </td>
                <td>{categoryInfo[0].name}</td>
                <td>
                  <Button
                    type="button"
                    theme="danger"
                    onClick={() => deleteArticle(_id)}
                  >
                    Izdzēst
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </ElementSpacer>
  );
};

List.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
};

const mapState = ({
  articles,
}) => ({
  articles: articles.data,
  isLoading: checkIfLoading(articles),
  isAllDataAvailable: checkIfDataAvailable(articles.data),
});

const mapDispatch = (dispatch) => ({
  fetchArticles: () => dispatch(articlesFetch()),
  deleteArticle: (payload) => dispatch(articlesDelete(payload)),
});

export const ListConnected = connect(mapState, mapDispatch)(List);
