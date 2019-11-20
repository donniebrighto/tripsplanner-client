import { fetchTripDetails } from './tripPlanningActions';
import { MEMBER_ADDITION } from './memberAdditionActions';
import { geocodeCityFromLocationId } from './destinationGeocodingActions';
import { PLACES_SEARCH } from './placesSearchActions';
import { CHAT } from './chatActions';
import { WEBSOCKETS_CONTEXT } from './websocketsContextActions';
import { PLACES_AUTOSUGGESTIONS } from './placesAutosuggestionActions';

export const PLANNING = {
  fetchTripDetails,
  MEMBER_ADDITION,
  geocodeCityFromLocationId,
  PLACES_SEARCH,
  CHAT,
  WEBSOCKETS_CONTEXT,
  PLACES_AUTOSUGGESTIONS,
};
