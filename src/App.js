import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Footer from './components/Footer';
import Menu from './components/Menu/Menu';
import Plans from './components/Plans';
import Home from './components/Home';
import NewPlanForm from "./components/PlanForm/NewPlanForm";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import HereMap from "./api/here/map/HereMap";

const isUserAuthenticated = () => !!localStorage.getItem('userId');

const ProtectedRoute = ({isUserAuthenticated, ...props}) =>
    isUserAuthenticated()
    ? <Route {...props}/>
    : <Redirect to="/login"/>;

const SemanticApp = () => (
    <div>
        <Menu/>

        <Switch>
            <Route exact path="/" component={Home}/>
            <ProtectedRoute isUserAuthenticated={isUserAuthenticated} exact path="/plans" component={Plans}/>
            <ProtectedRoute isUserAuthenticated={isUserAuthenticated} path="/create" component={NewPlanForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/map" component={HereMap}/>
        </Switch>

        <Footer/>
    </div>
);

const mapStateToProps = ({authentication}) => ({ isUserAuthenticated: authentication.isUserAuthenticated });

export default connect(mapStateToProps)(SemanticApp);