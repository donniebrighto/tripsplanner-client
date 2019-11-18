import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import HereMap from '../../components/planning/HereMap';
import { PLANNING } from '../../actions/planning';

const MapContainer = props => {
  const { isLoading, location, locationId, places } = props;
  if (!location) {
    if (!isLoading) props.fetchCityLocation(locationId);

    return (
      <Dimmer active inverted style={{ height: '100%', width: '100%' }}>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  return <HereMap lng={location.lng} lat={location.lat} places={places} />;
};

const mapStateToProps = state => ({
  ...state.planning.destinationGeocoding,
  ...state.planning.placesSearch,
});

const mapDispatchToProps = {
  fetchCityLocation: PLANNING.geocodeCityFromLocationId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
