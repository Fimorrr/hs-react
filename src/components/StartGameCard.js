import React from 'react';
import PropTypes from 'prop-types';
import { GameTimer, LoadingButton } from 'components';

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
  text: {
    width: '100%',
    textAlign: 'center',
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
    justifyContent: 'center',
    paddingBottom: 20,
  },
};

class StartGameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: -1,
      submit: false,
      time: null,
      message: '',
      error: false,
    };

    this.handleFindGameClick = this.handleFindGameClick.bind(this);
    this.handleCancelGameClick = this.handleCancelGameClick.bind(this);
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
      const { status, submit } = json.game;
      this.setState(() => ({
        gameStatus: status,
        submit,
        time: json.game.time,
        message: `game status: ${json.game.status}`,
      }));
      //  Задаем таймер, если статус позволяет
      if (status === 0 || status === 1) {
        this.interval = setInterval(() => {
          this.setState(() => {
            const { time } = this.state;
            console.log(`im alive ${time}`);
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

  sendGameRequest = async (request, authToken) => {
    const response = await fetch(endpoints.getUrl(`game/${request}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
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

  handleFindGameClick = async () => {
    await this.sendGameRequest('search', token.getToken());
  }

  handleCancelGameClick = async () => {
    await this.sendGameRequest('cancel', token.getToken());
  }

  render() {
    const { classes } = this.props;
    const {
      gameStatus,
      submit,
      time,
      message,
      error,
    } = this.state;

    const title = 'Have a quest?';

    let text = '';
    switch (gameStatus) {
      case -1:
        text = 'Предыдущих игр нет';
        break;
      case 0:
        text = 'Поиск игры';
        break;
      case 1:
        if (submit) {
          text = 'Ожидание подтверждения игры опонентом';
        } else {
          text = 'Подтвердите готовность';
        }
        break;
      case 2:
        if (submit) {
          text = 'Ожидание подтверждения игры опонентом';
        } else {
          text = 'Отыграли игру?';
        }
        break;
      case 4:
        text = 'Игра была отменена';
        break;
      default:
        text = 'Статус игры неизвестен';
        break;
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
          <Typography className={classes.text}>{text}</Typography>
          <GameTimer time={time} />
        </CardContent>
        <CardActions className={classes.actions}>
          { gameStatus !== 0 && (<LoadingButton text="Find game" type="default" action={this.handleFindGameClick} />)}
          { gameStatus === 0 && (<LoadingButton text="Cancel game" type="cancel" action={this.handleCancelGameClick} />)}
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
