import React from 'react';
import PropTypes from 'prop-types';
import { token } from 'helpers';
import { endpoints } from 'api';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  image: {
    width: '100%',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    fontSize: '20px',
    top: '2px',
    right: '2px',
    zIndex: 100,
  },
  container: {
    position: 'relative',
  },
};

const authToken = token.getToken();

class DisputeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: [],
    };
  }

  componentDidMount = async () => {
    const { images } = this.props;
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < images; i += 1) {
      await this.loadImage(i);
    }
    /* eslint-disable no-await-in-loop */
  }

  loadImage = async (number) => {
    const response = await fetch(endpoints.getUrl(`game/picture/${number}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const body = await response.blob();
    const objectURL = URL.createObjectURL(body);

    this.setState(({ urls }) => {
      const newUrl = urls.slice();
      newUrl[number] = objectURL;
      return {
        urls: newUrl,
      };
    });
  };

  render() {
    const { classes } = this.props;

    const { urls } = this.state;

    return (
      <div>
        {urls.map((item, index) => (
          <div className={classes.container}>
            <img className={classes.image} src={item} alt={index} />
            <span className={classes.close}>&times;</span>
          </div>
        ))}
      </div>
    );
  }
}

DisputeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  images: PropTypes.number.isRequired,
};

export default withStyles(styles)(DisputeForm);
