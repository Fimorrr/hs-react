import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  text: {
    width: '100%',
    textAlign: 'center',
  },
};

const GameTimer = (props) => {
  const { classes, time } = props;

  let minutes;
  let seconds;

  if (time != null) {
    minutes = `${Math.floor(time / 60)}`.padStart(2, 0);
    seconds = `${Math.floor(time % 60)}`.padStart(2, 0);
    return (
      <Typography className={classes.text}>
        {`${minutes}:${seconds}`}
      </Typography>
    );
  }

  return '';
};

GameTimer.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameTimer);
