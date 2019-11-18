import React, { useEffect } from 'react';
import {
  Container,
  Dimmer,
  Grid,
  Image,
  Loader,
  Segment,
} from 'semantic-ui-react';

import '../../components/exploring/masonry.css';
import { connect } from 'react-redux';
import { EXPLORING } from '../../actions/exploring';
import SectionHeader from '../../components/SectionHeader';
import TripCard from '../../components/exploring/TripCard';

const TripExploringContainer = props => {
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

  const cards = trips.map((trip, key) => {
    return (
      <Grid.Column key={key}>
        <TripCard key={key} {...trip} />
      </Grid.Column>
    );
  });

  return (
    <Container>
      <SectionHeader
        title="Plany wycieczek"
        subtitle="Przeglądaj plany stworzone przez innych użytkowników"
        iconName="briefcase"
      />
      <Grid columns={3} doubling stackable className="masonry">
        {cards}
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  ...state.exploring.tripsExploration,
});

const mapDispatchToProps = {
  fetchTrips: EXPLORING.fetchTrips,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripExploringContainer);
