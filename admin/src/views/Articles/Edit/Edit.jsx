import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { push } from 'redux-first-router';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';

import { articlesEdit, articlesFetch } from 'REDUCERS/articles.js';

import './Edit.css';

export const Edit = ({
  id, fetchArticles, edit, isLoading, isAllDataAvailable, item,
}) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => { fetchArticles(); }, []);

  useEffect(() => {
    setCategory(item?.category);
    setTitle(item?.title);
    setAuthor(item?.author);
    setBody(item?.body);
  }, [item]);

  const submitHandler = (e) => {
    e.preventDefault();
    edit({
      id, category, title, author, body,
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      {isAllDataAvailable && (
        <form method="post" onSubmit={submitHandler}>
          <ElementSpacer column>
            <SelectArticleCategories value={category} onChange={setCategory} />
            <>
              <label htmlFor="title">Virsraksts</label>
              <InputText
                type="text"
                name="title"
                id="title"
                placeholder="Virsraksts"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </>
            <>
              <label htmlFor="author">Autors</label>
              <InputText
                type="text"
                name="author"
                id="author"
                placeholder="Autors"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </>
            <>
              <label htmlFor="body">Teksts</label>
              <CKEditor
                editor={ClassicEditor}
                data={body}
                onChange={(event, editor) => setBody(editor.getData())}
              />
            </>
            <ElementSpacer>
              <Button type="submit" theme="primary">
                Saglabāt
              </Button>
              <Button
                type="button"
                onClick={() => push('/articles')}
              >
                Atcelt
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
  fetchArticles: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
  item: PropTypes.shape(),
};

Edit.defaultProps = {
  item: {},
};

const getItem = (data, id) => data.filter(({ _id: ID }) => ID === id)[0];

const mapState = ({ articles: { data, isLoading } }, { id }) => ({
  isLoading,
  isAllDataAvailable: checkIfDataAvailable(data),
  item: getItem(data, id),
});

const mapDispatch = (dispatch) => ({
  fetchArticles: () => dispatch(articlesFetch()),
  edit: (payload) => dispatch(articlesEdit(payload)),
});

export const EditConnected = connect(mapState, mapDispatch)(Edit);
