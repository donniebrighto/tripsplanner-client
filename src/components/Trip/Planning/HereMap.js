import React, { Component } from 'react';
import { API_KEY } from '../../../api/here/config';

const MAP_ID = 'map-container';

class HereMap extends Component {
  platform;
  maptypes;

  constructor(props) {
    super(props);
    this.platform = new window.H.service.Platform({
      apikey: `${API_KEY}`,
    });

    this.maptypes = this.platform.createDefaultLayers();
  }

  componentDidMount() {
    const { lng, lat } = this.props;
    const map = new window.H.Map(
      document.getElementById(MAP_ID),
      this.maptypes.vector.normal.map,
      {
        zoom: 10,
        center: {
          lng,
          lat,
        },
      }
    );
    const mapEvents = new window.H.mapevents.MapEvents(map);
    new window.H.mapevents.Behavior(mapEvents);
  }

  render() {
    return <div id={MAP_ID} style={{ width: '100%', height: '100%' }} />;
  }
}

export default HereMap;
