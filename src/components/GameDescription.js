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

const GameDescription = (props) => {
  const {
    classes,
    status,
    submit,
    opponent,
  } = props;

  let text = '';
  switch (status) {
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
        text = `Ваш оппонент ${opponent}\nВы сыграли игру?`;
      }
      break;
    case 3:
      text = 'Открыт спор';
      break;
    case 4:
      text = 'Игра закончена';
      break;
    case 5:
      text = 'Игра была отменена';
      break;
    default:
      text = 'Статус игры неизвестен';
      break;
  }

  return (
    <Typography className={classes.text}>{text}</Typography>
  );
};

GameDescription.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.number.isRequired,
  submit: PropTypes.bool,
  opponent: PropTypes.string,
};

GameDescription.defaultProps = {
  submit: false,
  opponent: '',
};

export default withStyles(styles)(GameDescription);
