import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    width: 345,
    background: 'white',
    marginBottom: 30,
  },
  header: {
    background: '#002242',
  },
  title: {
    color: 'white',
  },
  media: {
    height: 140,
  },
  textField: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 0,
    marginTop: '3px',
    width: '90%',
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'BattleTag',
      text: '',
      registration: false,
      login: false,
      loading: false,
      title: 'Enter your BattleTag',
    };
  }

  handleNextClick = () => {
    this.setState(() => ({ label: 'Password' }));
    this.setState(() => ({ battletag: 'Password' }));
    this.setState(() => ({ registration: true }));
    this.setState(() => ({ title: 'Registration' }));

    this.setState(
      {
        loading: true,
      },
      () => {
        this.timer = setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 2000);
      },
    );
  }

  handleBackClick = () => {
    this.setState(() => ({ registration: false }));
    this.setState(() => ({ title: 'Enter your BattleTag' }));
    this.setState(() => ({ label: 'BattleTag' }));
  }

  changeText = (event) => {
    const { value } = event.target;
    this.setState(() => ({ text: value }));
  }

  changeEmail = (event) => {
    const { value } = event.target;
    this.setState(() => ({ email: value }));
  }

  render() {
    const { classes } = this.props;
    const {
      label,
      text,
      email,
      registration,
      login,
      loading,
      title,
    } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader classes={{ root: classes.header, title: classes.title }} titlecolor="white" title={title} />
        <CardContent>
          { registration && (
          <TextField
            label="Email"
            value={email}
            onChange={this.changeEmail}
            className={classes.textField}
            margin="normal"
          />) }
          <TextField
            label={label}
            value={text}
            onChange={this.changeText}
            className={classes.textField}
            margin="normal"
          />
        </CardContent>
        <CardActions className={classes.actions}>
          { (registration || login) && (
          <Button
            color="primary"
            onClick={this.handleBackClick}
          >
            Back
          </Button>) }
          <div className={classes.wrapper}>
            <Button
              color="primary"
              disabled={loading}
              onClick={this.handleNextClick}
            >
              Next
            </Button>
            { loading && <CircularProgress size={20} className={classes.buttonProgress} /> }
          </div>
        </CardActions>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
