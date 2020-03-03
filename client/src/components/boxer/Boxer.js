import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getBoxer } from '../../actions/boxer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BoutsList from './BoutsList';
import './Boxer.css';

const Boxer = ({ getBoxer, boxer: { boxer, loading }, match, auth }) => {
  useEffect(() => {
    getBoxer(match.params.id);
  }, [getBoxer, match.params.id]);
  return (
    <Fragment>
      {loading || boxer === null ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <div className='boxerContainer'>
          {auth.isAuthenticated && (
            <Link
              to={`/edit-boxer/${match.params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='boxerLink'>Edit</div>
            </Link>
          )}
          <div className='boxerDetailsContainer'>
            <h2 style={{ marginLeft: '10px' }}>Details</h2>
            <div>Name: {boxer.name}</div>
            <div>Alias: {boxer.alias}</div>
            <div>Country: {boxer.country}</div>
            <div>Ranking: {boxer.ranking}</div>
            <div>Height: {boxer.height}cm</div>
            <div>Reach: {boxer.reach}cm</div>
            <div>Weight: {boxer.weight}kg</div>
            <div>Association: {boxer.association}</div>
            <div>Division: {boxer.division}</div>
            <div>
              Date of birth:{' '}
              <Moment format='YYYY/MM/DD'>{boxer.date_birth}</Moment>
            </div>
          </div>
          <div className='boxerBoutsContainer'>
            <h2 style={{ marginLeft: '10px' }}>Fights record</h2>
            <BoutsList boxerId={match.params.id} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

Boxer.propTypes = {
  getBoxer: PropTypes.func.isRequired,
  boxer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boxer: state.boxer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getBoxer }
)(Boxer);
