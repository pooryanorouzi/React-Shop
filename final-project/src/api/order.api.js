import http from "services/http.service";
import { ORDERS } from "configs/url.config";

export const postOrder = async (data) => {
  try {
    const resp = await http.post(ORDERS, data);
    return resp.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllOrders = async (path, page, limit) => {
  if (path === "pending") {
    try {
      const response = await http.get(
        `${ORDERS}?deliveredStatus=pending&_page=${page}&_limit=${limit}`
      );
      return {
        data: response.data,
        total: +response.headers["x-total-count"],
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
  if (path === "delivered") {
    try {
      const response = await http.get(
        `${ORDERS}?deliveredStatus=delivered&_page=${page}&_limit=${limit}`
      );
      // console.log("deliveredStatus: ", response);
      return {
        data: response.data,
        total: +response.headers["x-total-count"],
      };
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    try {
      const response = await http.get(`${ORDERS}`);
      // console.log("all orders: ", response);
      return {
        data: response.data,
        total: +response.data.length,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

// export const getOrdersPending = async (page, limit) => {
//   try {
//     const response = await http.get(
//       `${ORDERS}?page=${page}&limit=${limit}&deliveredStatus=pending`
//     );
//     return { data: response.data, total: +response.headers["x-total-count"] };
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export const getOrdersDelivered = async (page, limit) => {
//   try {
//     const response = await http.get(
//       `${ORDERS}?page=${page}&limit=${limit}&deliveredStatus=delivered`
//     );
//     return { data: response.data, total: +response.headers["x-total-count"] };
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

export async function editOrders(id, data) {
  try {
    const response = await http.patch(`/Orders/${id}`, data);
    console.log(response)
    return response.data;
  } catch (error) {
    return error;
  }
}
