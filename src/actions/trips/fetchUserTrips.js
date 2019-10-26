import {TRIPS} from "./creators";
import {getUserTrips} from "../../api/local";

export function fetchUserTrips() {
    return (dispatch) => {
        dispatch(TRIPS.requestUserTrips());
        getUserTrips()
            .then(response => response.json())
            .then(data => {
                console.log("trips", data);
                return data;
            })
            .then(trips => dispatch(TRIPS.retrieveUserTrips(trips)));
    }
}