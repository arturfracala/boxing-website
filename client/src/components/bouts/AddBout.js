import React, { useEffect, useState } from 'react';
import { addBout } from '../../actions/bout';
import { getBoxers } from '../../actions/boxer';
import { withRouter, Redirect } from 'react-router-dom';
import ReactList from 'react-list';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AddBout.css';

const AddBout = ({
  addBout,
  getBoxers,
  boxer: { boxers },
  location,
  history,
  auth
}) => {
  useEffect(() => {
    getBoxers();
  }, [getBoxers]);

  const [formData, setFromData] = useState({
    event: location.eventId,
    red_corner: '',
    blue_corner: '',
    red_corner_name: '',
    blue_corner_name: '',
    result: '',
    time: '',
    referee: '',
    titles: '',
    judge0: '',
    red_corner_points0: '',
    blue_corner_points0: '',
    judge1: '',
    red_corner_points1: '',
    blue_corner_points1: '',
    judge2: '',
    red_corner_points2: '',
    blue_corner_points2: '',
    red_power_punches: '',
    red_jabs: '',
    blue_power_punches: '',
    blue_jabs: ''
  });

  const {
    result,
    time,
    referee,
    titles,
    judge0,
    red_corner_points0,
    blue_corner_points0,
    judge1,
    red_corner_points1,
    blue_corner_points1,
    judge2,
    red_corner_points2,
    blue_corner_points2,
    red_power_punches,
    red_jabs,
    blue_power_punches,
    blue_jabs
  } = formData;

  const [redFilter, setRedFilter] = useState('');
  const [blueFilter, setBlueFilter] = useState('');

  if (
    auth.loading ||
    !auth.isAuthenticated ||
    auth.user === null ||
    auth.user.status !== 'journalist'
  )
    return <Redirect to='/dashboard' />;

  const renderItemRed = (index, key) => {
    if (boxers[index]._id === formData.red_corner)
      return (
        <div
          className='addBoutRenderItem'
          key={key}
          style={{ backgroundColor: '#98999e', color: '#1d1e22' }}
          onClick={() => {
            setFromData({
              ...formData,
              red_corner: boxers[index]._id,
              red_corner_name: boxers[index].name
            });
          }}
        >
          {boxers[index].name}
        </div>
      );
    else
      return (
        <div
          className='addBoutRenderItem'
          key={key}
          onClick={() => {
            setFromData({
              ...formData,
              red_corner: boxers[index]._id,
              red_corner_name: boxers[index].name
            });
          }}
        >
          {boxers[index].name.toLowerCase().includes(redFilter.toLowerCase()) &&
            boxers[index].name}{' '}
          {boxers[index].name.toLowerCase().includes(redFilter.toLowerCase()) &&
            boxers[index].alias}
        </div>
      );
  };

  const renderItemBlue = (index, key) => {
    if (boxers[index]._id === formData.blue_corner)
      return (
        <div
          className='addBoutRenderItem'
          key={key}
          style={{ backgroundColor: '#98999e', color: '#1d1e22' }}
          onClick={() => {
            setFromData({
              ...formData,
              blue_corner: boxers[index]._id,
              blue_corner_name: boxers[index].name
            });
          }}
        >
          {boxers[index].name}
        </div>
      );
    else
      return (
        <div
          className='addBoutRenderItem'
          key={key}
          onClick={() => {
            setFromData({
              ...formData,
              blue_corner: boxers[index]._id,
              blue_corner_name: boxers[index].name
            });
          }}
        >
          {boxers[index].name
            .toLowerCase()
            .includes(blueFilter.toLowerCase()) && boxers[index].name}{' '}
          {boxers[index].name
            .toLowerCase()
            .includes(blueFilter.toLowerCase()) && boxers[index].alias}
        </div>
      );
  };

  const onChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = e => {
    e.preventDefault();

    setFromData({ ...formData });

    console.log(formData);
    addBout(formData, location.eventId, history);
  };

  const handleRedBoxersChange = e => {
    setRedFilter(e.target.value);
  };

  const handleBlueBoxersChange = e => {
    setBlueFilter(e.target.value);
  };

  return (
    <div className='addBoutContainer'>
      <form className='addBoutForm' onSubmit={e => onSubmit(e)}>
        <div className='addBoutDetailsContainer'>
          <h1>Details</h1>

          <div className='addBoutInputBox'>
            Result:{' '}
            <select name='result' onChange={e => onChange(e)} value={result}>
              <option value='' defaultValue>
                Choose here
              </option>
              <option value='Red corner won by KO'>Red corner won by KO</option>
              <option value='Red corner won by RTD'>
                Red corner won by RTD
              </option>
              <option value='Red corner won by UD'>Red corner won by UD</option>
              <option value='Red corner lost by KO'>
                Red corner lost by KO
              </option>
              <option value='Red corner lost by RTD'>
                Red corner lost by RTD
              </option>
              <option value='Red corner lost by UD'>
                Red corner lost by UD
              </option>
              <option value='Draw'>Draw</option>
              <option value='No contest '>No contest </option>
              <option value='Incoming'>Incoming</option>
            </select>
          </div>

          <div className='addBoutInputBox'>
            Time:{' '}
            <input
              placeholder='E.g 1/6 2:34, 11/12 1:02 etc.'
              type='text'
              name='time'
              value={time}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='addBoutInputBox'>
            Referee:{' '}
            <input
              type='text'
              name='referee'
              value={referee}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='addBoutInputBox'>
            Titles:{' '}
            <input
              type='text'
              name='titles'
              value={titles}
              onChange={e => onChange(e)}
            />
          </div>
          <h1>Hit statistics</h1>
          <div className='addBoutInputBox'>
            Red corner power punches:{' '}
            <input
              type='number'
              name='red_power_punches'
              value={red_power_punches}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='addBoutInputBox'>
            Red corner jabs:{' '}
            <input
              type='number'
              name='red_jabs'
              value={red_jabs}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='addBoutInputBox'>
            Blue corner power punches:{' '}
            <input
              type='number'
              name='blue_power_punches'
              value={blue_power_punches}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='addBoutInputBox'>
            Blue corner jabs:{' '}
            <input
              type='number'
              name='blue_jabs'
              value={blue_jabs}
              onChange={e => onChange(e)}
            />
          </div>
          <h1>Judges</h1>
          <div className='judgeContainer'>
            <div className='addBoutJudgeInput'>
              Judge name:{' '}
              <input
                type='text'
                name='judge0'
                value={judge0}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Red corner points:{' '}
              <input
                type='number'
                name='red_corner_points0'
                value={red_corner_points0}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Blue corner points:{' '}
              <input
                type='number'
                name='blue_corner_points0'
                value={blue_corner_points0}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className='judgeContainer'>
            <div className='addBoutJudgeInput'>
              Judge name:{' '}
              <input
                type='text'
                name='judge1'
                value={judge1}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Red corner points:{' '}
              <input
                type='number'
                name='red_corner_points1'
                value={red_corner_points1}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Blue corner points:{' '}
              <input
                type='number'
                name='blue_corner_points1'
                value={blue_corner_points1}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className='judgeContainer'>
            <div className='addBoutJudgeInput'>
              Judge name:{' '}
              <input
                type='text'
                name='judge2'
                value={judge2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Red corner points:{' '}
              <input
                type='number'
                name='red_corner_points2'
                value={red_corner_points2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='addBoutJudgeInput'>
              Blue corner points:{' '}
              <input
                type='number'
                name='blue_corner_points2'
                value={blue_corner_points2}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className='addBoutBoxersContainer'>
          <h1>Red corner</h1>

          <input
            type='text'
            className='addBoutJudgeInput'
            placeholder='Search...'
            onChange={e => handleRedBoxersChange(e)}
            style={{ margin: '8px' }}
          />

          <div style={{ overflow: 'auto', maxHeight: 400 }}>
            <ReactList
              itemRenderer={renderItemRed}
              length={boxers.length}
              type='uniform'
            />
          </div>
        </div>
        <div className='addBoutBoxersContainer'>
          <h1>Blue corner</h1>

          <input
            type='text'
            className='addBoutJudgeInput'
            placeholder='Search...'
            onChange={e => handleBlueBoxersChange(e)}
            style={{ margin: '8px' }}
          />

          <div style={{ overflow: 'auto', maxHeight: 400 }}>
            <ReactList
              itemRenderer={renderItemBlue}
              length={boxers.length}
              type='uniform'
            />
          </div>
        </div>
        <div className='addBoutInputSubmitContainer'>
          <input className='addBoutInputSubmit' type='submit' value='SUBMIT' />
        </div>
      </form>
    </div>
  );
};

AddBout.propTypes = {
  addBout: PropTypes.func.isRequired,
  getBoxers: PropTypes.func.isRequired,
  boxer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boxer: state.boxer,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addBout, getBoxers }
)(withRouter(AddBout));
