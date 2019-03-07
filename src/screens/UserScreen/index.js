import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { token } from 'helpers';

import {
  TopMenu,
  StartGameCard,
  LastGamesCard,
  ProfileCard,
} from 'components';

import './style.scss';

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      user: {},
    };
  }

  componentDidMount() {
    const authToken = token.getToken();
    if (authToken) {
      this.checkLogin(authToken); //  Здесь проверка токена и редирект на следующую страницу
    } else {
      const { history } = this.props;
      history.push('/login');
    }
  }

  checkLogin = async (authToken) => {
    const response = await fetch('http://localhost:9000/api/v1/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const json = await response.json();
    if (json.success) { //  Пользователь есть
      this.setState(() => ({
        login: true,
        user: json.user,
      }));
    } else {
      const { history } = this.props;
      history.push('/login');
    }
  };

  render() {
    const { login, user } = this.state;

    return (
      <div className="user-layout">
        <TopMenu />
        {login && (
          <div id="user-layout-body">
            <StartGameCard />
            <LastGamesCard />
            <ProfileCard user={user} />
          </div>)}
      </div>
    );
  }
}

UserScreen.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(UserScreen);
