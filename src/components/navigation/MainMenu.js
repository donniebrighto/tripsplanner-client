import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { mainRoutes } from '../../config/routes';
import AuthSpecificMenuItem from '../../containers/navigation/AuthSpecificMenuItem';
import { mapRoutesToMenuItems } from './mapper';

const MainMenu = () => {
  const navigation = mapRoutesToMenuItems(mainRoutes);
  return (
    <Menu secondary>
      <Menu.Item as={Link} to="/" exact header>
        <Icon name="travel" />
        Kreator Podróży
      </Menu.Item>
      <Menu.Menu position="right">
        {navigation}
        <AuthSpecificMenuItem />
      </Menu.Menu>
    </Menu>
  );
};

export default MainMenu;
