import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import './Register.css';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match!', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='registerContainer'>
      <p className='registerParagraph'>Sign up</p>
      <form onSubmit={e => onSubmit(e)}>
        <input
          className='registerInput'
          placeholder='Email Address'
          name='email'
          type='email'
          value={email}
          onChange={e => onChange(e)}
          required
        />

        <input
          className='registerInput'
          placeholder='Name'
          name='name'
          type='text'
          value={name}
          onChange={e => onChange(e)}
          required
        />

        <input
          className='registerInput'
          placeholder='Password'
          name='password'
          type='password'
          minLength='6'
          value={password}
          onChange={e => onChange(e)}
          required
        />

        <input
          className='registerInput'
          placeholder='Confirm Password'
          name='password2'
          type='password'
          minLength='6'
          value={password2}
          onChange={e => onChange(e)}
          required
        />

        <input
          className='registerInputSubmit'
          type='submit'
          value='C O N T I N U E'
        />
      </form>
      <p className='linkParagraph'>
        Already have an account?
        <Link to='/login' style={{ textDecoration: 'none', color: 'gray' }}>
          {' '}
          Sign in
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
