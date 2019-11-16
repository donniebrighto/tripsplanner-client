import TripCreationForm from '../containers/creation/TripCreationForm';
import TripDetails from '../components/planning/TripPlanningView';
import TripExplorationView from '../components/exploring/ExploreTrips';
import Home from '../components/Home';
import OAuth2RedirectHandler from '../components/auth/OAuth2RedirectHandler';
import ExplorePlaces from '../components/planning/Operations/ExplorePlaces';
import Chat from '../components/planning/Operations/Chat';

const planningUrl = '/planning/:id';

export const tripPlanningUrl = id => `planning/${id}`;

const mainRoutes = {
  public: [
    { path: '/', component: Home, exact: true },
    {
      path: '/explore',
      component: TripExplorationView,
      link: { text: 'Przeglądaj', icon: 'list layout' },
    },
    { path: '/oauth2/redirect', component: OAuth2RedirectHandler },
  ],
  private: [
    {
      path: '/create',
      component: TripCreationForm,
      link: { text: 'Stwórz', icon: 'add' },
    },
    { path: planningUrl, component: TripDetails },
  ],
};

const planningRoutes = {
  private: [
    {
      path: `${planningUrl}/explore`,
      component: ExplorePlaces,
      link: { text: 'Szukaj', icon: 'search' },
    },
    {
      path: `${planningUrl}/chat`,
      component: Chat,
      link: { text: 'Czat', icon: 'chat' },
    },
  ],
};

export { mainRoutes, planningRoutes };
