import React from 'react';
import PropTypes from 'prop-types';
import { setStatus } from '../../actions/auth';
import { connect } from 'react-redux';
import './ChangeStatusButton.css';

const ChangeStatusButton = ({ text, userId, status, setStatus }) => {
  const handleClick = e => {
    e.preventDefault();
    setStatus({ userId, status });
  };
  return (
    <div>
      <button className='changeStatusButton' onClick={e => handleClick(e)}>
        {text}
      </button>
    </div>
  );
};

ChangeStatusButton.propTypes = {
  userId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired
};

export default connect(
  null,
  { setStatus }
)(ChangeStatusButton);
