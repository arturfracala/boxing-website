import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/article';
import './CommentForm.css';

const CommentForm = ({ articleId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className='commentContainer'>
        <div className='commentHeader'>Leave a Comment</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addComment(articleId, { text });
            setText('');
          }}
        >
          <textarea
            className='commentTextArea'
            name='text'
            placeholder='Your comment'
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <input className='commentButton' type='submit' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
