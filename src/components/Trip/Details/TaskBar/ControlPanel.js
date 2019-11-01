import React from 'react';
import { Button, Search } from 'semantic-ui-react';
import FilterButton from './FilterButton';

const ControlPanel = props => (
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
      <FilterButton icon="food" color="olive" description="Restauracje" />
      <FilterButton icon="film" color="green" description="Rozrywka" />
      <FilterButton icon="coffee" color="teal" description="Kawiarnie" />
      <FilterButton icon="camera" color="blue" description="Zwiedzanie" />
      <FilterButton icon="beer" color="violet" description="Puby" />
      <FilterButton icon="home" color="purple" description="Hotele" />
      <FilterButton icon="shopping bag" color="pink" description="Zakupy" />
      <Search />
    </div>
  </div>
);

export default ControlPanel;
