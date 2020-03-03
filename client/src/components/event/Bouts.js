import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBouts } from '../../actions/bout';
import BoutItem from './BoutItem';
import { connect } from 'react-redux';

const Bouts = ({ getBouts, bout: { bouts }, eventId }) => {
  useEffect(() => {
    getBouts();
  }, [getBouts]);
  return (
    <div>
      {bouts.map(
        bout =>
          eventId === bout.event && (
            <Link
              to={`/bout/${bout._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
              key={bout._id}
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

Bouts.propTypes = {
  getBouts: PropTypes.func.isRequired,
  bout: PropTypes.object.isRequired,
  eventId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  bout: state.bout
});

export default connect(
  mapStateToProps,
  { getBouts }
)(Bouts);
