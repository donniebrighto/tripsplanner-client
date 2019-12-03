import React from 'react';
import { Dimmer, Grid, GridColumn, GridRow, Loader } from 'semantic-ui-react';
import { AUTHENTICATION } from '../../actions';
import { connect } from 'react-redux';
import TaskBar from '../../components/planning/TaskBar/TaskBar';
import MapContainer from './MapContainer';
import TripDetailsOperations from '../../components/planning/TripDetailsOperations';
import { PLANNING } from '../../actions/planning';

import { Stomp } from '@stomp/stompjs';

const socketsConfig = (tripId, props) => ({
  endpoint: `ws://trips-planner-api.herokuapp.com/ws`,
  topics: [
    {
      destination: `/topic/${tripId}/chat`,
      onMessageReceived: payload => {
        const { addMessage } = props;
        const message = JSON.parse(payload.body);
        addMessage(message);
      },
    },
    {
      destination: `/topic/${tripId}/notifications`,
      onMessageReceived: payload => {
        const { notify } = props;
        const notification = JSON.parse(payload.body);
        notify(notification);
      },
    },
    {
      destination: `/topic/${tripId}/trip-points`,
      onMessageReceived: payload => {
        const { addTripPoint } = props;
        const tripPoint = JSON.parse(payload.body);
        addTripPoint(tripId, tripPoint);
      },
    },
  ],
  subscriptions: [],
});

class TripPlanningContainer extends React.Component {
  config;
  stompClient;
  id;

  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.config = socketsConfig(this.id, props);
    this.stompClient = Stomp.client(this.config.endpoint);
    this.onConnected = this.onConnected.bind(this);
    this.sendStatusNotification = this.sendStatusNotification.bind(this);
    this.connectWithSockets = this.connectWithSockets.bind(this);
  }

  onConnected = () => {
    const { config, stompClient } = this;
    this.subscribeToEachTopic(config, stompClient);
    this.sendStatusNotification(stompClient, true);
  };

  sendStatusNotification(stompClient, isOnline, callback = () => null) {
    const { id } = this;
    const destination = `/app/${id}/notifications`;
    const notification = {
      sender: this.props.currentUser,
      connected: isOnline,
    };
    stompClient.send(destination, {}, JSON.stringify(notification));

    callback();
  }

  subscribeToEachTopic(config, stompClient) {
    config.topics.forEach(topic => {
      console.log(topic.destination);

      const subscription = stompClient.subscribe(
        topic.destination,
        topic.onMessageReceived
      );
      config.subscriptions.push(subscription);
    });
  }

  onError = error => console.log(error);

  componentDidMount() {
    const { props } = this;
    const { currentUser, fetchCurrentUser } = props;
    if (!currentUser) {
      fetchCurrentUser();
    } else {
      this.connectWithSockets();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.connectWithSockets();
  }

  connectWithSockets() {
    const { stompClient, registerClient, currentUser } = this.props;
    if (currentUser && !stompClient) {
      this.stompClient.connect({}, this.onConnected, this.onError);
      registerClient(this.stompClient);
    }
  }

  componentWillUnmount() {
    const { stompClient, config, props } = this;
    const callback = () => {
      config.subscriptions.forEach(sub => sub.unsubscribe());
      stompClient.disconnect(() => {
        config.subscriptions = [];
        props.unregisterClient();
      });
    };
    this.sendStatusNotification(stompClient, false, callback);
  }

  render() {
    const { props } = this;

    if (!props.details) {
      const { id } = props.match.params;
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
            <MapContainer
              style={{ height: '100%' }}
              locationId={props.details.destination.locationId}
            />
          </GridColumn>
        </GridRow>
      </Grid>
    );
  }
}

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
  addTripPoint: PLANNING.PLAN.addTripPoint,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPlanningContainer);
