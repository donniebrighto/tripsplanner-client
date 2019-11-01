import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dimmer, Dropdown, Icon, Loader, Menu } from 'semantic-ui-react';

import { AUTHENTICATION } from '../../actions';
import { endpoints } from '../../api/local/config';

const MainNavigation = props => {
  if (!localStorage.getItem('accessToken')) {
    return (
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/create">
          <Icon name="add" />
          Stwórz
        </Menu.Item>
        <Menu.Item as={NavLink} to="/trips">
          <Icon name="sort amount down" />
          Przegladaj
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="time" />
          Aktywne
        </Menu.Item>
        <Dropdown
          loading={props.isLoading}
          text="Profil"
          icon="user"
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
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigation);
