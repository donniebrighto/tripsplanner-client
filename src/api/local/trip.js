import {endpoints} from "./config";

export function createTrip(trip) {
    const {
        name,
        destination,
        startDate,
        endDate,
        tags,
        imageId
    } = trip;

    const payload = {
        trip: {
            name,
            destination,
            startDate,
            endDate
        },
        tagsIds: tags,
        imageId
    };

    console.log(JSON.stringify(payload));

    return fetch(endpoints.trip.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(payload)
    });
}

export function getUserTrips() {
    return fetch(endpoints.trip.all, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}