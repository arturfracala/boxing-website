import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getBoxers } from '../../actions/boxer';
import { connect } from 'react-redux';
import RankingItem from './RankingItem';
import './RankingList.css';

const RankingList = ({ type, boxer: { boxers } }) => {
  useEffect(() => {
    getBoxers();
  }, []);

  const compare = (a, b) => {
    if (a.ranking < b.ranking) {
      return -1;
    }
    if (a.ranking > b.ranking) {
      return 1;
    }
    return 0;
  };

  boxers = boxers.sort(compare);

  return (
    <div className='rankingListContainer'>
      <h2>{type}</h2>
      {boxers.map(
        boxer =>
          boxer.division === type &&
          boxer.ranking <= 5 && (
            <RankingItem key={boxer._id} boxer={boxer} id={boxer._id} />
          )
      )}
    </div>
  );
};

RankingList.propTypes = {
  boxer: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  boxer: state.boxer
});

export default connect(
  mapStateToProps,
  null
)(RankingList);
