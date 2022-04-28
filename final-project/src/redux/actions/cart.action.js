export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      id: data.id,
      title: data.title,
      brand: data.brand,
      price: data.price,
      maxCount: data.count,
      thumbnail: data.thumbnail,
      quantity: data.quantity,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};

export const removeAllItemsFromCart = () => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_ALL_ITEMS",
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
  localStorage.removeItem("Orders");
};
