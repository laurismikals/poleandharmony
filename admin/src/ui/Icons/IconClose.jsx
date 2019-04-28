import React from 'react';

import { Enhancer } from './Enhancer.jsx';

export const IconClose = Enhancer((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
    <path d="M30 3L27 0L15 12L3 0L0 3L12 15L0 27L3 30L15 18L27 30L30 27L18 15L30 3Z" />
  </svg>
));

IconClose.displayName = 'IconClose';
