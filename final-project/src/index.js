import React from "react";
import ReactDOM from "react-dom";
import "assets/styles/global.css";
import { Provider } from "react-redux";
import { AppRoute } from "./routes/App.route";
import store from "./redux/store";
import toast, { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoute />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#000",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
