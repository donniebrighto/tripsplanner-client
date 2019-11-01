import React from 'react';
import fetchCityLocation from "../../../actions/map/tripDestination";
import {connect} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";
import HereMap from "../../../api/here/map/HereMap";

const MapWrapper = (props) => {
    const {isLoading, location, locationId} = props;
    if (!location) {
        if (!isLoading) props.fetchCityLocation(locationId);

        return (
            <Dimmer active inverted style={{height: '100%', width: '100%'}}>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        )
    }

    console.log(location);

    return (
        <HereMap lng={location.lng} lat={location.lat}/>
    )
};

const mapStateToProps = (state) => ({
    ...state.tripDestination,
    details: state.tripDestination.details
});

const mapDispatchToProps = {
    fetchCityLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);