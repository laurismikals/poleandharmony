import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddConnected } from './Add/Add.jsx';
import { EditConnected } from './Edit/Edit.jsx';
import { TreeConnected } from './Tree/Tree.jsx';

const SiteTree = ({ payload: { action, id } }) => (
  <>
    <h1>Lapas koks</h1>
    {!action && <TreeConnected />}
    {action === 'add' && <AddConnected />}
    {action === 'edit' && <EditConnected id={id} />}
  </>
);

SiteTree.propTypes = {
  payload: PropTypes.shape().isRequired,
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(SiteTree);
