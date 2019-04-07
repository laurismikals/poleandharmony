import React, { useState } from 'react';

import { SelectArticleCategories } from 'VIEWS/SelectArticleCategories/SelectArticleCategories.jsx';
import { ajax } from 'HELPERS/ajax.js';

export const Add = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    ajax('/articles/add', {
      method: 'POST',
      body: JSON.stringify({
        category, title, author, body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <SelectArticleCategories value={category} onChange={setCategory} />
      <label htmlFor="title">Virsraksts</label>
      <input
        className="form-control"
        type="text"
        name="title"
        id="title"
        placeholder="Virsraksts"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Autors</label>
      <input
        className="form-control"
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
      <button
        className="btn btn-primary"
        type="submit"
      >
        Saglabāt
      </button>
    </form>
  );
};
