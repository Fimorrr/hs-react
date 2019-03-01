import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '3%',
  },
  title: {
    flexGrow: 1,
    color: '#5a82aa',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    color: '#1c2e40',
    textAlign: 'center',
  },
};

const descriptionText = 'Here you can play your 80 gold quest with other player, who have it too, and in the end, you two will have 160 gold!';

const StartPageDescription = (props) => {
  const { classes } = props;
  return (
    <div className={classes.body}>
      <Typography variant="h4" className={classes.title}>
        Welcome to HS Frend Quest!
      </Typography>
      <Typography variant="h6" className={classes.description}>
        {descriptionText}
      </Typography>
    </div>
  );
};

StartPageDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartPageDescription);
