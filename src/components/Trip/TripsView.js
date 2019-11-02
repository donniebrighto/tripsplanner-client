import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';
import NewPlanForm from './Create/CreateTripForm';
import TripDetails from './Planning/TripDetails';
import ExploreTrips from './Explore/ExploreTrips';
import { Routes } from '../../Routes';
import { NavLink, useRouteMatch } from 'react-router-dom';

const routes = path => ({
  private: [
    { path: `${path}/create`, component: NewPlanForm },
    { path: `${path}/create/:id`, component: TripDetails },
  ],
  public: [{ path: `${path}/explore`, component: ExploreTrips }],
});

export const TripsView = () => {
  const { path } = useRouteMatch();
  return (
    <React.Fragment>
      <SubMenu />
      <Routes routes={routes(path)} />
    </React.Fragment>
  );
};

const SubMenu = props => {
  const { url } = useRouteMatch();

  return (
    <Container>
      <Menu pointing secondary>
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
    </Container>
  );
};
