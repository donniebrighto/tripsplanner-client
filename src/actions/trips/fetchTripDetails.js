import {getTripById} from "../../api/local";
import {TRIPS} from "./creators";

export function fetchTripDetails(id) {
    return (dispatch) => {
        dispatch(TRIPS.requestTripDetails());
        getTripById(id)
            .then(response => response.json())
            .then(data => dispatch(TRIPS.retrieveTripDetails(data)))
    }
}