import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';

import { articleCategoriesAdd } from 'REDUCERS/articleCategories.js';

export const Add = ({ addArticleCategories }) => {
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    addArticleCategories({ name });
  };

  return (
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
        <Button type="submit" theme="primary">
          Saglabāt
        </Button>
      </ElementSpacer>
    </form>
  );
};

Add.propTypes = {
  addArticleCategories: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  addArticleCategories: (payload) => dispatch(articleCategoriesAdd(payload)),
});

export const AddConnected = connect(undefined, mapDispatch)(Add);
