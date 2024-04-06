import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ApplicationState} from "../store";

// If user logged in and trying to access..
const PrivateRoutes = ({component: Component, ...rest}: any) => {
  if (rest.isAuthenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  } else {
    const reviewId = new URLSearchParams(rest.location.search).get("review");
    if (reviewId) {
      localStorage.setItem("_reviewId", JSON.stringify(reviewId));
    }
    localStorage.setItem("_location", JSON.stringify(window.location.href));
    return <Redirect to={{pathname: `/signin`, state: {from: rest.location}}} />;
  }
};

const mapStatetoProps = (state: ApplicationState) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStatetoProps)(PrivateRoutes);
