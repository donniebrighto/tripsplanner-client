import React, {Component} from 'react';
import hereMap from './api';

class HereMap extends Component {

    componentDidMount() {
        hereMap("mapContainer");
    }

    render() {
        return (
            <div id="mapContainer" style={{width: '100%', height: '100%'}}>

            </div>
        )
    }
}

export default HereMap;