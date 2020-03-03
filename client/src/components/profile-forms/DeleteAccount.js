import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import './DeleteAccount.css';

const DeleteAccount = ({ deleteAccount }) => {
  return (
    <div>
      <button className='deleteAccountButton' onClick={() => deleteAccount()}>
        Delete My Account
      </button>
    </div>
  );
};

DeleteAccount.propTypes = {
  deleteAccount: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteAccount }
)(DeleteAccount);
