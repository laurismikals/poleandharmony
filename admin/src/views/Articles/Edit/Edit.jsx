import React from 'react';
import PropTypes from 'prop-types';

export const Edit = ({ id }) => (<div>{id}</div>);

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
