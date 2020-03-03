import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBoxers } from '../../actions/boxer';
import { connect } from 'react-redux';
import RankingList from './RankingList';
import PropTypes from 'prop-types';
import './Rankings.css';

const Rankings = ({ getBoxers, boxer: { loading }, auth }) => {
  useEffect(() => {
    getBoxers();
  }, [getBoxers]);

  return (
    <div className='rankingContainer'>
      {!loading && auth.isAuthenticated && auth.user.status === 'journalist' && (
        <Link
          to='/add-boxer'
          style={{ textDecoration: 'none' }}
          className='rankingsLink'
        >
          Add Boxer
        </Link>
      )}

      <Link
        to='/find-boxer'
        style={{ textDecoration: 'none', width: '90px' }}
        className='rankingsLink'
      >
        Find Boxer
      </Link>
      <br />
      <h1>Rankings</h1>

      <RankingList type='Heavyweight' />
      <RankingList type='Cruiserweight' />
      <RankingList type='Light heavyweight' />
      <RankingList type='Super middleweight' />
      <RankingList type='Middleweight' />
      <RankingList type='Super welterweight' />
      <RankingList type='Welterweight' />
      <RankingList type='Super lightweight' />
      <RankingList type='Lightweight' />
      <RankingList type='Super featherweight' />
      <RankingList type='Featherweight' />
      <RankingList type='Super bantamweight' />
      <RankingList type='Bantamweight' />
      <RankingList type='Super flyweight' />
      <RankingList type='Flyweight' />
      <RankingList type='Light flyweight' />
      <RankingList type='Minimumweight' />
    </div>
  );
};

Rankings.propTypes = {
  getBoxers: PropTypes.func.isRequired,
  boxer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  boxer: state.boxer
});

export default connect(
  mapStateToProps,
  { getBoxers }
)(Rankings);
