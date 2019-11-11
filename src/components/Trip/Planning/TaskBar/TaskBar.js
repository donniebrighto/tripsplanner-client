import React from 'react';
import { Dimmer, GridColumn, Loader } from 'semantic-ui-react';
import TripHeader from './TripHeader';
import MembersList from './MembersList';
import ControlPanel from './ControlPanel';

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
          date={`${startDate} - ${endDate}`}
          tags={tags}
        />
      </GridColumn>
      <GridColumn width={3} style={{ padding: '0', height: '100%' }}>
        <MembersList memberships={memberships} />
      </GridColumn>
      <GridColumn width={10}>
        <ControlPanel />
      </GridColumn>
    </React.Fragment>
  );
};

export default TaskBar;
