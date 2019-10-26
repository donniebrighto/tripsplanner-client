import {endpoints} from "./config";

export function uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);
    return fetch(endpoints.image.upload, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
    });
}