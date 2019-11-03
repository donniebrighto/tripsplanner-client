import { createTrip } from '../../api/local';
import { push } from 'connected-react-router';
import { TRIPS } from '../trips/creators';

export function submit(trip) {
  return dispatch => {
    createTrip(trip)
      .then(response => response.json())
      .then(data => {
        dispatch(TRIPS.resetTrips());
        dispatch(push(`/trips/${data.id}`));
      }); // TODO - loading (?)
  };
}
