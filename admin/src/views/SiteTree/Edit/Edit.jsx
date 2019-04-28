import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONTENT_TYPES } from 'CONSTANTS/contentTypes.js';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { articleCategoriesFetch } from 'REDUCERS/articleCategories.js';
import { siteTreeFetch, siteTreeEdit, siteTreeDelete } from 'REDUCERS/siteTree.js';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';

import { SelectContentTypes } from '../SelectContentTypes/SelectContentTypes.jsx';

export const Edit = ({
  isAllDataAvailable, isLoading, id,
  fetchData, editSiteTree, deleteSiteTree, ...restProps
}) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [articleCategory, setArticleCategory] = useState('');

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    setType(restProps.siteTreeItem?.type || '');
    setName(restProps.siteTreeItem?.name || '');
  }, [restProps.siteTreeItem]);

  useEffect(() => {
    if (type === CONTENT_TYPES.ARTICLES && restProps.articleCategory) {
      setArticleCategory(restProps.articleCategory);
    }
  }, [type, restProps.articleCategory]);

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      index: restProps.siteTreeItem.index,
      type,
      name,
    };

    if (type === CONTENT_TYPES.ARTICLES) {
      body = {
        ...body,
        articleCategory,
      };
    }

    editSiteTree({ id, body });
  };

  return (
    <>
      {isLoading && <Loading />}
      {isAllDataAvailable && !isLoading && (
        <form method="post" onSubmit={submitHandler}>
          <ElementSpacer column>
            <SelectContentTypes
              value={type}
              onChange={e => setType(e.target.value)}
            />
            <>
              <label htmlFor="name">Nosaukums</label>
              <InputText
                type="text"
                name="name"
                id="name"
                placeholder="Nosaukums"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
            {type === CONTENT_TYPES.ARTICLES && (
              <SelectArticleCategories
                value={articleCategory}
                onChange={setArticleCategory}
              />
            )}
            <ElementSpacer>
              <Button type="submit" theme="primary">
                Saglabāt
              </Button>
              <Button
                type="button"
                theme="danger"
                onClick={() => deleteSiteTree(id)}
              >
                Izdzēst
              </Button>
            </ElementSpacer>
          </ElementSpacer>
        </form>
      )}
    </>
  );
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  editSiteTree: PropTypes.func.isRequired,
  deleteSiteTree: PropTypes.func.isRequired,
};

const getSiteTreeItem = (siteTree, id) => siteTree.filter(({ _id: ID }) => ID === id)[0];
const getArticleCategory = (articleCategories, id) => (
  articleCategories.filter(item => item.siteTreeId === id)[0]?._id
);

const mapState = ({ articleCategories, siteTree }, { id }) => {
  const isAllDataAvailable = checkIfDataAvailable(siteTree.data);
  return {
    isLoading: siteTree.isLoading,
    isAllDataAvailable,
    siteTreeItem: isAllDataAvailable && getSiteTreeItem(siteTree.data, id),
    articleCategory: isAllDataAvailable && getArticleCategory(articleCategories.data, id),
  };
};

const mapDispatch = (dispatch) => ({
  fetchData: () => {
    dispatch(siteTreeFetch());
    dispatch(articleCategoriesFetch());
  },
  editSiteTree: (payload) => dispatch(siteTreeEdit(payload)),
  deleteSiteTree: (payload) => dispatch(siteTreeDelete(payload)),
});

export const EditConnected = connect(mapState, mapDispatch)(Edit);
