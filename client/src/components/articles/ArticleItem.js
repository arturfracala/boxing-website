import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteArticle } from '../../actions/article';
import './ArticleItem.css';

const ArticleItem = ({
  addLike,
  removeLike,
  deleteArticle,
  auth,
  article: { _id, text, title, name, likes, comments, date }
}) => {
  return (
    <Fragment>
      <div className='articleItemContainer'>
        <div className='titleContainer'>{title}</div>
        <div className='textContainer'>{text.substr(0, 420)}...</div>

        <div className='infoContainer'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment> by {name}.
        </div>
        <div className='buttonsContainer'>
          {!auth.loading && auth.isAuthenticated ? (
            <Fragment>
              <button className='likeButton' onClick={e => addLike(_id)}>
                Like ({likes.length})
              </button>
              <button className='dislikeButton' onClick={e => removeLike(_id)}>
                Dislike
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                className='likeButton'
                onClick={e => window.alert('Log in to like an article')}
              >
                Like ({likes.length})
              </button>
              <button
                className='dislikeButton'
                onClick={e => window.alert('Log in to dislike an article')}
              >
                Dislike
              </button>
            </Fragment>
          )}
          <Link
            to={`/news/${_id}`}
            style={{
              textDecoration: 'none',
              padding: '15px',
              marginLeft: '5px',
              marginRight: '5px',
              color: '#1d1e22'
            }}
          >
            Discussion ({comments.length})
          </Link>
          <Link
            to={`/news/${_id}`}
            style={{
              textDecoration: 'none',
              padding: '15px',
              marginLeft: '5px',
              marginRight: '5px',
              color: '#1d1e22'
            }}
          >
            Read more...
          </Link>

          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user.status === 'journalist' && (
              <button
                onClick={e => deleteArticle(_id)}
                className='deleteButton'
              >
                Delete
              </button>
            )}
        </div>
      </div>
    </Fragment>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deleteArticle }
)(ArticleItem);
