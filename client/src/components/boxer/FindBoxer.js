import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactList from 'react-list';
import { getBoxers } from '../../actions/boxer';
import { connect } from 'react-redux';
import './FindBoxer.css';

const FindBoxer = ({ getBoxers, boxer: { boxers } }) => {
  useEffect(() => {
    getBoxers();
  }, [getBoxers]);

  const [filter, setFilter] = useState('');

  const renderItem = (index, key) => {
    return (
      <div className='' key={key}>
        <Link to={`/boxer/${boxers[index]._id}`} className='findBoxerLink'>
          {boxers[index].name.toLowerCase().includes(filter.toLowerCase()) &&
            boxers[index].name}{' '}
          {boxers[index].name.toLowerCase().includes(filter.toLowerCase()) &&
            boxers[index].alias}
        </Link>
      </div>
    );
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div className='findBoxerContainer'>
      <h1>Find Boxer</h1>
      <input
        type='text'
        className='addBoutJudgeInput'
        placeholder='Search...'
        onChange={e => handleChange(e)}
        style={{ margin: '8px' }}
      />
      <div style={{ overflow: 'auto', maxHeight: 400 }}>
        <ReactList
          itemRenderer={renderItem}
          length={boxers.length}
          type='uniform'
        />
      </div>
    </div>
  );
};

FindBoxer.propTypes = {
  boxer: PropTypes.object.isRequired,
  getBoxers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  boxer: state.boxer
});

export default connect(
  mapStateToProps,
  { getBoxers }
)(FindBoxer);
