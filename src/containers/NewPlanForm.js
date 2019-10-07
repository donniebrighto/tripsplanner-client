import React from 'react';
import {connect} from 'react-redux';
import {Button, Container, Form, Icon} from "semantic-ui-react";

import {PLAN_FORM} from "../actions";
import CitySearch from "./CitySearch";
import SectionHeader from "../components/SectionHeader";

const LABELS = {
    NAME: "name",
    CITY: "city",
    START_DATE: "startDate",
    END_DATE: "endDate",
    TAGS: "chosen_tags"
};

const NewPlanForm = (props) => {
    return (
        <Container>
            <SectionHeader
                title="Kreator Planu"
                subtitle="Stwórz swój plan razem ze znajomymi"
                iconName="edit outline"
            />
            <Form>
                <Form.Field>
                    <label>Nazwa Planu</label>
                    <Form.Input
                        type="text"
                        placeholder="np. Fajna majóweczka w Budapeszcie"
                        value={props.name}
                        onChange={props.handleFillingData(LABELS.NAME)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Miasto</label>
                    <CitySearch
                        value={props.city}
                        minCharacters={3}
                        onChange={props.handleFillingCity}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Data rozpoczęcia</label>
                    <Form.Input
                        type="date"
                        value={props.startDate}
                        onChange={props.handleFillingData(LABELS.START_DATE)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Data zakończenia</label>
                    <Form.Input
                        type="date"
                        value={props.endDate}
                        onChange={props.handleFillingData(LABELS.END_DATE)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Tagi</label>
                    <Form.Dropdown
                        options={props.available_tags}
                        placeholder='Dodaj tagi'
                        search
                        selection
                        fluid
                        multiple
                        value={props.chosen_tags}
                        onChange={props.handleFillingData(LABELS.TAGS)}
                    />
                </Form.Field>
                <Button icon labelPosition='right' floated='right' color='teal'>
                    Next
                    <Icon name='right arrow' />
                </Button>
            </Form>
        </Container>
    );
};

const mapStateToProps = (state) => {
    const {
        name,
        city,
        locationId,
        startDate,
        endDate,
        chosen_tags,
        available_tags
    } = state.planForm;

    return {
        name,
        city,
        locationId,
        startDate,
        endDate,
        chosen_tags,
        available_tags
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFillingData: (label) => {
            return function (event, {value}) {
                dispatch(PLAN_FORM.fillField(label, value));
            }
        },
        handleFillingCity: (event, {value, key}) => {
            dispatch(PLAN_FORM.storeCityData(value, key));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlanForm);