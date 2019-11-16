import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form } from 'semantic-ui-react';
import { CREATION } from '../../actions';
import CitySearch from './CityAutocompleteDropdown';
import SectionHeader from '../../components/SectionHeader';

const LABELS = {
  NAME: 'name',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  TAGS: 'tags',
};

const TripCreationForm = props => {
  useEffect(() => {
    if (!props.isLoading && !props.available_tags.length) {
      props.fetchTags();
    }
  }, []);

  return (
    <Container style={{ paddingBottom: '15px' }}>
      <SectionHeader
        title="Stwórz wycieczkę"
        subtitle="Wypełnij poniższy formularz, aby rozpocząć tworzenia planu wycieczki"
        iconName="edit outline"
      />
      <Form onSubmit={props.submit(props)}>
        <Form.Field>
          <label>Nazwa wycieczki</label>
          <Form.Input
            type="text"
            placeholder="np. Fajna majóweczka w Budapeszcie"
            value={props.name}
            onChange={props.handleFillingData(LABELS.NAME)}
          />
        </Form.Field>
        <Form.Field>
          <label>Miasto</label>
          <CitySearch
            value={props.destination.name}
            minCharacters={3}
            onChange={props.handleFillingCity}
          />
        </Form.Field>
        <Form.Field>
          <label>Data rozpoczęcia</label>
          <Form.Input
            type="date"
            value={props.startDate}
            onChange={props.handleFillingData(LABELS.START_DATE)}
          />
        </Form.Field>
        <Form.Field>
          <label>Data zakończenia</label>
          <Form.Input
            type="date"
            value={props.endDate}
            onChange={props.handleFillingData(LABELS.END_DATE)}
          />
        </Form.Field>
        <Form.Field>
          <label>Tagi</label>
          <Form.Dropdown
            options={props.available_tags}
            placeholder="Dodaj tagi"
            loading={props.isLoading}
            search
            selection
            fluid
            multiple
            onChange={props.handleFillingData(LABELS.TAGS)}
          />
        </Form.Field>
        <Form.Field>
          <label>Zdjęcie wycieczki</label>
          <Form.Input
            type="file"
            accept="image/*"
            onChange={props.handleImageUpload}
          />
        </Form.Field>
        <Button fluid color="teal">
          Stwórz
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = state => {
  const {
    name,
    destination,
    startDate,
    endDate,
    tags,
    imageId,
  } = state.creation.tripCreationForm;

  const { isLoading, available_tags } = state.creation.tagAutocomplete;

  return {
    name,
    destination,
    startDate,
    endDate,
    chosen_tags: tags,
    available_tags,
    isLoading,
    imageId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFillingData: label => {
      return function(event, { value }) {
        dispatch(CREATION.fillField(label, value));
      };
    },
    handleFillingCity: (event, { value, options }) => {
      const data = options[value];
      dispatch(CREATION.storeCityData(data.text, data.key, data.flag));
    },
    handleImageUpload: event => {
      const image = event.target.files[0];
      dispatch(CREATION.upload(image));
    },
    fetchTags: () => dispatch(CREATION.tagSuggestions()),
    submit: props => () => {
      const {
        name,
        destination,
        startDate,
        endDate,
        chosen_tags,
        imageId,
      } = props;

      const trip = {
        name,
        destination,
        startDate,
        endDate,
        tags: chosen_tags,
        imageId,
      };

      dispatch(CREATION.submit(trip));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCreationForm);
