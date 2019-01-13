import React from 'react';

const articleCategories = [
  { value: 0, name: 'Treniņi' },
  { value: 1, name: 'Jaunumi' },
  { value: 2, name: 'Aktualitātes' },
];

export const ArticleCategories = () => (
  <>
    <label htmlFor="articleCategories">Rakstu kategorijas</label>
    <select
      className="form-control"
      id="articleCategories"
      name="articleCategory"
    >
      <option value="Rakstu kategorijas" disabled>Rakstu kategorijas</option>
      {articleCategories.map(({ value, name }) => (
        <option key={value} value={value}>{name}</option>
      ))}
    </select>
  </>
);
