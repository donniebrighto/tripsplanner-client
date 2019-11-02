import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from './components/Home';
import NewPlanForm from './components/Trip/Create/CreateTripForm';
import OAuth2RedirectHandler from './components/Auth/OAuth2RedirectHandler';
import TripDetails from './components/Trip/Planning/TripDetails';
import { TripsView } from './components/Trip/TripsView';

const isUserAuthenticated = () => !!localStorage.getItem('accessToken');

function prepareRedirect() {
  return props => {
    const redirectOptions = {
      pathname: '/', // TODO - obsługa sytuacji z błędem autoryzacji
      state: { from: props.location },
    };
    return <Redirect to={redirectOptions} />;
  };
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  let toRender;
  if (isUserAuthenticated()) {
    toRender = props => <Component {...props} />;
  } else {
    toRender = prepareRedirect();
  }
  return <Route {...rest} render={toRender} />;
};

export const Routes = props => {
  const { routes } = props;
  if (routes) {
    const publicRoutes = routes.public.map((options, key) => (
      <Route {...options} key={key} />
    ));
    const privateRoutes = routes.private.map((options, key) => (
      <PrivateRoute {...options} key={key} />
    ));

    return (
      <Switch>
        {publicRoutes}
        {privateRoutes}
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/trips" component={TripsView} />
      <PrivateRoute path="/create" component={NewPlanForm} />
      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
      <Route path="/trips/:id" component={TripDetails} />
    </Switch>
  );
};
