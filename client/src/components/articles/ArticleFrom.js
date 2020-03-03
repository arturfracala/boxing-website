import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';
import './ArticleForm.css';

const ArticleFrom = ({ addArticle }) => {
  const [formData, setFromData] = useState({
    text: '',
    title: ''
  });

  const { text, title } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    addArticle(formData);
    setFromData({ text: '', title: '' });
  };

  return (
    <div className='articleFormContainer'>
      <h3>Create Article</h3>
      <form onSubmit={e => onSubmit(e)}>
        <input
          className='textInputForm'
          placeholder='Title'
          name='title'
          type='text'
          value={title}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          className='textAreaForm'
          name='text'
          placeholder="Article's Text"
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <input className='submitForm' type='submit' value='Create Article' />
      </form>
    </div>
  );
};

ArticleFrom.propTypes = {
  addArticle: PropTypes.func.isRequired
};

export default connect(
  null,
  { addArticle }
)(ArticleFrom);
