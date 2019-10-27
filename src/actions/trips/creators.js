import {fetchUserTrips} from "./fetchUserTrips";
import {fetchTripDetails} from "./fetchTripDetails";
import {addMemberToTrip, suggestMembersToAdd} from "./addMember";

const requestUserTrips = () => ({
    type: 'REQUEST_TRIPS'
});

const retrieveUserTrips = (trips) => ({
    type: 'RETRIEVE_TRIPS',
    trips
});

const requestTripDetails = () => ({
    type: 'REQUEST_TRIP_DETAILS'
});

const retrieveTripDetails = (details) => ({
    type: 'RETRIEVE_TRIP_DETAILS',
    details
});

const requestMemberAddition = () => ({
    type: 'REQUEST_MEMBER_ADDITION'
});

const retrieveMemberAdditionResponse = () => ({
    type: 'RETRIEVE_MEMBER_ADDITION_RESPONSE'
});

const requestUsersSuggestion = () => ({
    type: 'REQUEST_USER_SUGGESTION'
});

const retrieveUsersSuggestion = (suggestion) => ({
    type: 'RETRIEVE_USER_SUGGESTION',
    suggestion
});

const fillMemberToAdd = (member) => ({
    type: 'FILL_MEMBER_TO_ADD',
    member
});

export const TRIPS = {
    requestUserTrips,
    retrieveUserTrips,
    fetchUserTrips,
    requestTripDetails,
    retrieveTripDetails,
    fetchTripDetails,
    requestMemberAddition,
    retrieveMemberAdditionResponse,
    requestUsersSuggestion,
    retrieveUsersSuggestion,
    suggestMembersToAdd,
    addMemberToTrip,
    fillMemberToAdd
};