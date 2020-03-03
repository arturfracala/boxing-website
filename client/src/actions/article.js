import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTICLES,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  GET_ARTICLE,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get articles
export const getArticles = () => async dispatch => {
  try {
    const res = await axios.get('/api/articles');
    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/articles/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/articles/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete article
export const deleteArticle = id => async dispatch => {
  try {
    await axios.delete(`/api/articles/${id}`);
    dispatch({
      type: DELETE_ARTICLE,
      payload: id
    });

    dispatch(setAlert('Article Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add article
export const addArticle = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/articles`, formData, config);
    dispatch({
      type: ADD_ARTICLE,
      payload: res.data
    });

    dispatch(setAlert('Article Created', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get article
export const getArticle = id => async dispatch => {
  try {
    const res = await axios.get(`/api/articles/${id}`);
    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (articleId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/articles/comment/${articleId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (articleId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `/api/articles/comment/${articleId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
