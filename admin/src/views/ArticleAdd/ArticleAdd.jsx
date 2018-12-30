import React, { Fragment } from 'react';

const ArticleAdd = () => (
  <Fragment>
    <h1>Pievienot rakstu</h1>
    <form method="post" action="/articles/add">
      <input
        className="form-control"
        type="text"
        name="title"
        placeholder="Virsraksts"
      />
      <input
        className="form-control"
        type="text"
        name="author"
        placeholder="Autors"
      />
      <textarea
        className="form-control"
        name="body"
        placeholder="Teksts"
      />
      <button
        className="btn btn-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
  </Fragment>
);

export default ArticleAdd;
