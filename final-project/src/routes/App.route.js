import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "configs/routes.config";
import * as Page from "pages";
import { Dashboard } from "layout";
import { PrivateRoute, ProtectedRoute, PublicRoute } from "./components";

const AppRoute = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATHS.PAYMENT}
          element={<PublicRoute component={(props) => <Page.Payment />} />}
        />
        <Route
          path={PATHS.CATEGORY}
          element={<PublicRoute component={(props) => <Page.Category />} />}
        />
        <Route
          path={PATHS.CATEGORY_CATEGORY_LIST}
          element={<PublicRoute component={(props) => <Page.Categories />} />}
        />
        <Route
          path={PATHS.CATEGORY_CATEGORY_LIST_ITEM}
          element={<PublicRoute component={(props) => <Page.Item />} />}
        />
        <Route
          path={PATHS.HOME}
          element={<PublicRoute component={(props) => <Page.Home />} />}
        />
        <Route
          path={PATHS.SIGN_IN}
          element={
            <ProtectedRoute
              hasLayout={false}
              component={(props) => <Page.SignIn />}
            />
          }
        />
        <Route
          path={PATHS.DASHBOARD}
          element={
            <PrivateRoute
              hasLayout={false}
              component={(props) => <Dashboard />}
            />
          }
        >
          <Route
            path={PATHS.PANEL_ORDERS}
            element={
              <PrivateRoute
                hasLayout={false}
                component={(props) => <Page.Orders />}
              />
            }
          />
          <Route
            path={PATHS.PANEL_PRODUCTS}
            element={
              <PrivateRoute
                hasLayout={false}
                component={(props) => <Page.Products />}
              />
            }
          />
          <Route
            path={PATHS.PANEL_QUANTITY}
            element={
              <PrivateRoute
                hasLayout={false}
                component={(props) => <Page.Quantity />}
              />
            }
          />
        </Route>
        <Route
          path={PATHS.POPULAR}
          element={<PublicRoute component={(props) => <Page.Popular />} />}
        />
        <Route
          path={PATHS.POPULAR_PRODID}
          element={<PublicRoute component={(props) => <Page.Item />} />}
        />
        <Route
          path={PATHS.SHOPPING}
          element={<PublicRoute component={(props) => <Page.Shopping />} />}
        />
        <Route
          path={PATHS.FINAL_PAYMENT}
          element={<PublicRoute component={(props) => <Page.FinalPayment />} />}
        />
        <Route
          path={PATHS.PAYMENT}
          element={
            <PublicRoute
              hasLayout={false}
              component={(props) => <Page.Payment />}
            />
          }
        />
        <Route
          path="*"
          element={<PublicRoute component={(props) => <Page.NotFound />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoute };
