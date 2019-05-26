import React from 'react';
import PropTypes from 'prop-types';

export const Table = ({ children }) => {
  return (
    <table className="table table-striped table-bordered table-hover table-sm">
      {children}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired
};
