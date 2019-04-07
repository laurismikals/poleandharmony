import React, { useState } from 'react';
import { ajax } from 'HELPERS/ajax.js';

export const Add = () => {
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    ajax('/articleCategories/add', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => console.log('red', res));
  };

  return (
    <form method="post" onSubmit={submitHandler}>
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
