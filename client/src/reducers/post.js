import {
  GET_POSTS,
  ADD_POST,
  REMOVE_POST,
  POST_ERROR,
  CHANGE_PAGE
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  errors: {},
  currentPage: 1
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: payload,
        loading: false
      };
    default:
      return state;
  }
}
