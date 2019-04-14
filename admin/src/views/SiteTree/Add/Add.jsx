import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONTENT_TYPES } from 'CONSTANTS/contentTypes.js';

import { siteTreeAdd } from 'REDUCERS/siteTree.js';

import { SelectContentTypes } from '../SelectContentTypes/SelectContentTypes.jsx';

export const Add = ({ addSiteTree }) => {
  const [type, setType] = useState(CONTENT_TYPES.ARTICLES);
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    addSiteTree({ type, name });
  };

  return (
    <form method="post" onSubmit={submitHandler}>
      <SelectContentTypes
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <label htmlFor="name">Nosaukums</label>
      <input
        className="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="Nosaukums"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn btn-primary"
        type="submit"
      >
        Saglabāt
      </button>
    </form>
  );
};

Add.propTypes = {
  addSiteTree: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  addSiteTree: (payload) => dispatch(siteTreeAdd(payload)),
});

export const AddConnected = connect(undefined, mapDispatch)(Add);
