import React from 'react';
import PropTypes from 'prop-types';

import { theme } from 'helpers';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  confirm: {
    background: theme.color2,
    color: theme.color6,
  },
  cancel: {
    background: theme.color3,
    color: theme.color6,
  },
  default: {
    background: theme.color5,
    color: theme.color6,
  },
  wrapper: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
};

class StartGameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleClick = async () => {
    const { action } = this.props;

    this.setState(() => ({ loading: true }));
    await action();
    this.setState(() => ({ loading: false }));
  }

  render() {
    const { classes, text, type } = this.props;
    const { loading } = this.state;

    const buttonStyle = classes[type];

    return (
      <div className={classes.wrapper}>
        <Button
          className={buttonStyle}
          variant="contained"
          size="large"
          disabled={loading}
          onClick={this.handleClick}
        >
          {text}
        </Button>
        { loading && <CircularProgress size={20} className={classes.progress} /> }
      </div>
    );
  }
}

StartGameCard.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartGameCard);
