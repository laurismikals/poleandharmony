import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';

import { checkIfDataAvailable } from 'HELPERS/checkIfDataAvailable.js';

import { Button } from 'UI/Button/Button.jsx';
import { Loading } from 'UI/Loading/Loading.jsx';
import { ElementSpacer } from 'UI/ElementSpacer/ElementSpacer.jsx';

import { siteTreeFetch } from 'REDUCERS/siteTree.js';

export const Tree = ({
  fetchData, siteTree, isAllDataAvailable, isLoading,
}) => {
  useEffect(() => { fetchData(); }, []);

  return (
    <ElementSpacer column>
      {isLoading && <Loading />}
      {isAllDataAvailable && (
        <ol>
          {siteTree.map(({ _id, name }) => (
            <li key={_id}>
              <Link to={`/sitetree/edit/${_id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ol>
      )}
      <Button
        element={Link}
        to="/sitetree/add"
        theme="primary"
      >
        Pievienot sadaļu lapas kokam
      </Button>
    </ElementSpacer>
  );
};

Tree.propTypes = {
  fetchData: PropTypes.func.isRequired,
  isAllDataAvailable: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  siteTree: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapState = ({ siteTree: { data, isLoading } }) => ({
  siteTree: data,
  isAllDataAvailable: checkIfDataAvailable(data),
  isLoading,
});
const mapDispatch = (dispatch) => ({
  fetchData: () => dispatch(siteTreeFetch()),
});

export const TreeConnected = connect(mapState, mapDispatch)(Tree);
