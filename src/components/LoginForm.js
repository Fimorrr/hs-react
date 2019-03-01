import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    width: 345,
    background: 'white',
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
    width: '90%',
  },
  actions: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
};

function LoginForm(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader classes={{ root: classes.header, title: classes.title }} titleColor="white" title="Sign in" />
      <CardContent>
        <TextField
          id="battletag"
          label="BattleTag"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary">
          Next
        </Button>
      </CardActions>
    </Card>
  );
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
