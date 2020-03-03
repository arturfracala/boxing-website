import { ADD_BOUT, GET_BOUTS, GET_BOUT, BOUT_ERROR } from '../actions/types';

const initialState = {
  bouts: [],
  bout: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOUT:
      return {
        ...state,
        bouts: [...state.bouts, payload],
        loading: false
      };
    case GET_BOUT:
      return {
        ...state,
        bout: payload,
        loading: false
      };
    case GET_BOUTS:
      return {
        ...state,
        bouts: payload,
        loading: false
      };
    case BOUT_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
