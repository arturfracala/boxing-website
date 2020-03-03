import {
  GET_BOXERS,
  GET_BOXER,
  ADD_BOXER,
  UPDATE_BOXER,
  BOXER_ERROR
} from '../actions/types';

const initialState = {
  boxers: [],
  boxer: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOXERS:
      return {
        ...state,
        boxers: payload,
        loading: false
      };
    case GET_BOXER:
      return {
        ...state,
        boxer: payload,
        loading: false
      };
    case UPDATE_BOXER:
      return {
        ...state,
        boxers: [
          ...state.boxers.filter(boxer => boxer._id !== payload._id),
          payload
        ],
        loading: false
      };
    case ADD_BOXER:
      return {
        ...state,
        boxers: [...state.boxers, payload],
        loading: false
      };
    case BOXER_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}
