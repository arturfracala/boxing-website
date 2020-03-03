import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/article';
import './CommentItem.css';

const CommentItem = ({
  articleId,
  comment: { _id, text, name, user, date },
  auth,
  deleteComment
}) => {
  return (
    <div className='commentItemContainer'>
      <div>{text}</div>
      <div className='infoContainer'>
        Commented on <Moment format='YYYY/MM/DD'>{date}</Moment> by {name}.
      </div>
      {!auth.loading &&
        auth.isAuthenticated &&
        (auth.user._id === user || auth.user.status === 'journalist') && (
          <button
            onClick={e => deleteComment(articleId, _id)}
            type='button'
            className='deleteButton'
          >
            Delete
          </button>
        )}
    </div>
  );
};

CommentItem.propTypes = {
  articleId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
