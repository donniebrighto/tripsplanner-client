import React from 'react';
import {
  Card,
  Dimmer,
  Grid,
  GridColumn,
  GridRow,
  Loader,
} from 'semantic-ui-react';

import { TRIPS } from '../../../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskBar from './TaskBar/TaskBar';
import MapWrapper from './MapWrapper';

const TripDetails = props => {
  const { id } = useParams();

  if (!props.details) {
    if (!props.isLoading) props.fetchTripDetails(id);

    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  return (
    <Grid style={{ height: 'calc(100vh - 80px)' }}>
      <GridRow style={{ height: '120px', paddingBottom: '0px' }}>
        <TaskBar {...props.details} />
      </GridRow>
      <GridRow style={{ paddingBottom: '0px' }}>
        <GridColumn width={6}>
          <Card.Group>
            <Card fluid color="red" header="Option 1" />
            <Card fluid color="orange" header="Option 2" />
            <Card fluid color="yellow" header="Option 3" />
          </Card.Group>
        </GridColumn>
        <GridColumn width={10} style={{ minHeight: '500px' }}>
          <MapWrapper locationId={props.details.destination.locationId} />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

const mapStateToProps = state => ({
  ...state.tripDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchTripDetails: tripId => dispatch(TRIPS.fetchTripDetails(tripId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetails);
