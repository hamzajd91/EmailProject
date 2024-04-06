import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import appApi from "../../services/appApi";
import "./index.scss";
import qs from "qs";
import {Loader} from "../Loader";
import StorageService from "../../services/StorageService";

function LinkedIn(props: any) {
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    const query = qs.parse(props.location.search, {ignoreQueryPrefix: true});
    if (query.code) {
      fetchMyAPI();
    } else {
      window.location.href = "/signin";
    }

    async function fetchMyAPI() {
      try {
        const response = await appApi.get(`/users/linkedin/callback${props.location.search}`);
        const {setUser, setToken} = StorageService;
        const {company, email, firstName, lastName, id, picture, title, verified, headline, industry} = response.data;
        setUser({company, email, firstName, id, lastName, picture, title, verified, headline, industry});
        setToken(response.data.jwt);

        const location = JSON.parse(localStorage.getItem("_location") as any);
        if (location) {
          localStorage.removeItem("_location");
          return (window.location.href = location);
        }

        window.location.href = "/user";
      } catch (error) {
        setIsLoading(false);
      }
    }
  }, []);
  return (
    <section className="login_Section">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center">
            <h3 className="text-danger">Something went wrong.</h3>
          </div>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.profile,
    login: state.login,
    user: state.user,
  };
};

export default connect(mapStateToProps)(LinkedIn);
