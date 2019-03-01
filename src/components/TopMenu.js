import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  bar: {
    background: '#002242',
  },
  grow: {
    flexGrow: 1,
  },
};

const TopMenu = (props) => {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            HS Frend Quest
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopMenu);
