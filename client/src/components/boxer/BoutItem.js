import React from 'react';
import PropTypes from 'prop-types';
import './BoutItem.css';

const BoutItem = ({ red_corner_name, blue_corner_name, result }) => {
  return (
    <div className='boutItemContainer'>
      {red_corner_name} vs. {blue_corner_name} - {result}
    </div>
  );
};

BoutItem.propTypes = {
  red_corner_name: PropTypes.string.isRequired,
  blue_corner_name: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired
};

export default BoutItem;
