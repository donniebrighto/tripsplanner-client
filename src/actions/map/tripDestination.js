import {getLocationFromLocationId} from "../../api/here/getLocationFromLocationId";
import {requestCityLocation, retrieveCityLocation} from "./creators";

export default function fetchCityLocation(locationId){
    return (dispatch) => {
        dispatch(requestCityLocation());
        getLocationFromLocationId(locationId)
            .then(location => dispatch(retrieveCityLocation(location)))
    }
}
