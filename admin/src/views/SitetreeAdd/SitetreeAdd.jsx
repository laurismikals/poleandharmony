import React, { Fragment } from 'react';

const contentTypes = [
  { name: 'articles' },
  { name: 'text' },
  { name: 'contacts' },
  { name: 'calendar' },
];


const SitetreeAdd = () => (
  <Fragment>
    <h1>Pievienot sadaļu lapas kokam</h1>
    <form method="post" action="/sitetree/add">
      <select
        className="form-control"
        name="type"
      >
        <option value="Satura tips" disabled>Satura tips</option>
        {contentTypes.map(({ name }) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Nosaukums"
      />
      <button
        className="btn btn-primary"
        type="submit"
      >
        Saglabāt
      </button>
    </form>
  </Fragment>
);

export default SitetreeAdd;
