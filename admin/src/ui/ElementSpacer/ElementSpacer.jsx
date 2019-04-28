import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ElementSpacer.css';

export const ElementSpacer = ({
  children,
  horizontalSpace,
  verticalSpace,
  noWrap,
  spaceBetween,
  alignCenter,
  alignEnd,
  column,
  isInsideText,
}) => {
  const halfHorizontalSpace = horizontalSpace / 2;
  const halfVerticalSpace = verticalSpace / 2;
  const Element = isInsideText ? 'span' : 'div';

  return (
    <Element
      className={classNames(
        'elementSpacer',
        { 'elementSpacer--noWrap': noWrap },
        { 'elementSpacer--spaceBetween': spaceBetween },
        { 'elementSpacer--alignCenter': alignCenter },
        { 'elementSpacer--alignEnd': alignEnd },
        { 'elementSpacer--column': column }
      )}
      style={{
        marginTop: -halfVerticalSpace,
        marginBottom: -halfVerticalSpace,
        marginRight: -halfHorizontalSpace,
        marginLeft: -halfHorizontalSpace,
      }}
    >
      {Children.map(children, child => child && (
        <Element
          key={child.key}
          className="elementSpacer__item"
          style={{
            marginTop: halfVerticalSpace,
            marginBottom: halfVerticalSpace,
            marginRight: halfHorizontalSpace,
            marginLeft: halfHorizontalSpace,
          }}
        >
          {child}
        </Element>
      ))}
    </Element>
  );
};

ElementSpacer.propTypes = {
  horizontalSpace: PropTypes.number,
  verticalSpace: PropTypes.number,
  children: PropTypes.node.isRequired,
  noWrap: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignEnd: PropTypes.bool,
  column: PropTypes.bool,
  isInsideText: PropTypes.bool,
};

ElementSpacer.defaultProps = {
  horizontalSpace: 12,
  verticalSpace: 12,
  noWrap: false,
  spaceBetween: false,
  alignCenter: false,
  alignEnd: false,
  column: false,
  isInsideText: false,
};
