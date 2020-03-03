import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_EVENT,
  EVENT_ERROR,
  GET_EVENTS,
  GET_EVENT,
  UPDATE_EVENT
} from './types';

// Get events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events');
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get event by id
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event
export const addEvent = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/events`, formData, config);
    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Events Created', 'success'));

    history.push('/events');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update boxer
export const updateEvent = (formData, history, id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/events/${id}`, formData, config);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Updated', 'success'));

    history.push(`/event/${id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
