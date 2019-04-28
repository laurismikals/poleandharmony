import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Portal } from 'UI/Portal/Portal.jsx';

import { toastDelete, TOAST_TYPES } from 'REDUCERS/toast.js';

import { Toast } from './Toast.jsx';

import './Toast.css';

export const ToastContainer = memo(({ toasts, onEndHandler }) => (
  <Portal open>
    <div className="toastContainer">
      {!!toasts.length && toasts.map(({ id, message, type }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
          time={5000}
          onEnd={onEndHandler}
        />
      ))}
    </div>
  </Portal>
));

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.keys(TOAST_TYPES).map(key => TOAST_TYPES[key])),
    message: PropTypes.node.isRequired,
  })).isRequired,
  onEndHandler: PropTypes.func.isRequired,
};

const mapState = ({ toast: { toasts } }) => ({ toasts });

const mapDispatch = dispatch => ({
  onEndHandler: id => dispatch(toastDelete(id)),
});

export const ToastContainerConnected = connect(mapState, mapDispatch)(ToastContainer);
