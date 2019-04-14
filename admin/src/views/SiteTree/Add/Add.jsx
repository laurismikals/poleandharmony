import React, { useState } from 'react';
import { ajax } from 'HELPERS/ajax.js';

import { CONTENT_TYPES, CONTENT_TYPES_ARRAY } from 'CONSTANTS/contentTypes.js';

export const Add = () => {
  const [type, setType] = useState(CONTENT_TYPES.ARTICLES);
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    ajax('/sitetree/add', {
      method: 'POST',
      body: JSON.stringify({ type, name }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="contentType">Satura tips</label>
      <select
        className="form-control"
        name="type"
        id="contentType"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        {CONTENT_TYPES_ARRAY.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <label htmlFor="name">Nosaukums</label>
      <input
        className="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="Nosaukums"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
