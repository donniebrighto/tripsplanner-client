import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { categories } from './filterCategories';
import FilterButton from '../../../containers/planning/FilterButton';
import AutosuggestPlaceSearch from '../../../containers/planning/AutosuggestPlaceSearch';

const SearchPlacesPanel = () => {
  let filterButtons = categories.map((category, key) => (
    <FilterButton
      key={key}
      icon={category.icon}
      color={category.color}
      name={category.name}
      google={category.google}
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
        <Button basic color="blue">
          <Icon name="share square outline" color="blue" />
          Udostępnij
        </Button>
      </Button.Group>
      <div style={{ display: 'flex' }}>
        {filterButtons}
        <AutosuggestPlaceSearch />
      </div>
    </div>
  );
};

export default SearchPlacesPanel;
