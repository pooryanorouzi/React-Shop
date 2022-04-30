import { IS_LOGGED_IN } from "configs/variables.config";
import { Navigate } from "react-router-dom";
import { PATHS } from "configs/routes.config";
import { MainLayout } from "layout";
import { History } from "..";
import { DEFAULT_PROPS, PROP_TYPES } from "./PrivateRoute.config";
import store from "redux/store";
import { whoami } from "redux/actions/user.action";

const TargetPage = ({ Component, hasLayout }) => {
  const isLoggedIn = localStorage.getItem(IS_LOGGED_IN) === "true";

  if (!isLoggedIn) {
    return <Navigate replace to={PATHS.SIGN_IN} />;
  } else {
    store.dispatch(whoami());
    return (
      <History
        onRender={(props) => {
          return hasLayout ? (
            <MainLayout>
              <Component />
            </MainLayout>
          ) : (
            <Component />
          );
        }}
      />
    );
  }
};

const PrivateRoute = ({ component, hasLayout }) => {
  return <TargetPage Component={component} hasLayout={hasLayout} />;
};

PrivateRoute.defaultProps = DEFAULT_PROPS;
PrivateRoute.propTypes = PROP_TYPES;

export { PrivateRoute };
