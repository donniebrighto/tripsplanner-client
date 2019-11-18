import React from 'react';
import { Menu } from 'semantic-ui-react';
import { mapRoutesToMenuItems } from './mapper';
import { useParams } from 'react-router';

const PlanningOperationsMenu = props => {
  const { id } = useParams();
  const { routes } = props;
  const items = mapRoutesToMenuItems(routes, id);

  return (
    <Menu fluid widths={5} attached="bottom" tabular>
      {items}
    </Menu>
  );
};

export default PlanningOperationsMenu;
