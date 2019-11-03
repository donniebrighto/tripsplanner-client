import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const MainMenu = () => {
  return (
    <Menu secondary style={{ marginBottom: '0' }}>
      <Menu.Item as={Link} to="/" exact header>
        <Icon name="travel" />
        Kreator Podróży
      </Menu.Item>
      <MainNavigation />
    </Menu>
  );
};

export default MainMenu;
