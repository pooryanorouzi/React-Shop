const initialState = {
  products: [],
  total: 0,
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload.data,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export { ProductsReducer };
