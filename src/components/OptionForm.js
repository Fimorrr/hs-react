import React from 'react';
import PropTypes from 'prop-types';

import { theme } from 'helpers';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  group: {
    margin: '0px',
  },
};

const OptionForm = (props) => {
  const {
    classes,
    value,
    change,
    status,
    submit,
  } = props;

  if (status === 2 && !submit) {
    return (
      <div className={classes.root}>
        <RadioGroup
          classes={{ root: classes.group }}
          onChange={change}
          value={value}
        >
          <FormControlLabel value="0" control={<Radio color={theme.color1} />} label="Игра прошла успешно" />
          <FormControlLabel value="1" control={<Radio color={theme.color1} />} label="Сыграть не удалось" />
          <FormControlLabel value="2" control={<Radio color={theme.color1} />} label="Оппонент меня обманул" />
        </RadioGroup>
      </div>
    );
  }

  return '';
};

OptionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
  submit: PropTypes.bool,
};

OptionForm.defaultProps = {
  submit: false,
};

export default withStyles(styles)(OptionForm);
