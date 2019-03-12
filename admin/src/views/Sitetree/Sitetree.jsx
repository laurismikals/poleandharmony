import React, { Fragment, useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

const Sitetree = () => {
  const [siteTree, setSiteTree] = useState([]);

  const getSiteTree = () => fetch('/sitetree')
    .then(res => res.json())
    .then(res => setSiteTree(res));

  useEffect(() => {
    getSiteTree();
  }, []);

  const deleteSiteTreeItem = (id) => {
    fetch(`/sitetree/delete/${id}`, {
      method: 'POST',
    })
      .then(() => getSiteTree());
  };

  return (
    <Fragment>
      <h1>Lapas koks</h1>
      {!!siteTree.length && (
        <ol>
          {siteTree.map(({ _id, type, name }) => (
            <li key={_id}>
              <Link
                to={`/${type}/edit/${_id}`}
              >
                {name}
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteSiteTreeItem(_id)}
              >
                Izdzēst
              </button>
            </li>
          ))}
        </ol>
      )}
      <Link
        to="/sitetree_add"
        className="btn btn-primary"
      >
        Pievienot sadaļu lapas kokam
      </Link>
    </Fragment>
  );
};

export default Sitetree;
