import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import './PostItem.css';

const PostItem = ({
  deletePost,
  post: { _id, text, name, date, user },
  auth
}) => {
  return (
    <div className='postItemContainer'>
      <div>{text}</div>
      <div className='postAuthor'>
        <Moment format='YYYY/MM/DD'>{date}</Moment> {name}.
      </div>
      {!auth.loading &&
        auth.isAuthenticated &&
        (user === auth.user._id || auth.user.status === 'journalist') && (
          <button
            type='button'
            className='postItemDeleteButton'
            onClick={e => deletePost(_id)}
          >
            Delete
          </button>
        )}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
