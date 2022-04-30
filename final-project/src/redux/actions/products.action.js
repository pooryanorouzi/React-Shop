import {
  getProducts,
  getAllProducts,
  deleteProduct,
  sendProductDataToServer,
  editProducts,
} from "api/products.api";

export const setProducts = (data) => ({
  type: "GET_PRODUCTS_SUCCESS",
  payload: data,
});

export const getProduct = (page, limit) => {
  return (dispatch) => {
    return getProducts(page, limit)
      .then((response) => {
        dispatch(setProducts(response));
      })
      .catch((error) => {
        console.log("action error: ", error);
        return Promise.reject(error);
      });
  };
};

export const deleteProductAction = (id) => {
  return (dispatch) => {
    return deleteProduct(id)
      .then((response) => {
        dispatch(getProduct());
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };
};

export const sendProductAction = (data) => {
  return (dispatch) => {
    return sendProductDataToServer(data)
      .then((resp) => {
        dispatch(getProduct());
        return resp;
      })
      .catch((error) => Promise.reject(error));
  };
};

export const editProductAction = (id, data) => {
  return (dispatch) => {
    return editProducts(id, data)
      .then((resp) => {
        dispatch(getProduct());
        return resp;
      })
      .catch((error) => Promise.reject(error));
  };
};
