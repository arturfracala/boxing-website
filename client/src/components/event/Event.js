import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Bouts from './Bouts';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/event';
import './Event.css';

const Event = ({ getEvent, event: { event, loading }, auth, match }) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return (
    <Fragment>
      {loading || event === null ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <div className='eventContainer'>
            {!auth.loading &&
              auth.isAuthenticated &&
              auth.user.status === 'journalist' && (
                <Link
                  to={`/edit-event/${match.params.id}`}
                  className='editEventLink'
                >
                  Edit
                </Link>
              )}
            <div className='eventDetailsContainer'>
              <h2 style={{ marginLeft: '10px' }}>Details</h2>
              <div>Name: {event.name}</div>
              <div>Place: {event.place}</div>
              <div>Commission: {event.commission}</div>
              <div>Promoter: {event.promoter}</div>
              <div>Matchmaker: {event.matchmaker}</div>
              <div>Doctor: {event.doctor}</div>
              <div>Media: {event.media}</div>
              <div>Inspector: {event.inspector}</div>
              <div>
                Date: <Moment format='YYYY/MM/DD'>{event.date}</Moment>
              </div>
            </div>
            <div className='eventBoutsContainer'>
              <h2 style={{ textAlign: 'left', marginLeft: '10px' }}>Bouts</h2>
              <Bouts eventId={match.params.id} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvent }
)(Event);
