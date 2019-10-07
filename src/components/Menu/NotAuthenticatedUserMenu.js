import React, {Component} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

class NotAuthenticatedUserMenu extends Component {

    render() {
        return (
            <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/login">
                    <Icon name="sign-in"/>Logowanie
                </Menu.Item>
                <Menu.Item as={NavLink} to="/register">
                    <Icon name="signup"/>Rejestracja
                </Menu.Item>
            </Menu.Menu>
        );
    }
}

export default NotAuthenticatedUserMenu;