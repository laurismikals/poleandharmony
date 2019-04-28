import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IconClose } from 'UI/Icons/IconClose.jsx';

import { toastTypes } from 'REDUCERS/toast.js';

import { Progress } from './Progress.jsx';

import './Toast.css';

export const Toast = ({
  message,
  type,
  onEnd,
  id,
  time,
}) => {
  const toastEl = useRef(null);
  const [isRunning, setIsRunning] = useState(true);
  const [transitionOutPlayState, setTransitionOutPlayState] = useState('paused');
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    setHeight(toastEl.current.getBoundingClientRect().height);
  }, []);

  const mouseEnterHandler = () => setIsRunning(false);
  const mouseLeaveHandler = () => setIsRunning(true);

  const endHandler = () => setTransitionOutPlayState('running');

  // setTimeout is necessary because for some kind of reason
  // onEnd runs right after Progress animation is finished
  const transitionOutHandler = () => setTimeout(() => onEnd(id), 310);

  return (
    <div
      ref={toastEl}
      style={{
        animationPlayState: transitionOutPlayState,
        height,
      }}
      className="toastContainer__scaleOut"
    >
      <div
        style={{
          animationPlayState: transitionOutPlayState,
        }}
        className={classNames('toast', `toast--${type}`)}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onAnimationEnd={transitionOutHandler}
      >
        <button
          type="button"
          className="toast__close"
          onClick={endHandler}
        >
          <IconClose />
        </button>
        <div className="toast__message">
          {message}
        </div>
        <Progress
          isRunning={isRunning}
          time={time}
          onEnd={endHandler}
        />
      </div>
    </div>
  );
};

Toast.propTypes = {
  time: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    toastTypes.SUCCESS, toastTypes.WARNING, toastTypes.ERROR, toastTypes.INFO,
  ]),
};

Toast.defaultProps = {
  type: 'success',
};
