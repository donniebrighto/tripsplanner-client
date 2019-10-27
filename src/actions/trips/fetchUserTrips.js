import {TRIPS} from "./creators";
import {getUserTrips} from "../../api/local";

export function fetchUserTrips() {
    return (dispatch) => {
        dispatch(TRIPS.requestUserTrips());
        getUserTrips()
            .then(response => response.json())
            .then(data => dispatch(TRIPS.retrieveUserTrips(data)))
    }
}