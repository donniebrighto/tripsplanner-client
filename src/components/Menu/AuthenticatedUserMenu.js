import React, {Component} from 'react';
import {Dropdown, Icon, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

class AuthenticatedUserMenu extends Component {

    render() {
        return (
            <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/create">
                    <Icon name="add"/>Stwórz
                </Menu.Item>
                <Menu.Item as={NavLink} to="/plans">
                    <Icon name="sort amount down"/>Przegladaj
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name="time"/>Aktywne
                </Menu.Item>
                <Dropdown item simple text='Profil'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon'/>
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        );
    }
}

export default AuthenticatedUserMenu;