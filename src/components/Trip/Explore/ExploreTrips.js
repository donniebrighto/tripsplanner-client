import React, { useEffect } from 'react';
import {
  Card,
  Container,
  Dimmer,
  Image,
  Loader,
  Segment,
} from 'semantic-ui-react';
import SectionHeader from '../../SectionHeader';

import { TRIPS } from '../../../actions';
import { connect } from 'react-redux';
import TripCard from './TripCard';

const ExploreTrips = props => {
  const { isLoading, trips } = props;

  useEffect(() => {
    if (!isLoading && !trips) {
      props.fetchTrips();
    }
  });

  if (isLoading || !trips) {
    return (
      <Container>
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      </Container>
    );
  }

  const cards = trips.map((trip, key) => <TripCard key={key} {...trip} />);

  return (
    <Container>
      <SectionHeader
        title="Plany wycieczek"
        subtitle="Przeglądaj plany stworzone przez innych użytkowników"
        iconName="briefcase"
      />
      <Card.Group itemsPerRow={3} stackable>
        {cards}
      </Card.Group>
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state.exploreTrips,
});

const mapDispatchToProps = {
  fetchTrips: TRIPS.fetchTrips,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreTrips);
