import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DeleteAccount from '../profile-forms/DeleteAccount';
import Spinner from '../layout/Spinner';
import ChangeStatusButton from './ChangeStatusButton';
import DashboardActions from './DashboardActions';
import { getUsers } from '../../actions/auth';
import './Dashboard.css';

const Dashboard = ({
  getCurrentProfile,
  getUsers,
  auth: { user, users },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {user && user.name}!</p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <DeleteAccount />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link
            to='/create-profile'
            className='dashboardLink'
            style={{ textDecoration: 'none' }}
          >
            Create Profile
          </Link>
          <DeleteAccount />
        </Fragment>
      )}
      {user !== null && !user.loading && user.status === 'fan' && (
        <Fragment>
          <p>Would you like to be a journalist of our website?</p>
          <ChangeStatusButton
            text={'Join us'}
            userId={user._id}
            status={'expectant'}
          />
        </Fragment>
      )}
      {user !== null && !user.loading && user.status === 'journalist' && (
        <Fragment>
          <p>Applications</p>
          {users.map(
            expectant =>
              expectant.status === 'expectant' && (
                <div key={expectant._id} className='appDashboardMainContainer'>
                  <div className='applicationsDashboardContainer'>
                    <p style={{ marginLeft: '5px' }}>{expectant.name}</p>
                  </div>
                  <div className='applicationsDashboardContainer'>
                    <ChangeStatusButton
                      text={'Accept'}
                      userId={expectant._id}
                      status={'journalist'}
                    />{' '}
                  </div>
                  <div className='applicationsDashboardContainer'>
                    <ChangeStatusButton
                      text={'Reject'}
                      userId={expectant._id}
                      status={'fan'}
                    />
                  </div>
                </div>
              )
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getUsers }
)(Dashboard);
