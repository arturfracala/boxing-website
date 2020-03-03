import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_BOXERS,
  GET_BOXER,
  ADD_BOXER,
  UPDATE_BOXER,
  BOXER_ERROR
} from './types';

// Get boxers
export const getBoxers = () => async dispatch => {
  try {
    const res = await axios.get('/api/boxers');
    dispatch({
      type: GET_BOXERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOXER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get boxer by id
export const getBoxer = id => async dispatch => {
  try {
    const res = await axios.get(`/api/boxers/${id}`);
    dispatch({
      type: GET_BOXER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOXER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add boxer
export const addBoxer = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/boxers`, formData, config);
    dispatch({
      type: ADD_BOXER,
      payload: res.data
    });

    dispatch(setAlert('Boxer Created', 'success'));

    history.push('/rankings');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BOXER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update boxer
export const updateBoxer = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(`/api/boxers`, formData, config);
    dispatch({
      type: UPDATE_BOXER,
      payload: res.data
    });

    dispatch(setAlert('Boxer Updated', 'success'));

    history.push('/rankings');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: BOXER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
