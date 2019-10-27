import React from 'react';
import {Dimmer, Grid, GridColumn, GridRow, Loader} from "semantic-ui-react";
import TripHeader from "./TripHeader";
import MembersList from "./MembersList";
import ControlPanel from "./ControlPanel";

const TaskBar = (props) => {
    const {name, destination, startDate, endDate} = props;

    if (!destination) {
        return (
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
        )
    }

    return (
        <Grid>
            <GridRow style={{paddingBottom: '0', height: '120px'}}>
                <GridColumn style={{paddingLeft: '30px', height: '100%'}} width={3}>
                    <TripHeader
                        name={name}
                        flag={destination.iso2flag}
                        destination={destination.label}
                        date={`${startDate} - ${endDate}`}
                    />
                </GridColumn>
                <GridColumn width={3} style={{padding: '0', height: '100%'}}>
                    <MembersList/>
                </GridColumn>
                <GridColumn width={10}>
                    <ControlPanel/>
                </GridColumn>
            </GridRow>
        </Grid>
    );
};

export default TaskBar;