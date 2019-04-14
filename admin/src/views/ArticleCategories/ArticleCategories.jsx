import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListConnected } from './List/List.jsx';
import { AddConnected } from './Add/Add.jsx';
import { EditConnected } from './Edit/Edit.jsx';

const ArticleCategories = ({ payload: { action, id } }) => (
  <>
    <h1>Rakstu kategorijas</h1>
    {!action && <ListConnected />}
    {action === 'add' && <AddConnected />}
    {action === 'edit' && <EditConnected id={id} />}
  </>
);
ArticleCategories.propTypes = {
  payload: PropTypes.shape().isRequired,
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(ArticleCategories);
