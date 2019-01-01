import React, { Fragment, useState, useEffect } from 'react';
import Link from 'redux-first-router-link';

const Sitetree = () => {
  const [siteTree, setSiteTree] = useState([]);
  const [pages, setPages] = useState({});

  const getSiteTree = () => fetch('/sitetree')
    .then(res => res.json())
    .then(res => setSiteTree(res));

  useEffect(() => {
    getSiteTree();
    fetch('/pages')
      .then(res => res.json())
      .then(res => setPages(res));
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
      {!!siteTree.length && !!Object.keys(pages).length && (
        <ol>
          {siteTree.map(({ _id, pageId }, i) => (
            <li key={i}>
              <Link
                to={`/admin/${pages[pageId].type}/edit/${pageId}`}
              >
                {pages[pageId].name}
              </Link>
              <button
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
        to="/admin/page_add"
        className="btn btn-primary"
      >
        Pievienot sadaļu
      </Link>
      <Link
        to="/admin/sitetree_add"
        className="btn btn-primary"
      >
        Pievienot sadaļu lapas kokam
      </Link>
    </Fragment>
  );
};

export default Sitetree;
