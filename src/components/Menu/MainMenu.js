import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const MainMenu = () => {
  return (
    <Menu stackable>
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <Icon name="travel" />
          Kreator Podróży
        </Menu.Item>
        <MainNavigation />
      </Container>
    </Menu>
  );
};

export default MainMenu;
