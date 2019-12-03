import React, { Component } from 'react';
import { HERE_MAPS_API_KEY } from '../../config/keys';

const MAP_ID = 'map-container';

class HereMap extends Component {
  platform;
  maptypes;
  map;
  ui;

  constructor(props) {
    super(props);
    this.platform = new window.H.service.Platform({
      apikey: `${HERE_MAPS_API_KEY}`,
    });
  }

  componentDidMount() {
    const { lng, lat } = this.props;
    this.maptypes = this.platform.createDefaultLayers();
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
    console.log(map.getZoom());
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.ui = window.H.ui.UI.createDefault(this.map, this.maptypes);
    this.updateMapLocation(nextProps);

    if (this.doesPlacesDiffer(nextProps)) {
      this.map.removeObjects(this.map.getObjects());
      try {
        const { places } = nextProps;
        places.forEach(place => {
          this.setupMarker(place);
        });
      } catch (e) {
        console.log('HERE ERROR', e);
      }
    }

    return false;
  }

  doesPlacesDiffer(nextProps) {
    const { places } = this.props;
    if (places.length !== nextProps.places.length) {
      return true;
    }
    for (let i = 0; i < places.length; i++) {
      if (!this.areObjectSame(places[i], nextProps.places[i])) {
        return true;
      }
    }
    return false;
  }

  areObjectSame(x, y) {
    for (let propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        return false;
      }
    }
    return true;
  }

  setupMarker(place) {
    const icon = new window.H.map.Icon(place.icon, {
      size: {
        w: 30,
        h: 30,
      },
    });
    const coords = {
      lat: Number.parseFloat(place.geometry.location.lat),
      lng: Number.parseFloat(place.geometry.location.lng),
    };
    const marker = new window.H.map.Marker(coords, { icon: icon });
    marker.setData(`<p>${place.name}<br>${place.vicinity}</p>`);
    marker.addEventListener('tap', event => {
      const bubble = new window.H.ui.InfoBubble(event.target.getGeometry(), {
        content: 'Test',
      });
      this.ui.addBubble(bubble);
    });
    this.map.addObject(marker);
  }

  updateMapLocation(nextProps) {
    const { lng, lat } = this.props;
    if (lng !== nextProps.lng && lat !== nextProps.lat) {
      this.map.setCenter({
        lng: nextProps.lng,
        lat: nextProps.lat,
      });
    }
  }

  render() {
    return <div id={MAP_ID} style={{ width: '100%', height: '100%' }} />;
  }
}

export default HereMap;
