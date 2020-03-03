import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getBout } from '../../actions/bout';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import './Bout.css';

const Bout = ({ getBout, bout: { bout, loading }, match }) => {
  useEffect(() => {
    getBout(match.params.id);
  }, [getBout, match.params.id]);
  console.log(bout);
  return (
    <Fragment>
      {loading || bout === null ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <div className='boutContainer'>
          <div className=''>
            <h1 style={{ textAlign: 'center' }}>Bout</h1>
            <div>Red Corner: {bout.red_corner_name}</div>
            <div>Blue Corner: {bout.blue_corner_name}</div>
            <div>
              Result: {bout.result} {bout.time}
            </div>
            <div>Referee: {bout.referee}</div>
            <div>Titles: {bout.titles}</div>
            {bout.scorecard0 && (
              <div className='judgesContainer'>
                <div className='judgeTitleBout'>Judge 1</div>
                <div>{bout.scorecard0.judge}</div>
                <div>
                  Red corner points: {bout.scorecard0.red_corner_points}
                </div>
                <div>
                  Blue corner points: {bout.scorecard0.blue_corner_points}
                </div>
              </div>
            )}
            {bout.scorecard1 && (
              <div className='judgesContainer'>
                <div className='judgeTitleBout'>Judge 2</div>
                <div>{bout.scorecard1.judge}</div>
                <div>
                  Red corner points: {bout.scorecard1.red_corner_points}
                </div>
                <div>
                  Blue corner points: {bout.scorecard1.blue_corner_points}
                </div>
              </div>
            )}
            {bout.scorecard2 && (
              <div className='judgesContainer'>
                <div className='judgeTitleBout'>Judge 3</div>
                <div>{bout.scorecard2.judge}</div>
                <div>
                  Red corner points: {bout.scorecard2.red_corner_points}
                </div>
                <div>
                  Blue corner points: {bout.scorecard2.blue_corner_points}
                </div>
              </div>
            )}
            {(bout.red_corner_punches || bout.blue_corner_punches) && (
              <div>
                <h2 style={{ textAlign: 'center' }}>Blow statistics</h2>
              </div>
            )}
            {bout.red_corner_punches && (
              <div className='punchesContainer'>
                <h3>Red corner</h3>
                <div>Jabs: {bout.red_corner_punches.jabs}</div>
                <div>
                  Power punches: {bout.red_corner_punches.power_punches}
                </div>
              </div>
            )}
            {bout.blue_corner_punches && (
              <div className='punchesContainer'>
                <h3>Blue corner</h3>
                <div>Jabs: {bout.blue_corner_punches.jabs}</div>
                <div>
                  Power punches: {bout.blue_corner_punches.power_punches}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Bout.propTypes = {
  getBout: PropTypes.func.isRequired,
  bout: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bout: state.bout
});

export default connect(
  mapStateToProps,
  { getBout }
)(Bout);
