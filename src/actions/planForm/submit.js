import {createTrip} from "../../api/local";
import {push} from "connected-react-router";

export function submit(trip) {
    return (dispatch) => {
        createTrip(trip)
            .then(response => response.json())
            .then(data => {
                dispatch(push(`/trip/${data.id}`));
            }); // TODO - loading (?)
    }
}