import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";
import {AUTHENTICATION} from "../../actions";
import {connect} from "react-redux";

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
                        onChange={props.fillUsername}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Imie'
                        onChange={props.fillFirstName}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Nazwisko'
                        onChange={props.fillLastName}
                    />
                    <Form.Input
                        fluid
                        iconPosition='left'
                        placeholder='Hasło'
                        type='password'
                        onChange={props.fillPassword}
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
        fillUsername: (event, {value}) => dispatch(AUTHENTICATION.fillUsername(value)),
        fillPassword: (event, {value}) => dispatch(AUTHENTICATION.fillPassword(value)),
        fillFirstName: (event, {value}) => dispatch(AUTHENTICATION.fillFirstName(value)),
        fillLastName: (event, {value}) => dispatch(AUTHENTICATION.fillLastName(value)),
        submit: (login, firstName, lastName, password) => () => dispatch(AUTHENTICATION.register(login, firstName, lastName, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);