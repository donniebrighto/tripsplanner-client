import React from 'react';
import fetchCityLocation from '../../../actions/map/tripDestination';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import HereMap from './HereMap';

const MapWrapper = props => {
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
  ...state.tripDestination,
  ...state.explorePlaces,
});

const mapDispatchToProps = {
  fetchCityLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapWrapper);
