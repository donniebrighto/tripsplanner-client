import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';

import { AUTHENTICATION } from '../../actions';
import { endpoints } from '../../api/local/config';

const AuthSpecificElement = props => {
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (!props.currentUser) {
        props.fetchCurrentUser();
      }
    }
  });

  if (props.currentUser) {
    return (
      <Dropdown
        loading={props.isLoading}
        trigger={
          <span>
            <Icon name="user" />
            Profil
          </span>
        }
        item
        simple
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.logout}>
            <Icon name="log out" />
            Wyloguj
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Menu.Menu position="right">
      <Menu.Item as="a" href={endpoints.auth.oauth2}>
        <Icon name="google plus" color="red" />
        Dołącz
      </Menu.Item>
    </Menu.Menu>
  );
};
const mapStateToProps = ({ authentication }) => ({ ...authentication });
const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
  logout: AUTHENTICATION.logout,
};
const ConnectedAuthSpecificElement = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSpecificElement);

const MainNavigation = props => (
  <Menu.Menu position="right">
    <Menu.Item as={NavLink} to="/flights">
      <Icon name="plane" />
      Loty
    </Menu.Item>
    <Menu.Item as={NavLink} to="/accommodations">
      <Icon name="hotel" />
      Hotele
    </Menu.Item>
    <Menu.Item as={NavLink} to="/trips">
      <Icon name="travel" />
      Podróże
    </Menu.Item>
    <ConnectedAuthSpecificElement {...props} />
  </Menu.Menu>
);

export default MainNavigation;
