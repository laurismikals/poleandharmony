import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './Toast.css';

export const Progress = memo(({ isRunning, time, onEnd }) => (
  <div
    className="toast__progress"
    style={{
      animationDuration: `${time}ms`,
      animationPlayState: isRunning ? 'running' : 'paused',
    }}
    onAnimationEnd={onEnd}
  />
));

Progress.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
};
