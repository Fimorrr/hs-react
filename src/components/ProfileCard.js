import React from 'react';
import PropTypes from 'prop-types';

import { theme } from 'helpers';

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

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      loading: false,
    };
  }

  handleNextClick = async () => {
    this.setState(() => ({ loading: false }));
  }

  render() {
    const { classes, user } = this.props;
    const {
      loading,
    } = this.state;

    const title = 'Profile';

    return (
      <Card className={classes.card}>
        <CardHeader classes={{ root: classes.header, title: classes.title }} titlecolor="white" title={title} />
        { user && (
        <CardContent>
          <Typography>
            BattleTag:
            {user.name}
          </Typography>
          <Typography>
            Registered:
            {user.createdAt}
          </Typography>
        </CardContent>)}
        <CardActions className={classes.actions}>
          <div className={classes.wrapper}>
            <Button
              color="primary"
              disabled={loading}
              onClick={this.handleNextClick}
            >
              Change password
            </Button>
            { loading && <CircularProgress size={20} className={classes.buttonProgress} /> }
          </div>
        </CardActions>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileCard);
