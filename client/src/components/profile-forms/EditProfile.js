import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import './CreateProfile.css';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFromData] = useState({
    status: '',
    bio: '',
    address: '',
    date_birth: '',
    phone_number: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  const [displaySocialInputs, toogleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFromData({
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      address: loading || !profile.address ? '' : profile.address,
      date_birth: loading || !profile.date_birth ? '' : profile.date_birth,
      phone_number:
        loading || !profile.phone_number ? '' : profile.phone_number,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      instagram: loading || !profile.instagram ? '' : profile.instagram
    });
  }, [
    getCurrentProfile,
    loading,
    profile.status,
    profile.bio,
    profile.address,
    profile.date_birth,
    profile.phone_number,
    profile.youtube,
    profile.twitter,
    profile.facebook,
    profile.instagram
  ]);

  const {
    bio,
    address,
    date_birth,
    phone_number,
    youtube,
    twitter,
    facebook,
    instagram
  } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    setFromData({ ...formData, status: 'fan' });
    createProfile(formData, history, true);
  };

  return (
    <div className='createProfileContainer'>
      <p className='createProfileParagraph'>Create your profile! </p>
      <Link
        to='/dashboard'
        style={{ textDecoration: 'none' }}
        className='createProfileLink'
      >
        Go Back
      </Link>
      <form onSubmit={e => onSubmit(e)}>
        <h2 className='createProfileHeader'>Short Bio:</h2>
        <input
          className='createProfileInput'
          placeholder='Tell us a little about yourself'
          name='bio'
          type='text'
          value={bio}
          onChange={e => onChange(e)}
        />

        <h2 className='createProfileHeader'>Address:</h2>
        <input
          className='createProfileInput'
          placeholder='City or city and state suggested (eg. Boston, MA)'
          name='address'
          type='text'
          value={address}
          onChange={e => onChange(e)}
        />

        <h2 className='createProfileHeader'>Phone number:</h2>
        <input
          className='createProfileInput'
          placeholder='Only numbers without any separations (eg. 123456789)'
          name='phone_number'
          type='text'
          value={phone_number}
          onChange={e => onChange(e)}
        />

        <h2 className='createProfileHeader'>Date of Birth:</h2>
        <input
          className='createProfileInput'
          name='date_birth'
          type='date'
          value={date_birth}
          onChange={e => onChange(e)}
        />

        <br />

        <label className='switch'>
          <input
            type='checkbox'
            onClick={() => toogleSocialInputs(!displaySocialInputs)}
          />
          <span className='slider round' />
        </label>
        <span>Add Social Link - Optional</span>

        {displaySocialInputs && (
          <Fragment>
            <input
              className='createProfileSocialInput'
              placeholder='YouTube URL'
              name='youtube'
              type='text'
              value={youtube}
              onChange={e => onChange(e)}
            />

            <input
              className='createProfileSocialInput'
              placeholder='Twitter URL'
              name='twitter'
              type='text'
              value={twitter}
              onChange={e => onChange(e)}
            />

            <input
              className='createProfileSocialInput'
              placeholder='Facebook URL'
              name='facebook'
              type='text'
              value={facebook}
              onChange={e => onChange(e)}
            />

            <input
              className='createProfileSocialInput'
              placeholder='Instagram URL'
              name='instagram'
              type='text'
              value={instagram}
              onChange={e => onChange(e)}
            />
          </Fragment>
        )}

        <div className='createProfileInputSubmitContainer'>
          <input
            className='createProfileInputSubmit'
            type='submit'
            value='SUBMIT'
          />
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
