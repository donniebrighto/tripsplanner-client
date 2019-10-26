const base_url = "http://localhost:8080";
const oauth2_redirect_uri = "http://localhost:3000/oauth2/redirect";

export const endpoints = {
    auth: {
        oauth2: `${base_url}/oauth2/authorize/google?redirect_uri=${oauth2_redirect_uri}`,
    },
    user: {
        base: `${base_url}/api/user`,
        me: `${base_url}/user/me`,
    },
    trip: {
        create: `${base_url}/trips/create`,
        all: `${base_url}/trips/all`,
        past: `${base_url}/trips/past`,
        future: `${base_url}/trips/future`,
        active: `${base_url}/trips/active`,
        base: `${base_url}/api/trips`,
    },
    tag: {
        base: `${base_url}/api/tags`
    },
    image: {
        upload: `${base_url}/image/upload`,
        base: `${base_url}/api/image`
    }
};

