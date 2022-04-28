import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductsReducer,
  CategoryReducer,
  CartReducer,
  OrdersReducer,
} from "redux/reducers";

const reducers = combineReducers({
  productsState: ProductsReducer,
  categoryState: CategoryReducer,
  cartState: CartReducer,
  ordersState: OrdersReducer,
});

const cartItemsFromLS = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartState: { cartItems: cartItemsFromLS },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.subscribe(() => {
//   console.log("store: ",store.getState());
// })


export default store;
