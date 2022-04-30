import { LOGIN, WHOAMI } from "configs/url.config";
import http from "services/http.service";

export const login = async (data) => {
  try {
    const response = await http.post(LOGIN, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Whoami = async () => {
  try {
    const response = await http.get(WHOAMI);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
