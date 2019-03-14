import React from 'react';
import PropTypes from 'prop-types';

import { theme } from 'helpers';

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
    color: theme.color5,
    textAlign: 'center',
  },
  description: {
    color: theme.color1,
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  link: {
    flexGrow: 1,
    color: theme.color5,
    textAlign: 'center',
    textDecoration: 'underline',
  },
};

const descriptionText = 'Here you can play your 80 gold quest with someone who also has it, as a result you both get 160 gold!';

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
      <a href="/howis">
        <Typography className={classes.link}>
          How does it work?
        </Typography>
      </a>
    </div>
  );
};

StartPageDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartPageDescription);
