import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RankingItem.css';

const RankingItem = ({ boxer: { _id, ranking, name } }) => {
  return (
    <Fragment>
      <Link to={`/boxer/${_id}`} style={{ textDecoration: 'none' }}>
        <div className='rankingItemContainer'>{ranking + ' ' + name}</div>
      </Link>
    </Fragment>
  );
};

RankingItem.propTypes = {
  boxer: PropTypes.object.isRequired
};

export default RankingItem;
