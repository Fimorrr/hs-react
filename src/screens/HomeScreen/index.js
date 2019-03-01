import React from 'react';
import { TopMenu, LoginForm, StartPageDescription } from 'components';

import './style.scss';

const HomeScreen = () => (
  <div className="home-layout">
    <TopMenu />
    <div id="home-layout-body">
      <StartPageDescription />
      <LoginForm />
    </div>
  </div>
);

export default HomeScreen;
