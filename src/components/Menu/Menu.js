import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import NotAuthenticatedUserMenu from './NotAuthenticatedUserMenu';

const MainMenu = props => {
  let navigation;

  if (props.userAuthenticated && localStorage.getItem('accessToken')) {
    navigation = <AuthenticatedUserMenu />;
  } else {
    navigation = <NotAuthenticatedUserMenu />;
  }

  return (
    <Menu stackable>
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <Icon name="travel" />
          Kreator Podróży
        </Menu.Item>
        {navigation}
      </Container>
    </Menu>
  );
};
const mapStateToProps = ({ authentication }) => ({ ...authentication });
export default connect(mapStateToProps)(MainMenu);
