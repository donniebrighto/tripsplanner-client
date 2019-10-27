import React from 'react';
import {Card, Container, Dimmer, Grid, GridColumn, GridRow, Loader} from 'semantic-ui-react';

import {TRIPS} from '../../../actions';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import HereMap from "../../../api/here/map/HereMap";
import TaskBar from "./TaskBar/TaskBar";

const TripDetails = (props) => {
    const {id} = useParams();

    if (!props.isLoading && !props.details) {
        props.fetchTripDetails(id);
    }

    if (props.isLoading) {
        return (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        )
    }

    return (
        <Container>
            <Grid>
                <GridRow>
                    <GridColumn width={16}>
                        <TaskBar {...props.details}/>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={6}>
                        <Card.Group>
                            <Card fluid color='red' header='Option 1'/>
                            <Card fluid color='orange' header='Option 2'/>
                            <Card fluid color='yellow' header='Option 3'/>
                        </Card.Group>
                    </GridColumn>
                    <GridColumn width={10} style={{minHeight: '700px'}}>
                        <HereMap/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Container>
    )
};


const mapStateToProps = (state) => ({
    ...state.tripDetails
});

const mapDispatchToProps = (dispatch) => ({
    fetchTripDetails: (tripId) => dispatch(TRIPS.fetchTripDetails(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);