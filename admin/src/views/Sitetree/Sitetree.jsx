import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { Add } from './Add/Add.jsx';
import { Edit } from './Edit/Edit.jsx';
import { Tree } from './Tree/Tree.jsx';

const SiteTree = ({ payload: { action, id } }) => {
  console.log('action', action);
  return (
    <>
      <h1>Lapas koks</h1>
      {!action && (
        <>
          <Tree />
          <Link
            to="/sitetree/add"
            className="btn btn-primary"
          >
            Pievienot sadaļu lapas kokam
          </Link>
        </>
      )}
      {action === 'add' && <Add />}
      {action === 'edit' && <Edit id={id} />}
    </>
  );
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(SiteTree);
