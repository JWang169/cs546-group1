import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from './context/UserContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { adminToken } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        adminToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;