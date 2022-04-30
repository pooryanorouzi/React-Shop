const initialState = {
  pendingOrders: {
    orders: [],
    total: null,
  },
  deliveredOrders: {
    orders: [],
    total: null,
  },
  allOrders: {
    allOrders: [],
    total: null,
  },
};

export const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDERS_SUCCESS":
      return {
        ...state,
        allOrders: {
          orders: action.payload.data,
          total: action.payload.total,
        },
      };
    case "GET_PENDING_ORDERS_SUCCESS":
      return {
        ...state,
        pendingOrders: {
          orders: action.payload.data,
          total: action.payload.total,
        },
      };
    case "GET_DELIVERED_ORDERS_SUCCESS":
      return {
        ...state,
        deliveredOrders: {
          orders: action.payload.data,
          total: action.payload.total,
        },
      };
    default:
      return state;
  }
};
