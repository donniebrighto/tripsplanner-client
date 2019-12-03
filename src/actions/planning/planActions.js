import client from '../client';
import { local } from '../../config/endpoints';

const requestPointsByDay = () => ({
  type: 'REQUEST_POINTS_BY_DAY',
});

const retrievePointsByDay = pointsByDay => ({
  type: 'RETRIEVE_POINTS_BY_DAY',
  pointsByDay,
});

const fetchPointsByDay = tripId => async dispatch => {
  dispatch(requestPointsByDay());
  try {
    const response = await client().get(local.trip.pointsByDay(tripId));
    dispatch(retrievePointsByDay(response.data));
  } catch (e) {
    console.log(e);
  }
};

const setDay = day => ({
  type: 'SET_DAY',
  day,
});

const requestPointsDetails = () => ({
  type: 'REQUEST_POINTS_DETAILS',
});

const retrievePointsDetails = content => ({
  type: 'RETRIEVE_POINTS_DETAILS',
  content,
});

const fetchPointsDetails = (tripId, points) => async dispatch => {
  dispatch(requestPointsDetails());
  try {
    const response = await client().post(local.trip.pointsDetails(tripId), {
      tripPoints: points,
      fields: 'name,rating,geometry/location,vicinity,url,types',
      language: 'pl',
    });
    dispatch(retrievePointsDetails(response.data));
  } catch (e) {
    console.log(e);
  }
};

const pointAdditionNotification = point => ({
  type: 'ADD_TRIP_POINT',
  point,
});

const addTripPoint = (tripId, tripPoint) => async dispatch => {
  try {
    const response = await client().post(local.trip.pointDetails(tripId), {
      tripPoint: tripPoint,
      fields: 'name,geometry/location,vicinity',
      language: 'pl',
    });
    dispatch(pointAdditionNotification(response.data));
  } catch (e) {
    console.log(e);
  }
};

const removeFromAdded = tripPoint => ({
  type: 'ACCEPT_ADDED_POINT',
  tripPoint,
});

const updateDayPoints = () => ({
  type: 'UPDATE_DAY_POINTS',
});

const acceptAddedPoint = tripPoint => dispatch => {
  dispatch(removeFromAdded(tripPoint));
  dispatch(fetchPointsByDay());
  dispatch(updateDayPoints());
};

const pointRemovalNotification = (point, username) => ({
  type: 'REMOVE_TRIP_POINT',
  point,
  username,
});

const deletePoint = (tripId, pointId) => async dispatch => {
  try {
    const deleteResponse = await client().delete(
      local.trip.deletePoint(tripId, pointId)
    );
    const { tripPoint, username } = deleteResponse.data;
    const detailsResponse = await client().post(
      local.trip.pointDetails(tripId),
      {
        tripPoint: tripPoint,
        fields: 'name,geometry/location,vicinity',
        language: 'pl',
      }
    );
    dispatch(pointRemovalNotification(detailsResponse.data, username));
  } catch (e) {
    console.log(e);
  }
};

const acceptRemoval = tripPoint => ({
  type: 'ACCEPT_REMOVED_POINT',
  tripPoint,
});

const acceptRemovedPoint = tripPoint => dispatch => {
  dispatch(acceptRemoval(tripPoint));
};

export const PLAN = {
  fetchPointsByDay,
  acceptAddedPoint,
  fetchPointsDetails,
  deletePoint,
  setDay,
  addTripPoint,
  acceptRemovedPoint,
};
