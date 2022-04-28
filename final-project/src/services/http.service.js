import axios from "axios";
import { PATHS } from "configs/routes.config";

import { BASE_URL, ACCESS_TOKEN, IS_LOGGED_IN } from "configs/variables.config";
import { toast } from "react-hot-toast";
import { LOGIN } from "configs/url.config";
// import { refreshToken } from "redux/actions/user.action";
// import store from "redux/store";
// import history from "./history.service";
// import errorMap from "assets/data/error-map";

// let canRefresh = true;

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // config["headers"] = {
        //     ...config,
        //     "Accept_Language": "FA"
        // }
        // config.headers = {
        //     ...config,
        //     "token": `Bearer ${token}`
        // }
        // config.headers = {
        //     ...config, "token": `${token}`
        // }
        if (config.url !== LOGIN) {
          config.headers["token"] = `${token}`;
        }
        return config;
      },
      (error) => {
        toast.error(error.response.data);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // if (error.response && error.response.data === "Token Expired!") {
        localStorage.setItem(IS_LOGGED_IN, false.toString());
        // }
        toast.error(error);
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return axios.get(url, config);
  }

  post(url, data, config) {
    return axios.post(url, data, config);
  }

  put(url, data, config) {
    return axios.put(url, data, config);
  }

  patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  delete(url, config) {
    return axios.delete(url, config);
  }
}

export default new HttpService();
