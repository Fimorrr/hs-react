import React from 'react';
import {
  TopMenu,
  StartGameCard,
  LastGamesCard,
  ProfileCard,
} from 'components';

import './style.scss';

const UserScreen = () => (
  <div className="user-layout">
    <TopMenu />
    <div id="user-layout-body">
      <StartGameCard />
      <LastGamesCard />
      <ProfileCard />
    </div>
  </div>
);

export default UserScreen;
