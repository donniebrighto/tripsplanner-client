import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { Routes } from '../../../../Routes';
import ExplorePlaces from './ExplorePlaces';





import Chat from './Chat';






const routes = path => ({
  private: [
    { path: `${path}/explore`, component: ExplorePlaces },
    { path: `${path}/chat`, component: Chat },
  ],
});

const TripDetailsOperations = () => {
  const { url, path } = useRouteMatch();

  return (
    <React.Fragment>
      <div style={{ height: 'calc(100% - 40px)', padding: '5px' }}>
        <Routes routes={routes(path)} />
      </div>
      <Menu fluid widths={5} attached="bottom" tabular>
        <Menu.Item as={NavLink} to={`${url}/explore`}>
          <Icon name="search" />
          Szukaj
        </Menu.Item>
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
