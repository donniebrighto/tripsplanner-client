import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";
import {AUTHENTICATION} from "../../actions";
import {connect} from "react-redux";

import LABELS from '../../reducers/auth/labels';

const RegisterForm = (props) => (
    <Grid textAlign='center' verticalAlign="middle" style={{ height: '60vh' }}>
        <Grid.Column style={{maxWidth: '450px'}}>
            <Header as='h2' color='teal' textAlign='center'>
                Rejestracja
            </Header>
            <Form size='medium' onSubmit={props.submit(
                props.login,
                props.firstName,
                props.lastName,
                props.password
            )}>
                <Segment stacked>
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Nazwa użytkownika'
                        onChange={props.fillField(LABELS.USERNAME)}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Imie'
                        onChange={props.fillField(LABELS.FIRST_NAME)}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Nazwisko'
                        onChange={props.fillField(LABELS.LAST_NAME)}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Hasło'
                        type='password'
                        onChange={props.fillField(LABELS.PASSWORD)}
                    />

                    <Button color='teal' fluid size='large'>
                        Zarejestruj się
                    </Button>
                </Segment>
            </Form>
            <Message>
                Masz już konto? <NavLink to="/login">Zaloguj się!</NavLink>
            </Message>
        </Grid.Column>
    </Grid>
);

const mapStateToProps = ({authentication}) => ({...authentication});
const mapDispatchToProps = (dispatch) => {
    return {
        fillField: (label) => (event, {value}) => dispatch(AUTHENTICATION.fillField(label, value)),
        submit: (login, firstName, lastName, password) => () => dispatch(AUTHENTICATION.signup(login, firstName, lastName, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);