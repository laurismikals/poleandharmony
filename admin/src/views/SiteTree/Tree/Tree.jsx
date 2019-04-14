import React, { useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

import { Button } from 'UI/Button/Button.jsx';

export const Tree = () => {
  const [siteTree, setSiteTree] = useState([]);

  const getSiteTree = () => fetch(`//api.${process.env.DOMAIN}/sitetree`)
    .then(res => res.json())
    .then(res => setSiteTree(res));

  useEffect(() => {
    getSiteTree();
  }, []);

  return (
    <>
      {!!siteTree.length && (
        <ol>
          {siteTree.map(({ _id, name }) => (
            <li key={_id}>
              <Link to={`/sitetree/edit/${_id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ol>
      )}
      <Button
        element={Link}
        to="/sitetree/add"
        theme="primary"
      >
        Pievienot sadaļu lapas kokam
      </Button>
    </>
  );
};
