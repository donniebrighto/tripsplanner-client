import { API_KEY } from '../config';

const platform = new window.H.service.Platform({
  apikey: `${API_KEY}`,
});

const maptypes = platform.createDefaultLayers();

const hereMap = (elementId, lng, lat) => {
  const map = new window.H.Map(
    document.getElementById(elementId),
    maptypes.vector.normal.map,
    {
      zoom: 10,
      center: {
        lng,
        lat,
      },
    }
  );

  const mapEvents = new window.H.mapevents.MapEvents(map);
  new window.H.mapevents.Behavior(mapEvents);

  map.addEventListener('pointerup'); // TODO set center on pointer up
};

export default hereMap;
