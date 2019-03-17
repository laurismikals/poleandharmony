import React, { useState } from 'react';

import { ArticleCategories } from './ArticleCategories/ArticleCategories.jsx';

const contentTypes = [
  { name: 'articles' },
  { name: 'text' },
  { name: 'contacts' },
  { name: 'calendar' },
];

export const Add = () => {
  const [contentType, setContentTypes] = useState('articles');

  return (
    <form method="post" action="/sitetree/add">
      <label htmlFor="contentType">Satura tips</label>
      <select
        className="form-control"
        name="type"
        id="contentType"
        value={contentType}
        onChange={e => setContentTypes(e.target.value)}
      >
        {contentTypes.map(({ name }) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <label htmlFor="name">Nosaukums</label>
      <input
        className="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="Nosaukums"
      />
      {contentType === 'articles' && <ArticleCategories />}
      <button
        className="btn btn-primary"
        type="submit"
      >
        Saglabāt
      </button>
    </form>
  );
};
