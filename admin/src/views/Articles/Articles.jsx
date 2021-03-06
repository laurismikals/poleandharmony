import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';

import { ListConnected } from './List/List.jsx';
import { AddConnected } from './Add/Add.jsx';
import { EditConnected } from './Edit/Edit.jsx';

const Articles = ({ payload: { action, id } }) => (
  <ElementSpacer column>
    <h1>Raksti</h1>
    {!action && <ListConnected />}
    {action === 'add' && <AddConnected />}
    {action === 'edit' && <EditConnected id={id} />}
  </ElementSpacer>
);

Articles.propTypes = {
  payload: PropTypes.shape().isRequired,
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(Articles);
