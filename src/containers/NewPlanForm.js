import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Form, Header, Icon} from "semantic-ui-react";

import {PLAN_FORM} from "../actions";
import CitySearch from "./CitySearch";

const LABELS = {
    NAME: "name",
    CITY: "city",
    START_DATE: "startDate",
    END_DATE: "endDate",
    TAGS: "tags"
};

class NewPlanForm extends Component{

    //TODO - handle TAGS in form
    // handleTagAddition(event, {value}){
    //     this.setState({
    //         ...this.state,
    //         addedTags: [
    //             ...this.state.tags,
    //             {
    //                 key: id++,
    //                 text: value,
    //                 value
    //             }
    //         ]
    //     })
    // }

    // handleFillingData(label){
    //     const self = this;
    //
    //     if (label === LABELS.CITY) {
    //         return function (event, {key, value}) {
    //             self.setState({
    //                 ...self.state,
    //                 locationId: key,
    //                 city: value
    //             })
    //         };
    //     }
    //
    //     if (label === LABELS.TAGS) {
    //         return function(event, data){
    //             console.log(data);
    //             let nextState = {...self.state};
    //             nextState[label] = data.value;
    //             self.setState(nextState);
    //         };
    //     }
    //
    //     return function(event, {value}){
    //         let nextState = {...self.state};
    //         nextState[label] = value;
    //         self.setState(nextState);
    //     };
    // }

    render() {
        return (
            <Container>
                <Button icon labelPosition='left' color="black">
                    Powrót
                    <Icon name='arrow alternate circle left outline' />
                </Button>
                <Header as='h2'>
                    <Icon name='edit outline' />
                    <Header.Content>Kreator Planu</Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label>Nazwa Planu</label>
                        <Form.Input
                            type="text"
                            placeholder="np. Fajna majóweczka w Budapeszcie"
                            value={this.props.name}
                            onChange={this.props.handleFillingData(LABELS.NAME)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Miasto</label>
                        <CitySearch
                            value={this.props.city}
                            minCharacters={3}
                            onChange={this.props.handleFillingCity}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Data rozpoczęcia</label>
                        <Form.Input
                            type="date"
                            value={this.props.startDate}
                            onChange={this.props.handleFillingData(LABELS.START_DATE)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Data zakończenia</label>
                        <Form.Input
                            type="date"
                            value={this.props.endDate}
                            onChange={this.props.handleFillingData(LABELS.END_DATE)}
                        />
                    </Form.Field>
                    {/*<Form.Field>*/}
                    {/*    <label>Tagi</label>*/}
                    {/*    <Form.Dropdown*/}
                    {/*        options={addedTags}*/}
                    {/*        placeholder='Dodaj tagi'*/}
                    {/*        search*/}
                    {/*        selection*/}
                    {/*        fluid*/}
                    {/*        multiple*/}
                    {/*        allowAdditions*/}
                    {/*        value={tags}*/}
                    {/*        onAddItem={this.handleTagAddition}*/}
                    {/*        onChange={this.handleFillingData(LABELS.TAGS)}*/}
                    {/*    />*/}
                    {/*</Form.Field>*/}
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        name,
        city,
        locationId,
        startDate,
        endDate,
        tags
    } = state.planForm;

    return {
        name,
        city,
        locationId,
        startDate,
        endDate,
        tags
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFillingData: (label) => {
            return function (event, {value}){
                dispatch(PLAN_FORM.fillField(label, value));
            }
        },
        handleFillingCity: (event, {value, key}) => {
            dispatch(PLAN_FORM.storeCityData(value, key));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlanForm);