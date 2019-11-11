import React from 'react';
import { Dimmer, Grid, GridColumn, GridRow, Loader } from 'semantic-ui-react';
import { AUTHENTICATION, REALTIME, TRIPS } from '../../../actions';
import { connect } from 'react-redux';
import TaskBar from './TaskBar/TaskBar';
import MapWrapper from './MapWrapper';
import TripDetailsOperations from './Operations/TripDetailsOperations';


import { Stomp } from '@stomp/stompjs';

const socketsConfig = (tripId, props) => ({
  endpoint: 'ws://localhost:8080/ws',
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
  ],
  subscriptions: [],
});

class TripDetails extends React.Component {
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
      <Grid style={{ height: 'calc(100vh - 80px)' }}>
        <GridRow style={{ height: '120px', paddingBottom: '0px' }}>
          <TaskBar {...props.details} />
        </GridRow>
        <GridRow style={{ paddingBottom: '0px', height: 'calc(100% - 120px)' }}>
          <GridColumn width={6} style={{ paddingRight: '0px' }}>
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
  }
}



const mapStateToProps = state => ({
  ...state.tripDetails,

  currentUser: state.authentication.currentUser,
  stompClient: state.websockets.stompClient,
});



const mapDispatchToProps = {
  fetchTripDetails: TRIPS.fetchTripDetails,
  fetchCurrentUser: AUTHENTICATION.fetchCurrentUser,
  notify: REALTIME.notify,
  registerClient: REALTIME.registerClient,
  unregisterClient: REALTIME.unregisterClient,
  addMessage: REALTIME.addMessage,
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetails);
