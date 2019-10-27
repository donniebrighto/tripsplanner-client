import React from 'react';
import {Flag, Header, Icon} from "semantic-ui-react";

const TripHeader = (props) => (
    <Header>
        <Header.Content>{props.name}</Header.Content>
        <Header.Subheader><Flag name={props.flag}/>{props.destination}</Header.Subheader>
        <Header.Subheader><Icon name="calendar alternate outline"/>{props.date}</Header.Subheader>
    </Header>
);

export default TripHeader;