import React, {Component} from 'react';
import hereMap from './api';

class HereMap extends Component {

    componentDidMount() {
        hereMap("mapContainer");
    }

    render() {
        return (
            <div id="mapContainer" style={{width: '600px', height: '600px'}}>

            </div>
        )
    }
}

export default HereMap;