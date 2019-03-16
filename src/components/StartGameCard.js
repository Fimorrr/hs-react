import React from 'react';
import PropTypes from 'prop-types';
import {
  GameTimer,
  LoadingButton,
  GameDescription,
  OptionForm,
} from 'components';

import { token, theme } from 'helpers';
import { endpoints } from 'api';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 345,
    background: theme.color4,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    background: theme.color1,
  },
  messageSuccess: {
    width: '100%',
    textAlign: 'center',
    color: theme.color2,
  },
  messageError: {
    width: '100%',
    textAlign: 'center',
    color: theme.color3,
  },
  title: {
    color: theme.color4,
  },
  media: {
    height: 140,
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
};

class StartGameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: -1,
      submit: false,
      opponent: '',
      value: '',
      time: null,
      message: '',
      error: false,
    };

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleFindGameClick = this.handleFindGameClick.bind(this);
    this.handleSubmitGameClick = this.handleSubmitGameClick.bind(this);
    this.handleCancelGameClick = this.handleCancelGameClick.bind(this);
    this.handleSuccessOptionClick = this.handleSuccessOptionClick.bind(this);
  }

  async componentDidMount() {
    const authToken = token.getToken();
    if (authToken) {
      await this.getGame(authToken); //  Здесь проверка токена и редирект на следующую страницу
    } else {
      const { history } = this.props;
      history.push('/login');
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getGame = async (authToken) => {
    const response = await fetch(endpoints.getUrl('game/'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const json = await response.json();
    // Очищаем таймер
    clearInterval(this.interval);
    if (json.success) { //  Пользователь есть
      const { status, submit, opponent } = json.game;
      this.setState(() => ({
        gameStatus: status,
        submit,
        opponent,
        time: json.game.time,
        message: `game status: ${json.game.status}`,
      }));
      //  Задаем таймер, если статус позволяет
      if (status === 0 || status === 1) {
        this.interval = setInterval(() => {
          this.setState(() => {
            const { time } = this.state;
            return { time: time + 1 };
          });
        }, 1000);
      }
    } else {
      this.setState(() => ({
        gameStatus: -1,
      }));
    }
  }

  sendGameRequest = async (request, authToken, body) => {
    const response = await fetch(endpoints.getUrl(`game/${request}`), {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body,
    });
    const json = await response.json();
    if (json.success) { //  Поиск игры запущен
      await this.getGame(authToken);
    } else {
      this.setState(() => ({
        message: json.statusText,
      }));
    }
  }

  handleChangeOption = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  handleFindGameClick = async () => {
    await this.sendGameRequest('search', token.getToken());
  }

  handleSubmitGameClick = async () => {
    await this.sendGameRequest('confirm', token.getToken());
  }

  handleCancelGameClick = async () => {
    await this.sendGameRequest('cancel', token.getToken());
  }

  handleSuccessOptionClick = async () => {
    const { value } = this.state;
    await this.sendGameRequest('complete', token.getToken(), JSON.stringify({ option: parseInt(value, 10) }));
  }

  render() {
    const { classes } = this.props;
    const {
      gameStatus,
      submit,
      opponent,
      value,
      time,
      message,
      error,
    } = this.state;

    const title = 'Have a quest?';

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
          <GameDescription status={gameStatus} submit={submit} opponent={opponent} />
          <GameTimer time={time} />
          <OptionForm
            status={gameStatus}
            submit={submit}
            value={value}
            change={this.handleChangeOption}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          { (gameStatus < 0 || gameStatus > 3) && (<LoadingButton text="Find game" type="default" action={this.handleFindGameClick} />)}
          { (gameStatus === 0 || gameStatus === 1) && (<LoadingButton text="Cancel" type="cancel" action={this.handleCancelGameClick} />)}
          { gameStatus === 1 && !submit && (
            <LoadingButton text="Submit" type="confirm" action={this.handleSubmitGameClick} />
          )}
          { gameStatus === 2 && !submit && (
            <LoadingButton text="Confirm" type="confirm" action={this.handleSuccessOptionClick} />
          )}
        </CardActions>
      </Card>
    );
  }
}

StartGameCard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartGameCard);
