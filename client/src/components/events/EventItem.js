import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import './EventItem.css';

const EventItem = ({ name, date, id }) => {
  return (
    <Link to={`/event/${id}`} className='eventItemContainer'>
      {name} <Moment format='YYYY/MM/DD'>{date}</Moment>
    </Link>
  );
};

EventItem.propTypes = {
  name: PropTypes.string.isRequired
};

export default EventItem;
