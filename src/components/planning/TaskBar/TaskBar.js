import React from 'react';
import { Dimmer, GridColumn, Loader } from 'semantic-ui-react';
import TripHeader from './TripHeader';
import TripMembersList from './TripMembersList';
import SearchPlacesPanel from './SearchPlacesPanel';

const TaskBar = props => {
  const { name, destination, startDate, endDate, tags, memberships } = props;

  if (!destination) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  return (
    <React.Fragment>
      <GridColumn style={{ paddingLeft: '30px', height: '100%' }} width={3}>
        <TripHeader
          name={name}
          flag={destination.iso2flag}
          destination={destination.label}
          startDate={startDate}
          endDate={endDate}
          date={`${startDate} - ${endDate}`}
          tags={tags}
        />
      </GridColumn>
      <GridColumn width={3} style={{ padding: '0', height: '100%' }}>
        <TripMembersList memberships={memberships} />
      </GridColumn>
      <GridColumn width={10}>
        <SearchPlacesPanel />
      </GridColumn>
    </React.Fragment>
  );
};

export default TaskBar;
