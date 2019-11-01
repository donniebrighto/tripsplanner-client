import React, { Component } from 'react';
import hereMap from './api';

const MAP_ID = 'map-container';

class HereMap extends Component {
  componentDidMount() {
    const { lng, lat } = this.props;
    hereMap(MAP_ID, lng, lat);
  }

  render() {
    return <div id={MAP_ID} style={{ width: '100%', height: '100%' }}></div>;
  }
}

export default HereMap;
