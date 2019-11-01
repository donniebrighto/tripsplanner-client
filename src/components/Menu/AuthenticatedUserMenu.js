import React from 'react';
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { AUTHENTICATION } from '../../actions';

const trigger = props => {
  if (!props.isLoading && props.userAuthenticated) {
    const { imageUrl, name } = props.currentUser;
    return (
      <span>
        <Image avatar src={imageUrl} />
        {name}
      </span>
    );
  }
};

const AuthenticatedUserMenu = props => (
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
    <Dropdown loading={props.isLoading} trigger={trigger(props)} item simple>
      <Dropdown.Menu>
        <Dropdown.Item onClick={props.logout}>
          <Icon name="log out" />
          Wyloguj
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>
);

const mapStateToProps = state => ({ ...state.authentication });
const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('accessToken');
    dispatch(AUTHENTICATION.logout());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedUserMenu);
