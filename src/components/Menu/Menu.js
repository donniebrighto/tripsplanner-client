import React from 'react';
import {Container, Icon, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';

import AuthenticatedUserMenu from "./AuthenticatedUserMenu";
import NotAuthenticatedUserMenu from "./NotAuthenticatedUserMenu";

const MainMenu = () => {
    let navigation;

    if (localStorage.getItem("userId")) {
        navigation = <AuthenticatedUserMenu/>
    } else {
        navigation = <NotAuthenticatedUserMenu/>
    }

    return (
        <Menu pointing secondary>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <Icon name="travel"/>
                    Kreator Podróży
                </Menu.Item>
                {navigation}
            </Container>
        </Menu>
    );
};

const mapStateToProps = (state) => ({...state.authentication});

export default connect(mapStateToProps)(MainMenu);