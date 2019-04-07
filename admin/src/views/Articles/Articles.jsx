import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List } from './List/List.jsx';
import { Add } from './Add/Add.jsx';

const Articles = ({ payload: { action, id } }) => {
  return (
    <>
      <h1>Raksti</h1>
      {!action && <List />}
      {action === 'add' && <Add />}
    </>
  );
};

Articles.propTypes = {
  payload: PropTypes.shape().isRequired,
};

const mapState = ({ location: { payload } }) => ({ payload });

export default connect(mapState)(Articles);
