import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import './PostFrom.css';

const PostFrom = ({ addPost }) => {
  const [formData, setFromData] = useState({
    text: ''
  });

  const { text } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    addPost(formData);
    setFromData({ text: '' });
  };

  return (
    <div className='postFormContainer'>
      <div>Create Post</div>
      <form onSubmit={e => onSubmit(e)}>
        <textarea
          className='postFromTextArea'
          name='text'
          placeholder="Post's Text"
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <input className='postFromButton' type='submit' value='Publish' />
      </form>
    </div>
  );
};

PostFrom.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostFrom);
