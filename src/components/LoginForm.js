import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

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
  messageSuccess: {
    width: '100%',
    textAlign: 'center',
    color: '#75a148',
  },
  messageError: {
    width: '100%',
    textAlign: 'center',
    color: '#a14875',
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
      battleTag: '',
      email: '',
      password: '',
      message: '',
      error: false,
      registration: false,
      login: false,
      wrongBattleTag: false,
      wrongEmail: false,
      wrongPassword: false,
      loading: false,
    };
  }

  checkBattleTag = async (battleTag) => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: battleTag,
        }),
      });
      const json = await response.json();
      if (json.success) { //  Пользователь есть
        this.setState(() => ({
          login: true,
        }));
      } else if (json.status === 400) { //  Неправильный батлтаг
        this.setState(() => ({
          wrongBattleTag: true,
          error: true,
          message: 'Wrong BattleTag',
        }));
      } else { // Пользователя нет
        this.setState(() => ({
          registration: true,
        }));
      }
    } catch {
      this.setState(() => ({ // Не достучались до сервера
        error: true,
        message: 'Server error',
      }));
    }
  }

  registerBattleTag = async (battleTag, email, password) => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: battleTag,
          email,
          password,
        }),
      });
      const json = await response.json();
      if (json.success) { //  Регистрация прошла успешно
        this.setState(() => ({
          registration: false,
          error: false,
          password: '',
          message: 'Registration success',
        }));
      } else if (json.status === 400) { //  Неправильный формат данных
        this.setState(() => ({
          wrongBattleTag: true,
        }));
      } else if (json.status === 403) { // Такой email уже есть
        this.setState(() => ({
          wrongEmail: true,
          error: true,
          message: 'User with this email already exist',
        }));
      } else if (json.param === 'password') {
        this.setState(() => ({
          wrongPassword: true,
          error: true,
          message: 'Password too short',
        }));
      }
    } catch {
      this.setState(() => ({ // Не достучались до сервера
        error: true,
        message: 'Server error',
      }));
    }
  }

  handleNextClick = async () => {
    this.setState(() => ({
      loading: true,
      wrongBattleTag: false,
      wrongEmail: false,
      wrongPassword: false,
      message: '',
    }));

    const {
      registration,
      battleTag,
      email,
      password,
    } = this.state;

    if (registration) {
      await this.registerBattleTag(battleTag, email, password);
    } else {
      await this.checkBattleTag(battleTag);
    }

    this.setState(() => ({ loading: false }));
  }

  handleBackClick = () => {
    this.setState(() => ({
      registration: false,
      login: false,
      password: '',
      email: '',
    }));
  }

  changeBattleTag = (event) => {
    const { value } = event.target;
    this.setState(() => ({ battleTag: value }));
  }

  changeEmail = (event) => {
    const { value } = event.target;
    this.setState(() => ({ email: value }));
  }

  changePassword = (event) => {
    const { value } = event.target;
    this.setState(() => ({ password: value }));
  }

  render() {
    const { classes } = this.props;
    const {
      battleTag,
      email,
      password,
      message,
      error,
      registration,
      login,
      wrongBattleTag,
      wrongEmail,
      wrongPassword,
      loading,
    } = this.state;

    let title = 'Enter your BattleTag';
    if (registration) {
      title = 'Registration';
    } else if (login) {
      title = 'Enter yor password';
    }
    return (
      <Card className={classes.card}>
        <CardHeader classes={{ root: classes.header, title: classes.title }} titlecolor="white" title={title} />
        <CardContent>
          { message && (
          <Typography
            className={error ? classes.messageError : classes.messageSuccess}
            variant="caption"
          >
            {message}
          </Typography>) }
          <TextField
            disabled={registration || login}
            error={wrongBattleTag}
            label="BattleTag"
            value={battleTag}
            onChange={this.changeBattleTag}
            className={classes.textField}
            margin="normal"
          />
          { registration && (
          <TextField
            label="Email"
            error={wrongEmail}
            value={email}
            onChange={this.changeEmail}
            className={classes.textField}
            margin="normal"
          />) }
          { (registration || login) && (
          <TextField
            label="Password"
            error={wrongPassword}
            value={password}
            onChange={this.changePassword}
            type="password"
            className={classes.textField}
            margin="normal"
          />) }
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
