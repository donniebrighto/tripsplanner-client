import React from 'react';
import { Button, Search } from 'semantic-ui-react';
import { categories } from './filterCategories';
import FilterButton from '../../../containers/planning/FilterButton';

const SearchPlacesPanel = () => {
  let filterButtons = categories.map((category, key) => (
    <FilterButton
      key={key}
      icon={category.icon}
      color={category.color}
      name={category.name}
      here={category.here}
    />
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: '30px',
        flexWrap: 'wrap',
      }}
    >
      <Button.Group style={{ marginBottom: '20px' }}>
        <Button basic color="red">
          Edycja
        </Button>
        <Button basic color="green">
          Powiadomienia
        </Button>
        <Button basic color="blue">
          Pomoc
        </Button>
      </Button.Group>
      <div style={{ display: 'flex' }}>
        {filterButtons}
        <Search />
      </div>
    </div>
  );
};

export default SearchPlacesPanel;
