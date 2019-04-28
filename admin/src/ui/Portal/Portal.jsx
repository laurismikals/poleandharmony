import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { portalNode } from 'HELPERS/portalNode/portalNode.js';

export class Portal extends Component {
  el = null;

  openPortal = () => {
    if (!this.el) {
      this.el = document.createElement('div');
      portalNode.appendChild(this.el);
    }
  };

  closePortal = () => {
    if (this.el && !this.props.open) {
      portalNode.removeChild(this.el);
      this.el = null;
    }
  };

  render() {
    const { children, open } = this.props;

    if (open) { this.openPortal(); } else { this.closePortal(); }

    return this.el && createPortal(
      children,
      this.el,
    );
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};
