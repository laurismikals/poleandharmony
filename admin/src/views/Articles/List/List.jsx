import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';
import { checkIfLoading } from 'HELPERS/checkIfLoading.js';
import { arrayToObject } from 'HELPERS/arrayToObject.js';

import { Button } from 'UI/Button/Button.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';
import { Table } from 'UI/Table/Table.jsx';

import { articlesFetch, articlesDelete } from 'REDUCERS/articles.js';
import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';

export const List = ({
  fetchArticles, fetchArticleCategories, deleteArticle,
  articles, articleCategories, isLoading, isAllDataAvailable,
}) => {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    fetchArticles();
    fetchArticleCategories();
  }, []);

  useDeepCompareEffect(() => {
    setCategories(arrayToObject('_id')(articleCategories));
  }, [articleCategories]);

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
            {articles.map(({ _id, title, category }) => (
              <tr key={_id}>
                <td>
                  <Link
                    to={`/articles/edit/${_id}`}
                  >
                    {title}
                  </Link>
                </td>
                <td>{categories[category]?.name}</td>
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
  articleCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchArticleCategories: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
};

const mapState = ({
  articles,
  articleCategories,
}) => ({
  articles: articles.data,
  articleCategories: articleCategories.data,
  isLoading: checkIfLoading(articles, articleCategories),
  isAllDataAvailable: checkIfDataAvailable(articles.data, articleCategories.data),
});

const mapDispatch = (dispatch) => ({
  fetchArticles: () => dispatch(articlesFetch()),
  deleteArticle: (payload) => dispatch(articlesDelete(payload)),
  fetchArticleCategories: () => dispatch(articleCategoriesFetch()),
});

export const ListConnected = connect(mapState, mapDispatch)(List);
