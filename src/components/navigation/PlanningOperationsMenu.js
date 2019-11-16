import React from 'react';
import { Menu } from 'semantic-ui-react';
import { mapRoutesToMenuItems } from './mapper';

const PlanningOperationsMenu = props => {
  const { routes } = props;
  const items = mapRoutesToMenuItems(routes);

  return (
    <Menu fluid widths={5} attached="bottom" tabular>
      {items}
    </Menu>
  );
};

export default PlanningOperationsMenu;
