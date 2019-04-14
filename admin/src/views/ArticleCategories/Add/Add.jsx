import React, { useState } from 'react';
import { ajax } from 'HELPERS/ajax.js';

import { Button } from 'UI/Button/Button.jsx';
import { InputText } from 'UI/InputText/InputText.jsx';

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
    });
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <label htmlFor="name">Nosaukums</label>
      <InputText
        type="text"
        name="name"
        id="name"
        placeholder="Nosaukums"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" theme="primary">
        Saglabāt
      </Button>
    </form>
  );
};
