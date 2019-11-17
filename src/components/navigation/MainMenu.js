import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import AuthSpecificMenuItem from '../../containers/navigation/AuthSpecificMenuItem';
import CurrentTripsDropdownItem from '../../containers/navigation/CurrentTripsDropdownItem';

const navigation = {
  create: {
    path: '/create',
    icon: 'add',
    text: 'Stwórz',
  },
  plan: {
    path: '/planning',
    icon: 'edit outline',
    text: 'Planuj',
  },
  explore: {
    path: '/explore',
    icon: 'list layout',
    text: 'Przeglądaj',
  },
};

const MainMenu = () => {
  const { create, plan, explore } = navigation;
  return (
    <Menu secondary>
      <Menu.Item as={Link} to="/" exact header>
        <Icon name="travel" />
        Kreator Podróży
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to={create.path}>
          <Icon name={create.icon} />
          {create.text}
        </Menu.Item>
        <CurrentTripsDropdownItem plan={plan} />
        <Menu.Item as={NavLink} to={explore.path}>
          <Icon name={explore.icon} />
          {explore.text}
        </Menu.Item>
        <AuthSpecificMenuItem />
      </Menu.Menu>
    </Menu>
  );
};

export default MainMenu;
