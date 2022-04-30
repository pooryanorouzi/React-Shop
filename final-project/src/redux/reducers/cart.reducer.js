export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (product) => {
          return product.id === item.id
        }
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === existingItem.id ? existingItem : product
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "REMOVE_ALL_ITEMS":
      return {
        ...state,
        cartItems: [],
        
      };
    default:
      return state;
  }
};
