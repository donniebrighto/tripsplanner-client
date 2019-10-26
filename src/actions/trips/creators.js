import {fetchUserTrips} from "./fetchUserTrips";

const requestUserTrips = () => ({
    type: 'REQUEST_TRIPS'
});

const retrieveUserTrips = (trips) => ({
    type: 'RETRIEVE_TRIPS',
    trips
});

export const TRIPS = {
    requestUserTrips,
    retrieveUserTrips,
    fetchUserTrips
};