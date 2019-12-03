import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Dimmer,
  Header,
  Image,
  Loader,
} from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router';
import Rating from '../../components/planning/Rating';
import { tripPlanningUrl } from '../../config/routes';
import { PLANNING } from '../../actions/planning';
import { connect } from 'react-redux';
import { local } from '../../config/endpoints';
import AddToPlanPopup from './AddToPlanPopup';

const LoadingIndicator = ({ active }) => {
  return (
    <Dimmer active={active} inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
};

const formatOpeningHours = opening_hours => {
  if (!opening_hours) return '\tBrak danych';
  const { weekday_text } = opening_hours;
  return weekday_text.map((weekday, key) => <div key={key}>{weekday}</div>);
};

const PlaceDetails = props => {
  const { placeId, photoReference, id } = useParams();
  const history = useHistory();
  const { fetchPlaceDetails, details, isLoading, resetPlaceDetails } = props;
  useEffect(() => {
    fetchPlaceDetails(placeId);
  }, []);

  if (!details || isLoading) {
    return <LoadingIndicator active={isLoading} />;
  }

  const {
    name,
    rating,
    vicinity,
    international_phone_number,
    website,
    url,
    opening_hours,
  } = details.result;

  return (
    <Container
      textAlign="center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div>
        <Button
          onClick={() => {
            resetPlaceDetails();
            history.push(`${tripPlanningUrl(id)}/search`);
          }}
          basic
          icon="arrow left"
          floated="left"
        />
        <div style={{ float: 'right' }}>
          <Header as="h3">
            <Rating rating={rating} />
          </Header>
        </div>
        <div>
          <Image
            src={local.google.photo(photoReference, 200)}
            centered
            circular
          />
        </div>
        <Header as="h2" style={{ marginTop: '5px' }}>
          {name}
          <Header.Subheader>{vicinity}</Header.Subheader>
        </Header>
        Nr telefonu: {international_phone_number} <br />
        Strona internetowa: <a href={website}>{website}</a> <br />
        Godziny otwarcia:
        {formatOpeningHours(opening_hours)}
      </div>
      <div>
        <Button as="a" target="_blank" href={url} basic floated="left">
          Sprawdź w Google
        </Button>
        <AddToPlanPopup placeId={placeId} position="bottom right">
          <Button basic color="green" floated="right">
            Dodaj do planu
          </Button>
        </AddToPlanPopup>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  details: state.planning.placesSearch.details,
  isLoading: state.planning.placesSearch.isLoading,
  photoLoading: state.planning.placesSearch.photoLoading,
});

const mapDispatchToProps = {
  fetchPlaceDetails: PLANNING.PLACES_SEARCH.fetchPlaceDetails,
  resetPlaceDetails: PLANNING.PLACES_SEARCH.resetPlaceDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDetails);
