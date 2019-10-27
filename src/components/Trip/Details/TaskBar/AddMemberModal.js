import React from 'react';
import {Button, Dropdown, Message, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {TRIPS} from "../../../../actions";

const AddMemberModal = (props) => (
    <Modal
        trigger={<Button circular icon="add" color="green" size="tiny"/>}
        closeIcon
    >
        <Modal.Header>Dodaj członka do wycieczki</Modal.Header>
        <Modal.Content>
            <Dropdown
                placeholder='Email użytkownika'
                fluid
                search
                selection
                value={props.member}
                options={props.suggestion}
                loading={props.isLoading}
                minCharacters={3}
                onChange={props.fillMemberToAdd}
                onSearchChange={
                    (e, {searchQuery, minCharacters}) => props.suggest(searchQuery, minCharacters)
                }
            />
            <Button
                style={{marginTop: '10px'}}
                onClick={props.addMember(props.id, props.member)}
                loading={props.addMemberLoading}
                color="green"
            >
                Dodaj
            </Button>
            {props.success && <Message positive>Dodano użytkownika</Message>}
        </Modal.Content>
    </Modal>
);

const mapStateToProps = (state) => ({
    ...state.usersSuggestion,
    addMemberLoading: state.addMember.isLoading,
    member: state.addMember.member,
    success: state.addMember.success,
    id: state.tripDetails.details ? state.tripDetails.details.id : undefined
});

const mapDispatchToProps = (dispatch) => ({
    suggest: (searchQuery, minCharacters) => {
        if (searchQuery.length < minCharacters) return;
        dispatch(TRIPS.suggestMembersToAdd(searchQuery));
    },
    addMember: (id, member) => () => dispatch(TRIPS.addMemberToTrip(id, member)),
    fillMemberToAdd: (e, {value}) => dispatch(TRIPS.fillMemberToAdd(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberModal);