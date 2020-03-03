import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventItem from './EventItem';
import PropTypes from 'prop-types';
import { getEvents } from '../../actions/event';
import { connect } from 'react-redux';
import './Events.css';

const Events = ({ getEvents, event: { events }, auth }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);
  return (
    <div className='eventContainer'>
      {!auth.loading &&
        auth.isAuthenticated &&
        auth.user.status === 'journalist' && (
          <Link to='/add-event' className='eventLink'>
            Add Event
          </Link>
        )}
      <h1>Events</h1>
      {events.map(event => (
        <EventItem
          key={event._id}
          name={event.name}
          date={event.date}
          id={event._id}
        />
      ))}
    </div>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Events);
