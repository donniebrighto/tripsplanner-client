import React from 'react';
import {Button, Card, Container, Flag, Grid, GridColumn, GridRow, Header, Icon, Search} from 'semantic-ui-react';

import {TRIPS} from '../../actions';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import HereMap from "../../api/here/map/HereMap";
import FilterButton from './FilterButton';
import MembersList from "./MembersList";

const TripDetails = () => {
    const { id } = useParams();

    return (
        <Container>
            <Grid>
                <GridRow>
                    <GridColumn width={16}>
                        <Grid>
                            <GridRow style={{paddingBottom: '0', height: '120px'}}>
                                <GridColumn style={{paddingLeft: '30px', height: '100%'}} width={3}>
                                    <Header>
                                        <Header.Content style={{width: '100%'}}>Majówka</Header.Content>
                                        <Header.Subheader><Flag name="pl"/> Wrocław, Polska</Header.Subheader>
                                        <Header.Subheader><Icon name="calendar alternate outline"/> Data wycieczki</Header.Subheader>
                                    </Header>
                                </GridColumn>
                                <GridColumn width={3} style={{padding: '0', height: '100%'}}>
                                    <MembersList/>
                                </GridColumn>
                                <GridColumn width={10}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        paddingRight: '30px',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Button.Group style={{marginBottom: '20px'}}>
                                            <Button basic color='red'>
                                                Edycja
                                            </Button>
                                            <Button basic color='green'>
                                                Powiadomienia
                                            </Button>
                                            <Button basic color='blue'>
                                                Pomoc
                                            </Button>
                                        </Button.Group>
                                        <div style={{display: 'flex'}}>
                                            <FilterButton icon="food" color="olive" description="Restauracje"/>
                                            <FilterButton icon="film" color="green" description="Rozrywka"/>
                                            <FilterButton icon="coffee" color="teal" description="Kawiarnie"/>
                                            <FilterButton icon="camera" color="blue" description="Zwiedzanie"/>
                                            <FilterButton icon="beer" color="violet" description="Puby"/>
                                            <FilterButton icon="home" color="purple" description="Hotele"/>
                                            <FilterButton icon="shopping bag" color="pink" description="Zakupy"/>
                                            <Search

                                            />
                                        </div>
                                    </div>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={6}>
                        <Card.Group>
                            <Card fluid color='red' header='Option 1' />
                            <Card fluid color='orange' header='Option 2' />
                            <Card fluid color='yellow' header='Option 3' />
                        </Card.Group>
                    </GridColumn>
                    <GridColumn width={10} style={{ minHeight: '700px'}}>
                        <HereMap/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Container>
    )
};

const mapStateToProps = (state) => ({
    ...state.exploreTrips
});

const mapDispatchToProps = (dispatch) => ({
    fetchTripDetails: (tripId) => dispatch(TRIPS.fetchTripDetails(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripDetails);