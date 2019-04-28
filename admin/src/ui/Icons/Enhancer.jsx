import { memo } from 'react';
import PropTypes from 'prop-types';

import style from './Icon.css';

export const Enhancer = (icon) => memo(({ size, color, ...restProps }) => icon({
  ...restProps,
  style: {
    width: `${size}px`,
    height: `${size}px`,
    fill: color,
  },
  className: style.root,
}));

Enhancer.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Enhancer.defautlProps = {
  size: 1,
  color: 'currentColor',
};
