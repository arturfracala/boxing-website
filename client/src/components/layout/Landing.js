import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Landing.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='landingContainer'>
      <div className='landingParagraph'>
        <p>Boxing Website</p>
      </div>
      <div className='landingSmallerParagraph'>
        <p>
          New articles, interesting facts from the world of boxing everyday.
        </p>
      </div>
      <div className='linksContainer'>
        <Link
          to='/login'
          className='landingLink'
          style={{ textDecoration: 'none' }}
        >
          L O G I N
        </Link>
        <Link
          to='/register'
          className='landingLink'
          style={{ textDecoration: 'none' }}
        >
          R E G I S T E R
        </Link>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
