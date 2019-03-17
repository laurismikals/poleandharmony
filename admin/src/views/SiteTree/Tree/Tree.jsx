import React, { useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

export const Tree = () => {
  const [siteTree, setSiteTree] = useState([]);

  const getSiteTree = () => fetch(`//api.${process.env.DOMAIN}/sitetree`)
    .then(res => res.json())
    .then(res => setSiteTree(res));

  useEffect(() => {
    getSiteTree();
  }, []);

  const deleteSiteTreeItem = (id) => {
    fetch(`//api.${process.env.DOMAIN}/sitetree/delete/${id}`, {
      method: 'POST',
    })
      .then(() => getSiteTree());
  };

  return (
    <>
      {!!siteTree.length && (
        <ol>
          {siteTree.map(({ _id, name }) => (
            <li key={_id}>
              <Link to={`/sitetree/edit/${_id}`}>
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
        to="/sitetree/add"
        className="btn btn-primary"
      >
        Pievienot sadaļu lapas kokam
      </Link>
    </>
  );
};
