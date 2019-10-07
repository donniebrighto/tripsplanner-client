import {AUTHENTICATION} from "../index";
import {requestSignin} from "../../api/local";
import {push} from "connected-react-router";
import {handleError} from "./errorHandler";


export function signin(login, password) {
    return (dispatch) => {
        dispatch(AUTHENTICATION.requestUserLogin());
        requestSignin(login, password)
            .then(response => {
                const {ok, status} = response;
                if (ok) {
                    return response.json();
                } else {
                    throw status;
                }
            })
            .then(json => {
                if(json.userId) localStorage.setItem("userId", json.userId);
                dispatch(AUTHENTICATION.retrieveUserLoginResponse(json.userId));
                dispatch(push('/'));
            })
            .catch(status => dispatch(handleError(status, "TODO: response message retrieved from server")))
    }
}