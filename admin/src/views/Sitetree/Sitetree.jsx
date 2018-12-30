import React, { Fragment } from 'react';
import Link from 'redux-first-router-link';

const tree = {
  0: {
    id: 0,
    contentType: 'articles',
    contentTypeId: 0,
  },
};

const contentTypes = {
  0: {
    id: 0,
    name: 'Raksti',
    articlesCategories: ['Raksti'],
  },
};

const Sitetree = () => (
  <Fragment>
    <h1>Lapas koks</h1>
    <ol>
      {Object.keys(tree).map(key => (
        <li key={key}>
          <Link to={`/admin/contenttype/edit/${contentTypes[key].id}`}>
            {contentTypes[key].name}
          </Link>
        </li>
      ))}
    </ol>
    <Link
      to="/admin/sitetree_add"
      className="btn btn-primary"
    >
      Pievienot sadaļu
    </Link>
  </Fragment>
);

export default Sitetree;
