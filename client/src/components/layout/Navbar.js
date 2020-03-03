import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div>
      <Link to='/login' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Sign in</div>
      </Link>
      <Link to='/register' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Sign up</div>
      </Link>
    </div>
  );

  const logoutLink = (
    <div>
      <div className='tablink' onClick={logout}>
        Logout
      </div>
      <Link to='/dashboard' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Dashboard</div>
      </Link>
    </div>
  );

  return (
    <div className='tabs'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className='mainTitle'>Boxing Website</div>
      </Link>
      <div />
      {!loading && (
        <Fragment>{isAuthenticated ? logoutLink : authLinks}</Fragment>
      )}
      <Link to='/rankings' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Rankings</div>
      </Link>
      <Link to='/forum' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Forum</div>
      </Link>
      <Link to='/events' style={{ textDecoration: 'none' }}>
        <div className='tablink'>Events</div>
      </Link>
      <Link to='/news' style={{ textDecoration: 'none' }}>
        <div className='tablink'>News</div>
      </Link>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
