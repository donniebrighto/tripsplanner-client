import React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import Home from './components/Home';
import ExploreTrips from './components/Trip/ExploreTrips';
import NewPlanForm from './components/PlanForm/NewPlanForm';
import OAuth2RedirectHandler from './components/Auth/OAuth2RedirectHandler';
import TripDetails from './components/Trip/Details/TripDetails';

const isUserAuthenticated = () => !!localStorage.getItem('accessToken');

function prepareRedirect() {
  return props => {
    const redirectOptions = {
      pathname: '/', // TODO - obsługa sytuacji z błędem autoryzacji
      state: {from: props.location},
    };
    return <Redirect to={redirectOptions}/>;
  };
}

const PrivateRoute = ({component: Component, ...rest}) => {
  let toRender;
  if (isUserAuthenticated()) {
    toRender = props => <Component {...props} />;
  } else {
    toRender = prepareRedirect();
  }
  return <Route {...rest} render={toRender}/>;
};

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <PrivateRoute exact path="/trips" component={ExploreTrips}/>
    <PrivateRoute path="/create" component={NewPlanForm}/>
    <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
    <Route path="/trips/:id" component={TripDetails}/>
  </Switch>
);
