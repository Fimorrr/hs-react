import React from 'react';
import PropTypes from 'prop-types';

import { token, theme } from 'helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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

class StartGameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: false,
      loading: false,
    };
  }

  componentDidMount() {
    const authToken = token.getToken();
    if (authToken) {
      console.log(authToken); //  Здесь проверка токена и редирект на следующую страницу
    }
  }

  handleNextClick = async () => {
    this.setState(() => ({ loading: false }));
  }

  render() {
    const { classes } = this.props;
    const {
      message,
      error,
      loading,
    } = this.state;

    const title = 'Your last games';

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
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.wrapper}>
            <Button
              color="primary"
              disabled={loading}
              onClick={this.handleNextClick}
            >
              Show more
            </Button>
            { loading && <CircularProgress size={20} className={classes.buttonProgress} /> }
          </div>
        </CardActions>
      </Card>
    );
  }
}

StartGameCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartGameCard);
