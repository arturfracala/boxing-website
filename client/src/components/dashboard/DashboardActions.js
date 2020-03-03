import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardActions.css';

const DashboardActions = () => {
  return (
    <div>
      <Link
        to='/edit-profile'
        className='actionsLink'
        style={{ textDecoration: 'none' }}
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
