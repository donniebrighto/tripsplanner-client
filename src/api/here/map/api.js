import {API_KEY} from "../config";

const platform = new window.H.service.Platform({
    'apikey': `${API_KEY}`
});

const maptypes = platform.createDefaultLayers();

const hereMap = (elementId) => {
    const map = new window.H.Map(
        document.getElementById(elementId),
        maptypes.vector.normal.map,
        {
            zoom: 10,
            center: {lng: 13.4, lat: 52.51}
        });

    const mapEvents = new window.H.mapevents.MapEvents(map);
    new window.H.mapevents.Behavior(mapEvents);
};

export default hereMap;