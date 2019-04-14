import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'redux-first-router-link';

export const Button = ({
  theme, element: Element, children, ...restProps
}) => (
  <Element
    {...restProps}
    className={classNames('btn', `btn-${theme}`)}
  >
    {children}
  </Element>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['default', 'primary', 'danger']),
  element: PropTypes.oneOf(['button', 'a', Link]),
};

Button.defaultProps = {
  theme: 'default',
  element: 'button',
};
