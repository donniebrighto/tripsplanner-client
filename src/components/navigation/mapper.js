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

function mapToItems(allRoutes, id) {
  return allRoutes.map(({ path, link }, key) => {
    console.log(link);
    const { to, icon, text } = link;
    if (id && to) {
      path = to(id);
    }

    return (
      <Menu.Item as={NavLink} to={path} key={key}>
        <Icon name={icon} />
        {text}
      </Menu.Item>
    );
  });
}

const mapRoutesToMenuItems = (routes, id) => {
  let allRoutes = concatPublicAndPrivateRoutes(routes);
  allRoutes = allRoutes.filter(route => !!route.link);
  return mapToItems(allRoutes, id);
};

export { mapRoutesToMenuItems };
