import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Menu from './components/Menu/Menu';
import ExploreTrips from './components/Trip/ExploreTrips';
import Home from './components/Home';
import NewPlanForm from './components/PlanForm/NewPlanForm';
import HereMap from './api/here/map/HereMap';
import OAuth2RedirectHandler from './components/Auth/OAuth2RedirectHandler';
import { AUTHENTICATION } from './actions';
import { connect } from 'react-redux';
import TripDetails from './components/Trip/Details/TripDetails';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/', // TODO - obsługa sytuacji z błędem autoryzacji
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const isUserAuthenticated = () => !!localStorage.getItem('accessToken');

class SemanticApp extends Component {
  componentDidMount() {
    localStorage.getItem('accessToken') && this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>
        <Menu />

        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            authenticated={isUserAuthenticated}
            exact
            path="/trips"
            component={ExploreTrips}
          />
          <PrivateRoute
            authenticated={isUserAuthenticated}
            path="/create"
            component={NewPlanForm}
          />
          <Route path="/map" component={HereMap} />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
          <Route path="/trips/:id" component={TripDetails} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
};

export default connect(
  null,
  mapDispatchToProps
)(SemanticApp);
