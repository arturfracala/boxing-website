import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBoxer } from '../../actions/boxer';
import PropTypes from 'prop-types';
import './AddBoxer.css';

const AddBoxer = ({ addBoxer, history, auth }) => {
  const [formData, setFromData] = useState({
    name: '',
    alias: '',
    country: '',
    ranking: 1000,
    height: 0,
    reach: 0,
    weight: 0,
    association: '',
    division: '',
    date_birth: ''
  });

  if (
    auth.loading ||
    !auth.isAuthenticated ||
    auth.user === null ||
    auth.user.status !== 'journalist'
  )
    return <Redirect to='/dashboard' />;

  const {
    name,
    alias,
    country,
    ranking,
    height,
    reach,
    weight,
    association,
    division,
    date_birth
  } = formData;

  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    setFromData({ ...formData });
    addBoxer(formData, history);
  };

  return (
    <div className='addBoxerContainer'>
      <h1 className='addBoxerMainHeader'>Add Boxer</h1>

      <Link
        to='/rankings'
        className='addBoxerBackLink'
        style={{ textDecoration: 'none' }}
      >
        Go Back
      </Link>

      <form onSubmit={e => onSubmit(e)}>
        <h2 className='createBoxerHeader'>Name:</h2>
        <input
          className='createBoxerInput'
          name='name'
          type='text'
          value={name}
          onChange={e => onChange(e)}
          required
        />

        <h2 className='createBoxerHeader'>Alias:</h2>
        <input
          className='createBoxerInput'
          name='alias'
          type='text'
          value={alias}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Country:</h2>
        <input
          className='createBoxerInput'
          name='country'
          type='text'
          value={country}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Ranking:</h2>
        <input
          className='createBoxerInput'
          name='ranking'
          type='number'
          value={ranking}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Height:</h2>
        <input
          className='createBoxerInput'
          name='height'
          type='number'
          step='0.01'
          value={height}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Reach:</h2>
        <input
          className='createBoxerInput'
          name='reach'
          type='number'
          step='0.01'
          value={reach}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Weight:</h2>
        <input
          className='createBoxerInput'
          name='weight'
          type='number'
          step='0.01'
          value={weight}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Association:</h2>
        <input
          className='createBoxerInput'
          name='association'
          type='text'
          value={association}
          onChange={e => onChange(e)}
        />

        <h2 className='createBoxerHeader'>Division:</h2>
        <select
          className='createBoxerInput'
          name='division'
          onChange={e => onChange(e)}
          value={division}
        >
          <option value='' selected disabled hidden>
            Choose here
          </option>
          <option value='Heavyweight' selected>
            Heavyweight
          </option>
          <option value='Cruiserweight'>Cruiserweight</option>
          <option value='Light heavyweight'>Light heavyweight</option>
          <option value='Super middleweight'>Super middleweight</option>
          <option value='Middleweight'>Middleweight</option>
          <option value='Super welterweight'>Super welterweight</option>
          <option value='Welterweight'>Welterweight</option>
          <option value='Super lightweight'>Super lightweight</option>
          <option value='Lightweight'>Lightweight</option>
          <option value='Super featherweight'>Super featherweight</option>
          <option value='Featherweight'>Featherweight</option>
          <option value='Super bantamweight'>Super bantamweight</option>
          <option value='Bantamweight'>Bantamweight</option>
          <option value='Super flyweight'>Super flyweight</option>
          <option value='Flyweight'>Flyweight</option>
          <option value='Light flyweight'>Light flyweight</option>
          <option value='Minimumweight'>Minimumweight</option>
        </select>

        <h2 className='createBoxerHeader'>Date of Birth:</h2>
        <input
          className='createBoxerInput'
          name='date_birth'
          type='date'
          value={date_birth}
          onChange={e => onChange(e)}
        />

        <div className='createBoxerInputSubmitContainer'>
          <input
            className='createBoxerInputSubmit'
            type='submit'
            value='SUBMIT'
          />
        </div>
      </form>
    </div>
  );
};

AddBoxer.propTypes = {
  addBoxer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addBoxer }
)(withRouter(AddBoxer));
