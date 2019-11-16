import React, { useEffect } from 'react';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { local } from '../../config/endpoints';
import { AUTHENTICATION } from '../../actions';
import { connect } from 'react-redux';

const AuthSpecificMenuItem = props => {
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (!props.currentUser && !props.isLoading) {
        props.fetchCurrentUser();
      }
    }
  }, []);

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
      <Menu.Item as="a" href={local.auth.oauth2}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSpecificMenuItem);
