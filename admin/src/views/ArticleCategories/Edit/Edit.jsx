import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';

import { articleCategoriesEdit, articleCategoriesFetch, articleCategoriesDelete } from 'REDUCERS/articleCategories.js';

export const Edit = ({
  id, fetchArticleCategories, edit, deleteCategory, isLoading, isAllDataAvailable, item,
}) => {
  const [name, setName] = useState('');

  useEffect(() => { fetchArticleCategories(); }, []);

  useEffect(() => { setName(item?.name); }, [item]);

  const submitHandler = (e) => {
    e.preventDefault();
    edit({ id, body: { name } });
  };

  return (
    <>
      {isLoading && <Loading />}
      {isAllDataAvailable && (
        <form method="post" onSubmit={submitHandler}>
          <ElementSpacer column>
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
            <ElementSpacer>
              <Button type="submit" theme="primary">
                Saglabāt
              </Button>
              <Button
                type="button"
                theme="danger"
                onClick={() => deleteCategory(id)}
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
  fetchArticleCategories: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
  item: PropTypes.shape().isRequired,
};

const getItem = (data, id) => data.filter(({ _id: ID }) => ID === id)[0];

const mapState = ({ articleCategories: { data, isLoading } }, { id }) => ({
  isLoading,
  isAllDataAvailable: checkIfDataAvailable(data),
  item: getItem(data, id),
});
const mapDispatch = (dispatch) => ({
  fetchArticleCategories: () => dispatch(articleCategoriesFetch()),
  edit: (payload) => dispatch(articleCategoriesEdit(payload)),
  deleteCategory: (payload) => dispatch(articleCategoriesDelete(payload)),
});

export const EditConnected = connect(mapState, mapDispatch)(Edit);
