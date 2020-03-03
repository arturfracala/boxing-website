import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { getEvent, updateEvent } from '../../actions/event';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';

const EditEvent = ({
  getEvent,
  updateEvent,
  history,
  event: { event, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  const url = match.params.id;

  const [formData, setFromData] = useState({
    name: event.name,
    place: event.place,
    commission: event.commission,
    promoter: event.promoter,
    matchmaker: event.matchmaker,
    doctor: event.doctor,
    media: event.media,
    inspector: event.inspector,
    date: event.date
  });

  if (
    auth.loading ||
    !auth.isAuthenticated ||
    auth.user === null ||
    auth.user.status !== 'journalist'
  )
    return <Redirect to='/dashboard' />;

  const {
    name,
    place,
    commission,
    promoter,
    matchmaker,
    doctor,
    media,
    inspector,
    date
  } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    setFromData({ ...formData });

    updateEvent(formData, history, match.params.id);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='addEventContainer'>
          <h1 className='addEventMainHeader'>Edit Event</h1>

          <Link to='/events' className='addEventLink'>
            Go Back
          </Link>

          <Link
            to={{
              pathname: '/add-bout',
              eventId: url
            }}
            className='addEventLink'
          >
            Add Bout
          </Link>

          <form onSubmit={e => onSubmit(e)}>
            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Name:</h2>
              <input
                className='createEventInput'
                name='name'
                type='text'
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Place:</h2>
              <input
                className='createEventInput'
                name='place'
                type='text'
                value={place}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Commission:</h2>
              <input
                className='createEventInput'
                name='commission'
                type='text'
                value={commission}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Promoter:</h2>
              <input
                className='createEventInput'
                name='promoter'
                type='text'
                value={promoter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Matchmaker:</h2>
              <input
                className='createEventInput'
                name='matchmaker'
                type='text'
                value={matchmaker}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Doctor:</h2>
              <input
                className='createEventInput'
                name='doctor'
                type='text'
                value={doctor}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Media:</h2>
              <input
                className='createEventInput'
                name='media'
                type='text'
                value={media}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Inspector:</h2>
              <input
                className='createEventInput'
                name='inspector'
                type='text'
                value={inspector}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventInputContainer'>
              <h2 className='createEventHeader'>Date:</h2>
              <input
                className='createEventInput'
                name='date'
                type='date'
                value={date}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='addEventSubmitInputContainer'>
              <input
                className='addEventSubmitInput'
                type='submit'
                value='SUBMIT'
              />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

EditEvent.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  updateEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(
  mapStateToProps,
  { getEvent, updateEvent }
)(EditEvent);
