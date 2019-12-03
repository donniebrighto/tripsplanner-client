import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { PLANNING } from '../../actions/planning';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { HERE_APP_CODE, HERE_APP_ID } from '../../config/keys';
import moment from 'moment';
import 'moment/locale/pl';

const MapContainer = props => {
  const {
    isLoading,
    location,
    locationId,
    places,
    details,
    planContent,
    addedPoints,
    removedPoints,
  } = props;

  const { acceptAddedPoint, acceptRemovedPoint } = props;

  if (!location) {
    if (!isLoading) props.fetchCityLocation(locationId);

    return (
      <Dimmer active inverted style={{ height: '100%', width: '100%' }}>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  const { lat, lng } = location;
  localStorage.setItem('coordinates', `${lat},${lng}`);
  const position = [lat, lng];

  const coords = place => [
    Number.parseFloat(place.geometry.location.lat),
    Number.parseFloat(place.geometry.location.lng),
  ];

  const searchMarkers = places.map((place, key) => {
    return (
      <Marker
        key={key}
        position={coords(place)}
        icon={L.icon({
          iconUrl: place.icon,
          iconSize: [30, 30],
          iconAnchor: [14, 29],
          popupAnchor: [0, -20],
        })}
      >
        <Popup>
          {place.name} <br /> {place.vicinity}
        </Popup>
      </Marker>
    );
  });

  const openPopup = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  let detailsMarker;
  if (details) {
    const { result } = details;
    detailsMarker = (
      <Marker
        position={coords(result)}
        icon={L.icon({
          iconUrl: result.icon,
          iconSize: [30, 30],
          iconAnchor: [14, 29],
          popupAnchor: [0, -20],
        })}
        ref={openPopup}
      >
        <Popup>
          {result.name} <br /> {result.vicinity}
        </Popup>
      </Marker>
    );
  }

  let addedPointsMarkers;
  if (addedPoints.length) {
    addedPointsMarkers = addedPoints.map((entry, key) => {
      const { tripPoint, details } = entry;
      const { startDate, endDate, author } = tripPoint;
      return (
        <Marker position={coords(details)} key={key} ref={openPopup}>
          <Popup>
            <span style={{ color: 'green' }}>Dodano do planu przez: </span>{' '}
            {author.name}
            <br />
            {details.name}
            <br />
            {details.vicinity}
            <br />
            początek:
            {moment(startDate)
              .locale('pl')
              .format('LLL')}
            <br />
            koniec:
            {moment(endDate)
              .locale('pl')
              .format('LLL')}
            <br />
            <Button
              basic
              color="green"
              fluid
              onClick={() => acceptAddedPoint(tripPoint)}
            >
              OK
            </Button>
          </Popup>
        </Marker>
      );
    });
  }

  let removedPointsMarkers;
  if (removedPoints.length) {
    removedPointsMarkers = removedPoints.map((entry, key) => {
      const { tripPoint, details } = entry;
      const { startDate, endDate, author } = tripPoint;
      return (
        <Marker position={coords(details)} key={key} ref={openPopup}>
          <Popup>
            <span style={{ color: 'red' }}>Usunięto z planu przez: </span>{' '}
            {author.name}
            <br />
            {details.name}
            <br />
            {details.vicinity}
            <br />
            początek:
            {moment(startDate)
              .locale('pl')
              .format('LLL')}
            <br />
            koniec:
            {moment(endDate)
              .locale('pl')
              .format('LLL')}
            <br />
            <Button
              basic
              color="green"
              fluid
              onClick={() => acceptRemovedPoint(tripPoint)}
            >
              OK
            </Button>
          </Popup>
        </Marker>
      );
    });
  }

  let planMarkers;
  if (planContent) {
    planMarkers = planContent.map((entry, key) => {
      const { tripPoint, details } = entry;
      const { startDate, endDate } = tripPoint;
      return (
        <Marker position={coords(details)} key={key}>
          <Popup>
            {details.name}
            <br />
            {details.vicinity}
            <br />
            początek:
            {moment(startDate)
              .locale('pl')
              .format('LLL')}
            <br />
            koniec:
            {moment(endDate)
              .locale('pl')
              .format('LLL')}
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <LeafletMap
      center={position}
      zoom="13"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">Here Developers</a> contributors'
        url={`https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?app_id=${HERE_APP_ID}&app_code=${HERE_APP_CODE}&ppi=320`}
      />
      {searchMarkers}
      {detailsMarker}
      {planMarkers}
      {addedPointsMarkers}
      {removedPointsMarkers}
    </LeafletMap>
  );
};

const mapStateToProps = state => ({
  ...state.planning.destinationGeocoding,
  ...state.planning.placesSearch,
  planContent: state.planning.plan.content,
  addedPoints: state.planning.plan.added,
  removedPoints: state.planning.plan.removed,
});

const mapDispatchToProps = {
  fetchCityLocation: PLANNING.geocodeCityFromLocationId,
  acceptAddedPoint: PLANNING.PLAN.acceptAddedPoint,
  acceptRemovedPoint: PLANNING.PLAN.acceptRemovedPoint,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
