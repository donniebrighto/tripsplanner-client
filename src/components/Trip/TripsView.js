import React from 'react';
import NewPlanForm from './Create/CreateTripForm';
import TripDetails from './Planning/TripDetails';
import ExploreTrips from './Explore/ExploreTrips';
import { Routes } from '../../Routes';
import { useRouteMatch } from 'react-router-dom';
import SubMenu from './SubMenu';

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
