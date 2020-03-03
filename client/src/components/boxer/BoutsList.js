import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBouts } from '../../actions/bout';
import BoutItem from './BoutItem';
import { connect } from 'react-redux';

const BoutsList = ({ getBouts, bout: { bouts }, boxerId }) => {
  useEffect(() => {
    getBouts();
  }, [getBouts]);
  return (
    <div>
      {bouts.map(
        bout =>
          (boxerId === bout.red_corner || boxerId === bout.blue_corner) && (
            <Link
              to={`/bout/${bout._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <BoutItem
                red_corner_name={bout.red_corner_name}
                blue_corner_name={bout.blue_corner_name}
                result={bout.result}
              />
            </Link>
          )
      )}
    </div>
  );
};

BoutsList.propTypes = {
  getBouts: PropTypes.func.isRequired,
  bout: PropTypes.object.isRequired,
  boxerId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  bout: state.bout
});

export default connect(
  mapStateToProps,
  { getBouts }
)(BoutsList);
