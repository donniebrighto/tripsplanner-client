import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { endpoints } from '../../api/local/config';

const NotAuthenticatedUserMenu = () => (
  <Menu.Menu position="right">
    <Menu.Item as="a" href={endpoints.auth.oauth2}>
      <Icon name="google plus" color="red" />
      Dołącz
    </Menu.Item>
  </Menu.Menu>
);

export default NotAuthenticatedUserMenu;
