import React, { Component } from 'react';
import { HERE_MAPS_API_KEY } from '../../config/keys';
import pin from './pins/hotels.png';

const MAP_ID = 'map-container';

class HereMap extends Component {
  platform;
  maptypes;
  map;

  constructor(props) {
    super(props);
    this.platform = new window.H.service.Platform({
      apikey: `${HERE_MAPS_API_KEY}`,
    });

    this.maptypes = this.platform.createDefaultLayers();
  }

  componentDidMount() {
    const { lng, lat } = this.props;
    this.map = new window.H.Map(
      document.getElementById(MAP_ID),
      this.maptypes.vector.normal.map,
      {
        zoom: 13,
        center: {
          lng,
          lat,
        },
      }
    );
    const mapEvents = new window.H.mapevents.MapEvents(this.map);
    new window.H.mapevents.Behavior(mapEvents);
    localStorage.setItem('coordinates', `${lat},${lng}`);
    this.map.addEventListener('pointerleave', () => {
      this.storeCoordinates(this.map);
    });
  }

  storeCoordinates(map) {
    const point = map.getCenter();
    localStorage.setItem('coordinates', `${point.lat},${point.lng}`);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { places } = nextProps;
    if (!places) return false;

    places.forEach(place => {
      const icon = new window.H.map.Icon(pin);
      const coords = { lat: place.position[0], lng: place.position[1] };
      const marker = new window.H.map.Marker(coords, { icon: icon });
      this.map.addObject(marker);
    });

    return false;
  }

  render() {
    return <div id={MAP_ID} style={{ width: '100%', height: '100%' }} />;
  }
}

export default HereMap;
