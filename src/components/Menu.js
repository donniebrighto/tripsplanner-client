import React, {Component} from 'react';
import {Container, Dropdown, Icon, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

class MainMenu extends Component{

    render() {
        return (
            <Menu pointing secondary>
                <Container>
                    <Menu.Item as={NavLink} to="/" exact header>
                        <Icon name="travel"/>
                        Kreator Podróży
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item as={NavLink} to="/plans">Plany</Menu.Item>
                        <Menu.Item as={NavLink} to="/checklists">Listy</Menu.Item>
                        <Menu.Item as='a'>Budżet</Menu.Item>
                        <Dropdown item simple text='Profil'>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>Header Item</Dropdown.Header>
                                <Dropdown.Item>
                                    <i className='dropdown icon' />
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
                </Container>
            </Menu>
        );
    }
}

export default MainMenu;