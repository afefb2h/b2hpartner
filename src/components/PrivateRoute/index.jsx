import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log("route is", rest);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser && rest.location.pathname !== "/login") {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } else if (currentUser && rest.location.pathname === "/login") {
        return (
          <Redirect
            to={{
              pathname: "/driver-dashboard",
              state: { from: props.location }
            }}
          />
        );
      }

      /*// check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }*/

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
