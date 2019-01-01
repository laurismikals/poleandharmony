import React, { Fragment, useState, useEffect } from 'react';

const SitetreeAdd = () => {
  const [pages, setPages] = useState({});

  useEffect(() => {
    fetch('/pages')
      .then(response => response.json())
      .then(response => setPages(response))
  }, []);

  return (
    <Fragment>
      <h1>Pievienot sadaļu lapas kokam</h1>
      <form method="post" action="/sitetree/add">
        <select name="pageId">
          {Object.keys(pages).map((key, i) => (
            <option key={i} value={key}>
              {pages[key].name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          type="submit"
        >
          Saglabāt
        </button>
      </form>
    </Fragment>
  );
};

export default SitetreeAdd;
