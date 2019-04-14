import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';

import { articlesAdd } from 'REDUCERS/articles.js';

export const Add = ({ add }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    add({ category, title, author, body });
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <SelectArticleCategories value={category} onChange={setCategory} />
      <label htmlFor="title">Virsraksts</label>
      <InputText
        type="text"
        name="title"
        id="title"
        placeholder="Virsraksts"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Autors</label>
      <InputText
        type="text"
        name="author"
        id="author"
        placeholder="Autors"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="body">Teksts</label>
      <textarea
        className="form-control"
        name="body"
        id="body"
        placeholder="Teksts"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button type="submit" theme="primary">
        Saglabāt
      </Button>
    </form>
  );
};

Add.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  add: (payload) => dispatch(articlesAdd(payload)),
});

export const AddConnected = connect(undefined, mapDispatch)(Add);
