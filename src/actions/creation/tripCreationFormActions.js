import { push } from 'connected-react-router';
import client from '../client';
import { resetTrips } from '../exploring';
import { local } from '../../config/endpoints';
import { tripPlanningUrl } from '../../config/routes';

export const fillField = (label, value) => ({
  type: 'FILL_FIELD',
  label,
  value,
});

export const storeCityData = (name, locationId, flag) => ({
  type: 'FILL_CITY_STORE_LOCATION',
  destination: {
    label: name,
    locationId,
    iso2flag: flag,
  },
});

const uploadImage = imageId => ({
  type: 'UPLOAD_IMAGE',
  imageId,
});

function postImageUpload(image) {
  const formData = new FormData();
  formData.append('file', image);
  return client().post(local.image.upload, formData);
}

export function upload(image) {
  return async dispatch => {
    try {
      const response = await postImageUpload(image);
      const { data } = response;
      dispatch(uploadImage(data.imageId));
    } catch (e) {
      console.log(e);
    }
  };
}

export function submit(trip) {
  return async dispatch => {
    try {
      const response = await createTrip(trip);
      const { data } = response;
      dispatch(resetTrips());
      dispatch(push(tripPlanningUrl(data.id)));
    } catch (e) {
      console.log(e);
    }
  };
}

export function createTrip(trip) {
  const { name, destination, startDate, endDate, tags, imageId } = trip;
  const payload = {
    trip: {
      name,
      destination,
      startDate,
      endDate,
    },
    tagsIds: tags,
    imageId,
  };
  return client().post(local.trip.create, payload);
}
