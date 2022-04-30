import * as api from "api/user.api";
import { ACCESS_TOKEN, IS_LOGGED_IN } from "configs/variables.config";


export const login = (data) => {
  return (dispatch, getState) => {
    return api
      .login(data)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.token);
        localStorage.setItem(IS_LOGGED_IN, true.toString());
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
};

export const whoami = () => {
  return (dispatch, getState) => {
    return api
      .Whoami()
      .then((response) => {
        localStorage.setItem(IS_LOGGED_IN, true.toString());
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
};
