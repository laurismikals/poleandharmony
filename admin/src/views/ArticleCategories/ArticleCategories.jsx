import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListConnected } from './List/List.jsx';
import { Add } from './Add/Add.jsx';

const ArticleCategories = ({
  payload: { action, id }
}) => (
  <>
    <h1>Rakstu kategorijas</h1>
    {!action && <ListConnected />}
    {action === 'add' && <Add />}
  </>
);
ArticleCategories.propTypes = {
  payload: PropTypes.shape().isRequired,
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(ArticleCategories);
