import React, {Component} from 'react';
import {Card, Placeholder} from "semantic-ui-react";

class PlaceholdersGrid extends Component{

    render(){
        return (
            <Card.Group itemsPerRow={3}>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Image rectangular/>
                            <Placeholder.Line length="short"/>
                            <Placeholder.Line length="full"/>
                            <Placeholder.Line length="full"/>
                        </Placeholder>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export default PlaceholdersGrid;