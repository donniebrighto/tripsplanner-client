import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dimmer, Dropdown, Icon, Loader, Menu } from 'semantic-ui-react';

import { AUTHENTICATION } from '../../actions';
import { endpoints } from '../../api/local/config';

const getAuthSpecificElement = props => {
  if (!localStorage.getItem('accessToken')) {
    return (
      <Menu.Menu position="right">
        <Menu.Item as="a" href={endpoints.auth.oauth2}>
          <Icon name="google plus" color="red" />
          Dołącz
        </Menu.Item>
      </Menu.Menu>
    );
  }
  if (!props.currentUser) {
    props.fetchCurrentUser();
    return (
      <Dimmer active inverted style={{ height: '100%', width: '100%' }}>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

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
};

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
    <Menu.Item as="a" to="/trips">
      <Icon name="travel" />
      Podróże
    </Menu.Item>
    {getAuthSpecificElement(props)}
  </Menu.Menu>
);

const mapStateToProps = ({ authentication }) => ({ ...authentication });
const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigation);
