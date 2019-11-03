import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const TripDetailsOperations = props => {
  const { url } = useRouteMatch();

  return (
    <React.Fragment>
      <div style={{ height: 'calc(100% - 42px)' }} />
      <Menu fluid widths={4} attached="bottom" tabular>
        <Menu.Item as={NavLink} to={`${url}/plan`}>
          <Icon name="numbered list" />
          Plan
        </Menu.Item>
        <Menu.Item as={NavLink} to={`${url}/accommodation`}>
          <Icon name="home" />
          Nocleg
        </Menu.Item>
        <Menu.Item as={NavLink} to={`${url}/transport`}>
          <Icon name="bus" />
          Transport
        </Menu.Item>
        <Menu.Item as={NavLink} to={`${url}/chat`}>
          <Icon name="chat" />
          Czat
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default TripDetailsOperations;
