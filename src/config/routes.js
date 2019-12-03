import TripCreationForm from '../containers/creation/TripCreationForm';
import TripPlanningContainer from '../containers/planning/TripPlanningContainer';
import TripExploringContainer from '../containers/exploring/TripExploringContainer';
import Home from '../components/Home';
import OAuth2RedirectHandler from '../components/auth/OAuth2RedirectHandler';
import ExplorePlaces from '../containers/planning/SearchPlacesCardsContainer';
import Chat from '../containers/planning/Chat';
import PlaceDetails from '../containers/planning/PlaceDetails';
import PlanContainer from '../containers/planning/PlanContainer';

const planningUrl = '/planning/:id';

export const tripPlanningUrl = id => `/planning/${id}`;

const mainRoutes = {
  public: [
    { path: '/', component: Home, exact: true },
    {
      path: '/explore',
      component: TripExploringContainer,
    },
    { path: '/oauth2/redirect', component: OAuth2RedirectHandler },
  ],
  private: [
    {
      path: '/create',
      component: TripCreationForm,
    },
    {
      path: planningUrl,
      component: TripPlanningContainer,
    },
  ],
};

const planningRoutes = {
  private: [
    {
      path: `${planningUrl}/search`,
      component: ExplorePlaces,
      exact: true,
      link: {
        text: 'Szukaj',
        icon: 'search',
        to: id => `${tripPlanningUrl(id)}/search`,
      },
    },
    {
      path: `${planningUrl}/search/:placeId/:photoReference`,
      component: PlaceDetails,
    },
    {
      path: `${planningUrl}/schedule`,
      component: PlanContainer,
      link: {
        text: 'Plan',
        icon: 'list alternate outline',
        to: id => `${tripPlanningUrl(id)}/schedule`,
      },
    },
    {
      path: `${planningUrl}/transport`,
      component: () => null,
      link: {
        text: 'Transport',
        icon: 'bus',
        to: id => `${tripPlanningUrl(id)}/transport`,
      },
    },
    {
      path: `${planningUrl}/accommodation`,
      component: () => null,
      link: {
        text: 'Nocleg',
        icon: 'bed',
        to: id => `${tripPlanningUrl(id)}/accommodation`,
      },
    },
    {
      path: `${planningUrl}/chat`,
      component: Chat,
      link: {
        text: 'Czat',
        icon: 'chat',
        to: id => `${tripPlanningUrl(id)}/chat`,
      },
    },
  ],
};

export { mainRoutes, planningRoutes };
