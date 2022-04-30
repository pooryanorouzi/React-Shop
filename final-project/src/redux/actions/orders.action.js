import { editOrders, getAllOrders } from "api/order.api";

export const setOrders = (data) => ({
  type: "GET_ORDERS_SUCCESS",
  payload: data,
});

export const setPendingOrders = (data) => ({
  type: "GET_PENDING_ORDERS_SUCCESS",
  payload: data,
});

export const setDeliveredOrders = (data) => ({
  type: "GET_DELIVERED_ORDERS_SUCCESS",
  payload: data,
});

export const getPendingOrdersAction = (path, page, limit) => {
  return (dispatch) => {
    return getAllOrders(path, page, limit)
      .then((resp) => {
        dispatch(setPendingOrders(resp));
        return resp;
      })
      .catch((error) => {
        console.log("action error:", error);
        return Promise.reject(error);
      });
  };
};

export const getDeliveredOrdersAction = (path, page, limit) => {
  return (dispatch) => {
    return getAllOrders(path, page, limit)
      .then((resp) => {
        dispatch(setDeliveredOrders(resp));
        return resp;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
};

export const editOrderAction = (id, data) => {
  return (dispatch) => {
    return editOrders(id, data)
      .then((resp) => {
        dispatch(getPendingOrdersAction());
        return resp;
      })
      .catch((error) => Promise.reject(error));
  };
};
