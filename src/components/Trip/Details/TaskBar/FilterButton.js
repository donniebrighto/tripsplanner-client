import React from 'react';
import {Button} from "semantic-ui-react";

const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 5px',
    width: '60px'
};

const FilterButton = (props) => (
    <div style={styles}>
        <div><Button circular color={props.color} icon={props.icon} size="small"/></div>
        <span style={{fontSize: '0.8em'}}>{props.description}</span>
    </div>
);

export default FilterButton;