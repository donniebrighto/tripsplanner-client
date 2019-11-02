import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import NewPlanForm from './Create/CreateTripForm';
import TripDetails from './Planning/TripDetails';
import ExploreTrips from './Explore/ExploreTrips';
import { Routes } from '../../Routes';
import { NavLink } from 'react-router-dom';

const routes = {
  private: [
    { path: '/create', component: NewPlanForm },
    { path: '/create/:id', component: TripDetails },
  ],
  public: [{ path: '/explore', component: ExploreTrips }],
};

export const TripsView = () => (
  <React.Fragment>
    <SubMenu />
    <Routes routes={routes} />
  </React.Fragment>
);

const SubMenu = props => {
  return (
    <Menu pointing secondary>
      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/create">
          <Icon name="add" />
          Stwórz
        </Menu.Item>
        <Menu.Item as={NavLink} to="/explore">
          <Icon name="find" />
          Przeglądaj
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
