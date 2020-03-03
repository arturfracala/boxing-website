import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, payload],
        loading: false
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article._id !== payload),
        loading: false
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        articles: state.articles.map(article =>
          article._id === payload.id
            ? { ...article, likes: payload.likes }
            : article
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        article: { ...state.article, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.article.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
