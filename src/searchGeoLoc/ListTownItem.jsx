import React from 'react';
import PropTypes from 'prop-types';

const ListTownItem = ({town, region, selectTownItem}) => {
  const fullTownName = `${town}, ${region}`;
  
  return (
    <span className="list-group-item list-group-item-action" onClick={selectTownItem.bind(null, fullTownName)}>{fullTownName}</span>
  );
};

ListTownItem.propTypes = {
  town: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  selectTownItem: PropTypes.func.isRequired
};

export default ListTownItem;