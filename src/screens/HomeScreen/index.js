import React from 'react';
import { TopMenu, LoginForm, StartPageDescription } from 'components';

import { withRouter } from 'react-router-dom';
import { token } from 'helpers';

import './style.scss';

const HomeScreen = (props) => {
  const checkLogin = async (authToken) => {
    const response = await fetch('http://localhost:9000/api/v1/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    const json = await response.json();
    if (json.success) { //  Пользователь есть
      const { history } = props;
      history.push('/');
    }
  };
  const authToken = token.getToken();
  if (authToken) {
    checkLogin(authToken); //  Здесь проверка токена и редирект на следующую страницу
  }

  return (
    <div className="home-layout">
      <TopMenu />
      <div id="home-layout-body">
        <StartPageDescription />
        <LoginForm />
      </div>
    </div>
  );
};

export default withRouter(HomeScreen);
