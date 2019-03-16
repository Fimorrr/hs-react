import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { token, theme } from 'helpers';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  bar: {
    background: theme.color1,
  },
  grow: {
    flexGrow: 1,
  },
};

class TopMenu extends React.Component {
  handleLogout = () => {
    const { history } = this.props;

    token.removeToken();
    history.push('/login');
  }

  render() {
    const { classes, login } = this.props;
    return (
      <div>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              HS Frend Quest
            </Typography>
            { login && (<Button onClick={this.handleLogout} color="inherit">Logout</Button>) }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopMenu.defaultProps = {
  login: false,
};

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.bool,
};

export default withRouter(withStyles(styles)(TopMenu));
