import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  UPDATE_EVENT,
  EVENT_ERROR
} from '../actions/types';

const initialState = {
  events: [],
  event: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
        loading: false
      };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => event._id !== payload._id),
          payload
        ],
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
