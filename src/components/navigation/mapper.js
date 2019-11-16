import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

function concatPublicAndPrivateRoutes(routes) {
  let result = [];
  if (routes.private) {
    result = [...routes.private];
  }
  if (routes.public) {
    result = [...result, ...routes.public];
  }
  return result;
}

const mapRoutesToMenuItems = routes => {
  let allRoutes = concatPublicAndPrivateRoutes(routes);
  allRoutes = allRoutes.filter(route => !!route.link);
  return allRoutes.map(({ path, link }, key) => (
    <Menu.Item as={NavLink} to={path} key={key}>
      <Icon name={link.icon} />
      {link.text}
    </Menu.Item>
  ));
};

export { mapRoutesToMenuItems };
