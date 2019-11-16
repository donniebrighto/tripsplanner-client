import React from 'react';
import { Dimmer, Grid, GridColumn, GridRow, Loader } from 'semantic-ui-react';
import { PLANNING, AUTHENTICATION } from '../../actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskBar from '../../components/planning/TaskBar/TaskBar';
import MapWrapper from './MapContainer';
import TripDetailsOperations from '../../components/planning/Operations/TripDetailsOperations';

const TripPlanningContainer = props => {
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
    <Grid style={{ height: 'calc(100vh - 40px)' }}>
      <GridRow style={{ height: '120px', paddingBottom: '0px' }}>
        <TaskBar {...props.details} />
      </GridRow>
      <GridRow style={{ paddingBottom: '0px', height: 'calc(100% - 120px)' }}>
        <GridColumn width={6} style={{ paddingRight: '0px', height: '100%' }}>
          <TripDetailsOperations />
        </GridColumn>
        <GridColumn
          width={10}
          style={{ minHeight: '500px', paddingLeft: '0px' }}
        >
          <MapWrapper locationId={props.details.destination.locationId} />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

const mapStateToProps = state => ({
  ...state.planning.tripPlanning,
  currentUser: state.authentication.currentUser,
  stompClient: state.planning.websocketsContext.stompClient,
});

const mapDispatchToProps = {
  fetchTripDetails: PLANNING.fetchTripDetails,
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
  notify: PLANNING.CHAT.notify,
  registerClient: PLANNING.WEBSOCKETS_CONTEXT.registerClient,
  unregisterClient: PLANNING.WEBSOCKETS_CONTEXT.unregisterClient,
  addMessage: PLANNING.CHAT.addMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPlanningContainer);
