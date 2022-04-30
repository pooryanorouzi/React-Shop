import { getCategories } from "api/category.api";

export const setCategory = (data) => ({
  type: "GET_CATEGORY_SUCCESS",
  payload: data,
});

export const getCategory = () => {
  return (dispatch) => {
    return getCategories()
      .then((response) => {
        dispatch(setCategory(response));
        return response;
      })
      .catch((error) => {
        console.log("get category error: 2", error);
        return Promise.reject(error);
      });
  };
};
