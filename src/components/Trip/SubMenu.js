import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { Flag, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { AUTHENTICATION } from '../../actions';
import { connect } from 'react-redux';

const SubMenu = props => {
  const { futureTrips, isLoading, fetchCurrentUser } = props;

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      if (!futureTrips && !isLoading) {
        fetchCurrentUser();
      }
    }
  });

  const { url } = useRouteMatch();
  let tripsMenuOptions;

  if (futureTrips && futureTrips.length) {
    tripsMenuOptions = futureTrips.map((trip, key) => (
      <Menu.Item key={key} as={NavLink} to={`${url}/create/${trip.id}`}>
        {trip.destination && <Flag name={trip.destination.iso2flag} />}
        {trip.name}
      </Menu.Item>
    ));
  }

  return (
    <Menu pointing secondary style={{ marginTop: 0 }}>
      {!!tripsMenuOptions && <Menu.Menu>{tripsMenuOptions}</Menu.Menu>}
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to={`${url}/create`}>
          <Icon name="add" />
          Stwórz
        </Menu.Item>
        <Menu.Item as={NavLink} to={`${url}/explore`}>
          <Icon name="find" />
          Przeglądaj
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = state => ({ ...state.authentication });
const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubMenu);
