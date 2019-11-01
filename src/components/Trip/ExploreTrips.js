import React, { Component } from 'react';
import {
  Card,
  Container,
  Dimmer,
  Image,
  Loader,
  Segment,
} from 'semantic-ui-react';
import SectionHeader from '../SectionHeader';

import { AUTHENTICATION, TRIPS } from '../../actions';
import { connect } from 'react-redux';
import TripCard from './TripCard';

class ExploreTrips extends Component {
  render() {
    let { isLoading, trips } = this.props;

    if (!isLoading && trips) {
      trips = trips.map((trip, key) => <TripCard key={key} {...trip} />);
    } else {
      this.props.fetchUserTrips();
      trips = (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }

    return (
      <Container style={{ paddingBottom: '20px' }}>
        <SectionHeader
          title="Plany wycieczek"
          subtitle="Przeglądaj plany stworzone przez innych użytkowników"
          iconName="briefcase"
        />

        <Card.Group itemsPerRow={3} stackable>
          {trips}
        </Card.Group>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.authentication.currentUser,
  userLoading: state.authentication.isLoading,
  ...state.exploreTrips,
});

const mapDispatchToProps = dispatch => ({
  fetchUserTrips: userId => dispatch(TRIPS.fetchUserTrips(userId)),
  fetchCurrentUser: () => dispatch(AUTHENTICATION.fetchCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreTrips);
