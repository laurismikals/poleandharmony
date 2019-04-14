import React from 'react';
import PropTypes from 'prop-types';

import { CONTENT_TYPES_ARRAY } from 'CONSTANTS/contentTypes.js';

const DEFAULT_VALUE = '';

export const SelectContentTypes = ({ onChange, value }) => (
  <>
    <label htmlFor="contentType">Satura tips</label>
    <select
      className="form-control"
      name="type"
      id="contentType"
      value={value}
      onChange={onChange}
    >
      <option disabled value={DEFAULT_VALUE}>
        Satura tips
      </option>
      {CONTENT_TYPES_ARRAY.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  </>
);

SelectContentTypes.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(['', ...CONTENT_TYPES_ARRAY]),
};

SelectContentTypes.defaultProps = {
  value: DEFAULT_VALUE,
};
