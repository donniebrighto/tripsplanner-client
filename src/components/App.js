import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Footer from './Footer';
import Menu from './Menu';
import Plans from './Plans';
import Home from './Home';
import Checklists from "./Checklists";
import NewPlanForm from "../containers/NewPlanForm";

const SemanticApp = () => (
    <div>
        <Menu/>

        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/plans" component={Plans}/>
            <Route path="/plans/create" component={NewPlanForm}/>
            <Route path="/checklists" component={Checklists}/>
        </Switch>

        <Footer/>
    </div>
);

export default SemanticApp