import axios from 'axios';
import { setAlert } from './alert';
import { ADD_BOUT, BOUT_ERROR, GET_BOUTS, GET_BOUT } from './types';

// Add bout
export const addBout = (formData, eventId, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/bouts`, formData, config);
    dispatch({
      type: ADD_BOUT,
      payload: res.data
    });

    dispatch(setAlert('Bout Created', 'success'));

    history.push(`/event/${eventId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Bouts
export const getBouts = () => async dispatch => {
  try {
    const res = await axios.get('/api/bouts');
    dispatch({
      type: GET_BOUTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get bout by id
export const getBout = id => async dispatch => {
  try {
    const res = await axios.get(`/api/bouts/${id}`);
    dispatch({
      type: GET_BOUT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
