import { fetchTripDetails } from './tripPlanningActions';
import { MEMBER_ADDITION } from './memberAdditionActions';
import { geocodeCityFromLocationId } from './destinationGeocodingActions';
import { PLACES_SEARCH } from './placesSearchActions';
import { CHAT } from './chatActions';
import { WEBSOCKETS_CONTEXT } from './websocketsContextActions';
import { PLACES_AUTOSUGGESTIONS } from './placesAutosuggestionActions';
import { TRIP_POINTS } from './tripPointsActions';
import { PLAN } from './planActions';

export const PLANNING = {
  fetchTripDetails,
  MEMBER_ADDITION,
  geocodeCityFromLocationId,
  PLACES_SEARCH,
  CHAT,
  WEBSOCKETS_CONTEXT,
  PLACES_AUTOSUGGESTIONS,
  TRIP_POINTS,
  PLAN,
};
