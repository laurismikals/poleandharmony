import React from 'react';
import PropTypes from 'prop-types';

export const Edit = ({ id }) => (
  <>
    {id}
  </>
);

Edit.propTypes = {
  id: PropTypes.string.isRequired,
};
